import { connectToDB } from "@/lib/connectToDB";
import { verifyRefreshToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pool = await connectToDB();

  try {
    const url = req.url;
    const id = url.split("/").at(-1) || "";

    const refreshToken = req.cookies.get("refreshToken")?.value || "";
    const isValidRefreshToken = await verifyRefreshToken(refreshToken);

    let query;

    if (!isValidRefreshToken) {
      query = `
            select p.*, c.label [categories], t.label [tags], s.label [status_content], ty.label [type_content]
            from Products p left join ProductCategories pc
            on p.id = pc.productId left join Categories c
            on pc.categoryId = c.value left join ProductTags pt 
            on p.id = pt.productId left join Tags t
            on pt.tagId = t.value left join Status s
            on p.status = s.value left join Types ty
            on p.type = ty.value
            where p.id = ${id}
        `;
    } else {
      const userResult = await pool.request().query(`
            select userId from Users where email = '${isValidRefreshToken.email}'
        `);

      if (!userResult.recordset.length) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      const { userId } = userResult.recordset[0];

      query = `
            select p.*, c.label [categories], t.label [tags], s.label [status_content], ty.label [type_content],
            case 
                when lp.productId is not null and lp.userId = ${userId} then 1
                else 0
            end as liked
            from Products p left join ProductCategories pc
            on p.id = pc.productId left join Categories c
            on pc.categoryId = c.value left join ProductTags pt 
            on p.id = pt.productId left join Tags t
            on pt.tagId = t.value left join Status s
            on p.status = s.value left join Types ty
            on p.type = ty.value left join LikedProducts lp
            on lp.productId = p.id
            where p.id = ${id}
        `;
    }

    const result = await pool.request().query(query);

    const ratingResult = await pool.request().query(`
        WITH Stars AS (
            SELECT 1 AS star UNION ALL
            SELECT 2 UNION ALL
            SELECT 3 UNION ALL
            SELECT 4 UNION ALL
            SELECT 5
        )
        SELECT s.star,  COUNT(pr.star) AS count
        FROM Stars s CROSS JOIN Products p
        LEFT JOIN ProductRatings pr ON pr.star = s.star AND pr.productId = p.id
        WHERE p.id = ${id}
        GROUP BY p.id, s.star
        ORDER BY s.star;
    `);

    const resultProduct = result.recordset.reduce((resultArr, item) => {
      const { id, categories, tags } = item;
      const index = resultArr.findIndex((obj: ProductType) => obj.id === id);

      if (index === -1) {
        resultArr.push({
          ...item,
          categories: [categories],
          tags: [tags],
        });
      } else {
        if (!resultArr[index].categories.includes(categories)) {
          resultArr[index].categories.push(categories);
        }
        if (!resultArr[index].tags.includes(tags)) {
          resultArr[index].tags.push(tags);
        }
      }

      return resultArr;
    }, []);

    resultProduct[0].ratingResult = ratingResult.recordset;

    return NextResponse.json({ message: "Success", product: resultProduct[0] });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    pool.close();
  }
}
