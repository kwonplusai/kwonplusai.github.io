# Zestloom 홈페이지 (GitHub Pages)

## 올리는 법
1. GitHub에서 저장소를 만들어요. 이름을 `조직이름.github.io`로 하면 주소가 `https://조직이름.github.io`가 돼요.
2. 이 폴더 안의 파일을 폴더 구조 그대로 올려요.
3. 저장소 Settings → Pages → Source: Deploy from a branch, Branch: `main` / `(root)`.
4. 1~2분 뒤 주소로 들어가면 보여요.

저장소 이름이 `아이디.github.io`가 아니면 `_config.yml`의 `baseurl`에 `"/저장소이름"`을 적어요.

## 새 소식 쓰기
`_posts` 폴더에 `연-월-일-영문제목.md` 파일을 만들어요. 예: `_posts/2026-11-03-honeybeehex-launch.md`

```
---
layout: post
title: 허니비헥스를 출시했어요
category: 출시
summary: 목록에 보일 한 줄 요약
---

본문은 마크다운으로 써요.
```

GitHub 웹에서 `Add file → Create new file`로 바로 써도 돼요. 저장하면 1~2분 뒤 사이트에 나타나요.
그림은 `assets/img/` 폴더에 올리고 본문에 `![설명](/assets/img/파일.png)`로 넣어요.

## 내 도메인 연결 (zestloomlab.com)
가비아 등록이 끝난 뒤에 이 순서로 해요.
1. 저장소 Settings → Pages → Custom domain에 `zestloomlab.com` 입력 → Save
2. 가비아 DNS 관리에 레코드 추가
   - A `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAME `www` → `조직이름.github.io.`
3. DNS 확인이 끝나면(몇 분~하루) Enforce HTTPS 켜기

## 파일 구성
- `index.html` 첫 화면 (게임·소식·소개·문의)
- `blog/index.html` 소식 전체 목록
- `_layouts/` 공통 틀 (default: 위 메뉴·아래 링크, post: 글 페이지)
- `_posts/` 소식 글
- `assets/style.css`, `assets/site.js` 디자인과 움직임
- `_config.yml` 사이트 이름·문의 메일 등 설정
