import { NextResponse } from "next/server";

// 사용자 인증 처리
export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 실제로 DB에서 사용자 확인을 해야 하지만, 여기서는 예시로 간단히 처리합니다.
    if (username === "admin" && password === "Admin0915@@") {
      // 로그인 성공 시 응답 반환 (토큰 발급 없이)
      return NextResponse.json({ message: "로그인 성공" }, { status: 200 });
    } else {
      // 사용자 이름 또는 비밀번호가 잘못된 경우
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 잘못되었습니다." },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
