export function getAverageRating(filteredRating: ProductDetailRatingItem[]) {
    let average;

    const totalSum = filteredRating.reduce((total,item) => {
        const { star,count } = item;
        total += (star * count);
        return total
    }, 0);

    const totalCount = filteredRating.reduce((total,item) => {
        const { count } = item;
        total += count;
        return total
    }, 0);

    if(totalCount !== 0) average = totalSum / totalCount;

    return average;
};

export function getReviewCount(filteredRating: ProductDetailRatingItem[]) {
    return filteredRating.reduce((total,item) => {
        const { count } = item;
        total += count;
        return total;
    }, 0);
};