"use client";

import { useState, useRef } from "react";

export default function FileUpload({
  file,
  setFile,
  fileEnter,
  setFileEnter,
  setFileContent, // 파일 내용을 전달하기 위해 props 추가
}: any) {
  // const [fileContentLocal, setFileContentLocal] = useState(""); // 로컬에서 txt 파일 내용을 저장
  const inputRef = useRef<HTMLInputElement>(null); // 파일 입력 요소에 대한 참조 생성

  const isTxtFile = (fileName: any) => {
    return fileName.slice(-3).toLowerCase() === "txt";
  };

  const handleFileRead = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target as FileReader;
      if (target && target.result) {
        console.log("파일 읽기 성공", target.result);
        // setFileContentLocal(target.result as string); // 로컬 상태에 파일 내용 저장
        setFileContent(target.result as string); // 부모 컴포넌트로 파일 내용 전달
      } else {
        console.error("파일 읽기 오류 발생");
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setFileEnter(false);
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file && isTxtFile(file.name)) {
            let blobUrl = URL.createObjectURL(file);
            setFile(blobUrl);
            handleFileRead(file);
          } else {
            alert("txt 파일만 올려주세요.");
          }
        }
      });
    } else {
      [...e.dataTransfer.files].forEach((file) => {
        let blobUrl = URL.createObjectURL(file);
        setFile(blobUrl);
        handleFileRead(file);
      });
    }
  };

  return (
    <>
      <div>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={() => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            handleDrop(e);
          }}
          className={`${
            fileEnter ? "border-4" : "border-2"
          } bg-white flex flex-col w-80 h-60 p-15 border-dashed border-4 items-center justify-center`}
        >
          <label
            htmlFor="file"
            className="flex flex-col justify-center text-center gap-3 hover:cursor-pointer"
          >
            <span className="text-gray-200 hover:text-indigo-400">
              <i className="fa-regular fa-file fa-2x"></i>
            </span>
            {/* 파일 업로드 상태에 따른 텍스트 변경 */}
            {file ? "파일 업로드 성공" : "txt 파일을 올려주세요"}
          </label>
          <input
            ref={inputRef} // 파일 입력 요소에 ref 추가
            id="file"
            type="file"
            accept=".txt"
            className="hidden"
            onChange={(e) => {
              let files = e.target.files;
              if (files && files[0]) {
                if (isTxtFile(files[0].name)) {
                  let blobUrl = URL.createObjectURL(files[0]);
                  setFile(blobUrl);
                  handleFileRead(files[0]);
                } else {
                  alert("txt 파일만 올려주세요.");
                }
              }
            }}
          />
          {/* 파일이 업로드된 경우 Reset 버튼 표시 */}
          {file && (
            <button
              onClick={() => {
                setFile("");
                // setFileContentLocal("");
                setFileContent("");
                if (inputRef.current) {
                  inputRef.current.value = ""; // 파일 입력 값 초기화
                }
              }}
              className="px-4 mt-4 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </>
  );
}
