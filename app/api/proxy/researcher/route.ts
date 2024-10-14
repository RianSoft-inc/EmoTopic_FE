import { NextResponse } from "next/server";

// JWT 토큰 검증 함수 (실제 서버에서 검증 로직을 대체해야 함)
function verifyToken(token: string) {
  console.log("토큰 검증 시작:", token);
  if (token) {
    return true; // 실제 서버에서는 토큰 유효성을 검증해야 함
  }
  return false;
}

// CSV 데이터를 JSON으로 변환하는 함수
function csvToJson(csv: string) {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    const currentline = lines[i].split(",");

    headers.forEach((header, index) => {
      obj[header.trim()] = currentline[index]?.trim() ?? ""; // 빈값 체크 추가
    });

    result.push(obj);
  }

  return result;
}

export async function POST(request: Request) {
  try {
    console.log("요청 수신, 헤더 확인 시작");
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error(
        "Authorization 헤더가 없거나 형식이 잘못되었습니다:",
        authHeader
      );
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const isValid = verifyToken(token);

    if (!isValid) {
      console.error("유효하지 않은 토큰:", token);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    console.log("토큰 유효성 검증 완료, 파일 처리 시작");

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("파일이 업로드되지 않았습니다.");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileContents = await file.text();
    console.log("파일 내용 읽기 성공:", fileContents);

    // CSV 파일을 JSON으로 변환
    const jsonData = csvToJson(fileContents);
    console.log("CSV 변환된 JSON:", jsonData);

    return NextResponse.json(
      { message: "파일 분석 완료", fileName: file.name, data: jsonData },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("서버 오류 발생:", error.message);
      return NextResponse.json(
        { error: "Internal server error", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("예상치 못한 서버 오류 발생:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
