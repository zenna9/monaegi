import { NextResponse } from 'next/server';

export async function GET() {
  const isDev = process.env.NODE_ENV === 'development';
  const BASE_URL = isDev ? 'http://localhost:3000' : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
  
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: 'GitHub Client ID is not configured' }, { status: 500 });
  }

  const redirectUri = `${BASE_URL}/api/auth/callback`;
  // 레포지토리 생성 및 쓰기 권한이 필요하므로 'repo' 스코프 요청
  const scope = 'repo'; 
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
  
  return NextResponse.redirect(githubAuthUrl);
}