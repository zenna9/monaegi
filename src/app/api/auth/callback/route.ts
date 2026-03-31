import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'GitHub credentials are not configured' }, { status: 500 });
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to obtain access token' }, { status: 400 });
    }

    // 보안을 위해 쿠키에 토큰을 저장합니다. httpOnly 속성은 임시로 클라이언트 조작을 위해 제외할 수 있으나
    // 현재는 브라우저 스토리지나 쿠키에 저장하도록 설정합니다. (여기서는 쿠키 사용)
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    
    // Cookie 설정: 루트 경로(/)에 만료일 없이 세션 쿠키로 저장
    response.cookies.set('github_token', accessToken, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      // 향후 프론트엔드에서 API 요청을 위해 토큰을 읽으려면 httpOnly를 제거하거나
      // API 라우트를 통해서만 요청하도록 구성. 여기서는 클라이언트에서도 사용 가능하도록 설정.
      httpOnly: false, 
    });

    return response;
  } catch (error) {
    console.error('Error during GitHub Auth Callback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}