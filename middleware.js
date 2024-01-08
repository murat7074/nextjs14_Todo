import { NextResponse } from "next/server"

// "config" yapmazsak ==> her route da invoke oluyor.
export function middleware(request) {
 return NextResponse.redirect(new URL("/",request.url))
}


export const config = {
 // matcher:"/about"  
/*  "middleware"  her route da değil sadece burada yazılı route da invoke olucak.
  Dikkat et ==> about/info route da invoke olmaz */

matcher:["/about/:path*","/falan/:path*"]  // about un alt route larında da invoke olur. about/info/vs 

}