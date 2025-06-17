import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verifyRefreshToken } from './app/lib/verifyToken';

const authPages = ['/login', '/register'];

const isAuthPage = (url: string) => authPages.includes(url);

export async function middleware(request: NextRequest) {
  const { url,nextUrl } = request;
  const refreshToken = request.cookies.get("refreshToken")?.value || ""; 

  if(isAuthPage(nextUrl.pathname)) {
    const isValidRefreshToken = await verifyRefreshToken(refreshToken);

    if(!isValidRefreshToken) {
      return NextResponse.next();
    }
  }else{
    const isValidRefreshToken = await verifyRefreshToken(refreshToken);

    if(isValidRefreshToken) {
      return NextResponse.next();
    }else{
      if(nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/login', url));
      }else{
        return NextResponse.next();
      }
    }
  }

  return NextResponse.redirect(new URL('/', url));
}
 
export const config = {
  matcher: ['/', '/login', '/register', '/profile']
}