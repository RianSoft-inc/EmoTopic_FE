"use client";

import error from "next/error";
import { useState } from "react";

export default function FileUpload({
  file,
  setFile,
  fileEnter,
  setFileEnter,
}: any) {
  const [fileContent, setFileContent] = useState(""); //여기에 txt file 내용이 저장됨

  const isTxtFile = (fileName: any) => {
    return fileName.slice(-3).toLowerCase() === "txt";
  };
  const handleFileRead = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target as FileReader;
      if (target && target.result) {
        console.log(`txt: ${target.result}`);
        setFileContent(target.result as string);
      } else {
        console.error(error, "에러");
      }
    };
    reader.readAsText(file);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setFileEnter(false);
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file && isTxtFile(file.name)) {
            let blobUrl = URL.createObjectURL(file);
            setFile(blobUrl);
            console.log(`blobUrl:${blobUrl}`);
            handleFileRead(file);
            console.log(`items file[${i}].name = ${file?.name}`);
          } else {
            alert("txt파일만 올려주세요");
          }
        }
      });
    } else {
      [...e.dataTransfer.files].forEach((file, i) => {
        console.log(`file[${i}].name = ${file.name}`);
        let blobUrl = URL.createObjectURL(file);
        setFile(blobUrl);
        handleFileRead(file);
      });
    }
  };

  return (
    <>
      <div>
        {!file ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setFileEnter(true);
            }}
            onDragLeave={(e) => {
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
              // 파일 끌어오는 box
              fileEnter ? "border-4" : "border-2"
            } bg-white flex flex-col w-80 h-60 p-15 border-dashed border-4 items-center justify-center
            dark:bg-gray-900 dark:bg-opacity-60 dark:backdrop-blur-md shadow-lg
     shadow-black/10 ring-2 ring-transparent 
       hover:border-indigo-400 hover:cursor-pointer rounded-2xl m-10`}
          >
            <label
              htmlFor="file"
              className="flex flex-col justify-center text-center gap-3 hover:cursor-pointer"
            >
              <span className="text-gray-200 hover:text-indigo-400">
                {/* 파일 아이콘 */}
                <i className="fa-regular fa-file fa-2x "></i>
              </span>
              {fileContent === ""
                ? "txt 파일을 올려주세요"
                : "파일 업로드 성공"}
            </label>
            <input
              id="file"
              type="file"
              accept=".txt"
              className="hidden"
              onChange={(e) => {
                console.log(e.target.files);
                let files = e.target.files;
                if (files && files[0]) {
                  if (isTxtFile(files[0].name)) {
                    let blobUrl = URL.createObjectURL(files[0]);
                    setFile(blobUrl);
                    handleFileRead(files[0]);
                  } else {
                    alert("txt 파일만 올려주세요");
                  }
                }
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <object
              className="rounded-md w-full max-w-xs h-72"
              data={file}
              type="image/png" // need to be updated based on type of file
            />
            <button
              onClick={() => {
                setFile("");
                setFileContent("");
              }}
              className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </>
  );
}
