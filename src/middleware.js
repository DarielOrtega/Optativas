import { NextResponse } from "next/server";
import { jwtVerify } from "jose";


export async function middleware(req) {

    /* if (req.nextUrl.pathname.includes('/auth/register')) {
  
          const authHeader = req.headers.get('Authorization');
          console.log(authHeader)
          if (!authHeader) {
              return NextResponse.redirect('http://localhost:3000/auth/login')
          }
          const token = authHeader.split(' ')[1];
          try {
              const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
          } catch (error) {
              return NextResponse.redirect('http://localhost:3000/auth/login')
          }
  
  
      }*/
    const cookies = req.cookies
    const token = cookies['authToken']
    /*  console.log(req.cookies)*/
    return NextResponse.next();
}

/*export const confing = {
    matcher: ['/auth/register', '/models/admin', 'models/user',
        'subjects/edit', 'subjects/new', 'subjects/request', 'tema/new', 'tema/edit']
}*/