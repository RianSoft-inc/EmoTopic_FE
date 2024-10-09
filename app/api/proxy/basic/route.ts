import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false, // 파일 업로드 등에서 body를 직접 처리하기 위한 설정
  },
};

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // 요청 바디를 ArrayBuffer로 읽어오기
    const bodyArrayBuffer = await request.arrayBuffer();
    const bodyBuffer = Buffer.from(bodyArrayBuffer);

    // 외부 API로 요청 전달
    const externalApiUrl = "https://api.flow-talk.com/api/basic"; // 외부 API 주소
    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
        // 필요 시 Authorization 등의 헤더 추가
      },
      body: bodyBuffer,
    });

    // 응답 확인 및 처리
    const responseBody = await response.arrayBuffer();
    const responseContentType = response.headers.get("content-type") || "";

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

    // 응답 반환
    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type": responseContentType,
      },
    });
  } catch (error: any) {
    console.error("Proxy error:", error);

    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
