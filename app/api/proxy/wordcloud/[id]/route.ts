import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const externalApiUrl = `https://api.flow-talk.com/api/basic/word-cloud/${id}`;

    // 외부 API로 GET 요청 전달
    const response = await fetch(externalApiUrl, {
      method: "GET",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "워드클라우드 API 오류", status: response.status },
        { status: response.status }
      );
    }

    const responseBody = await response.arrayBuffer();
    return new NextResponse(responseBody, {
      status: response.status,
      //   headers: { "Content-Type": "image/jpeg" },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "프록시 서버 오류", details: error.message },
      { status: 500 }
    );
  }
}
