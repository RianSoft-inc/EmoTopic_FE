import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 900; // 최대 실행 시간 15분

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // 요청 바디를 ArrayBuffer로 읽어오기
    const bodyArrayBuffer = await request.arrayBuffer();
    const bodyBuffer = Buffer.from(bodyArrayBuffer);

    // 외부 API로 요청 전달
    const externalApiUrl = "https://api.flow-talk.com/api/researcher"; // 외부 API 주소
    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
      },
      body: bodyBuffer,
    });

    if (!response.ok) {
      console.error(
        "외부 API 요청 실패:",
        response.status,
        response.statusText
      );
      return NextResponse.json(
        {
          error: "외부 API 오류",
          status: response.status,
          details: response.statusText,
        },
        { status: response.status }
      );
    }

    // 외부 API에서 JSON 응답을 받아서 그대로 반환
    const jsonResult = await response.json();

    // 응답 반환
    return NextResponse.json(jsonResult, { status: 200 });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
