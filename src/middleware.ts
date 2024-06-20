// middleware.ts

import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request:any) {
  // Check authentication status
  const session = await auth();

  // If the user is not authenticated, redirect them to the login page
  if (!session?.user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Proceed to the requested route if authenticated
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/room','/'],
};
