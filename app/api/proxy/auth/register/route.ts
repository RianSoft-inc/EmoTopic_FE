// app/api/proxy/auth/register/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("요청된 데이터:", body); // 요청 데이터 확인

    const apiResponse = await fetch(
      "https://api.flow-talk.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const responseText = await apiResponse.text();
    console.log("외부 API 응답 텍스트:", responseText); // 응답 텍스트 확인

    // 상태 코드 확인
    if (!apiResponse.ok) {
      console.log("외부 API 응답 실패:", apiResponse.status);
      return NextResponse.json(
        { error: "회원가입 실패", details: responseText },
        { status: apiResponse.status }
      );
    }

    // JSON 형식일 때만 JSON 파싱
    try {
      const responseData = JSON.parse(responseText);
      return NextResponse.json(responseData); // 응답 데이터를 반환
    } catch (jsonError) {
      console.error("JSON 파싱 오류 발생:", jsonError);
      return NextResponse.json(
        { error: "JSON 파싱 오류", details: responseText },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("서버 오류 발생:", error); // 전체적인 서버 오류 출력
    return NextResponse.json(
      { error: "서버 오류 발생", details: error },
      { status: 500 }
    );
  }
}
