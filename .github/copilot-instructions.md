# Monaegi 프로젝트 AI 어시스턴트 지침

## 코어 및 환경
- Next.js (App Router 최신 버전), React, TypeScript, Tailwind CSS 기반으로 코드를 작성합니다.

## 아키텍처 절대 규칙 (No BE, No DB)
1. 별도의 백엔드 API 서버나 전통적인 데이터베이스(Supabase, Firebase, MySQL 등)를 절대 구축하지 않습니다.
2. 사용자의 GitHub 레포지토리를 데이터베이스처럼 사용합니다. 데이터는 파일(예: `data/goals.json`)로 관리합니다.
3. 데이터를 갱신할 때는 실시간으로 GitHub API(`.octokit` 등)를 이용해 해당 레포에 커밋을 푸시합니다. 이 커밋이 모여 사용자의 깃허브 잔디를 채우게 됩니다.

## 주요 기능 플로우
1. GitHub OAuth를 통한 로그인 획득 (Token 저장 필요)
2. `monaegi-data` 와 같은 빈 레포지토리 생성 확인 및 스캐폴딩
3. 목표 리스트(기간별) 및 세부 단위 분할
4. 실행 여부 체크 시 상세 내용과 함께 API를 통한 Commit 생성

## 기타 규칙
1. 기능 추가 시 수정 계획을 먼저 브리핑하고, 승인 후에 수정합니다. 승인 없이 코드를 수정하지 않습니다.