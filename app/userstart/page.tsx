//app
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Title from "@/components/title";
import CollapseMenu from "@/components/collapseMenu";
import CustomDropzone from "@/components/customDropzone";

export default function MainSelectPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null); // 파일 저장
  const [fileContent, setFileContent] = useState<string>(""); // 파일 내용 저장

  const handleSubmit = async () => {
    if (!file || !fileContent) {
      alert("파일을 업로드해주세요.");
      return;
    }

    const formData = new FormData();
    const fileBlob = new Blob([fileContent], { type: file.type });
    formData.append("file", fileBlob, file.name); // 파일을 FormData에 추가

    try {
      const response = await fetch("/api/proxy/basic", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const resultData = await response.json();
        console.log("응답 데이터:", resultData);
        router.push(
          `/userstart/resultpage?result=${encodeURIComponent(
            JSON.stringify(resultData)
          )}`
        );
      } else {
        console.error("파일 전송 실패:", response.statusText);
        const errorText = await response.text();
        console.error("에러 내용:", errorText);
      }
    } catch (error) {
      console.error("파일 전송 중 오류 발생:", error);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <script src="https://cdn.tailwindcss.com/3.3.3" async></script>
      {/* 타이틀 */}
      <Title
        h1={"이모토픽 분석 시작하기"}
        p={
          "Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan."
        }
        style={{ paddingBottom: 0 }}
      />
      {/* 박스 네개 container */}
      <div className="flex justify-center px-44">
        <div className="w-1/2 flex flex-col justify-center">
          <CollapseMenu />
        </div>
        <div className="w-1/2 flex flex-col items-center ">
          <CustomDropzone
            fileType="txt"
            onFileSelect={(selectedFile: File, fileContent: string) => {
              setFile(selectedFile); // 파일 저장
              setFileContent(fileContent); // 파일 내용 저장
            }}
          />
          <button
            type="button"
            onClick={handleSubmit} // 클릭 시 handleSubmit 실행
            className="flex justify-center items-center gap-3 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm w-72 px-20 py-5 text-center mb-5"
          >
            <i className="fa-solid fa-magnifying-glass"></i>분석하기
          </button>
        </div>
      </div>
    </>
  );
}
