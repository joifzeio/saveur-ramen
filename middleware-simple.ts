import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const { pathname } = req.nextUrl;

  // Public pages that don't require auth
  const publicPages = [
    '/admin-x7k9p2/login',
    '/admin-x7k9p2/forgot-password',
    '/admin-x7k9p2/reset-password',
    '/admin-x7k9p2/debug',
  ];

  // Check if current path is admin area
  if (pathname.startsWith('/admin-x7k9p2')) {
    // If it's a public page, allow access
    if (publicPages.includes(pathname)) {
      return res;
    }

    // Protected admin pages - require session
    if (!session) {
      return NextResponse.redirect(new URL('/admin-x7k9p2/login', req.url));
    }
  }

  // Protect reservation confirmation
  if (pathname === '/reservation/confirmation') {
    const hasParams = req.nextUrl.searchParams.has('name') &&
                      req.nextUrl.searchParams.has('date');
    if (!hasParams) {
      return NextResponse.redirect(new URL('/reservation', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin-x7k9p2/:path*', '/reservation/confirmation'],
};
