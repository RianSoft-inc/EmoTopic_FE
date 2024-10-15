import React, { useState, useRef } from "react";
import { BsFiletypeCsv, BsFiletypeTxt } from "react-icons/bs"; // CSV와 TXT 아이콘 가져오기

interface CustomDropzoneProps {
  fileType: "csv" | "txt"; // 파일 타입을 csv 또는 txt로 받음
  onFileSelect: (file: File, fileContent: string) => void; // 파일 선택 시 호출할 콜백 함수
}

const fileTypeSettings = {
  csv: {
    accept: ".csv",
    mimeType: "text/csv",
    icon: <BsFiletypeCsv />,
    label: "CSV 파일을 업로드해주세요.",
    errorMessage: "CSV 파일만 업로드 가능합니다.",
  },
  txt: {
    accept: ".txt",
    mimeType: "text/plain",
    icon: <BsFiletypeTxt />,
    label: "TXT 파일을 업로드해주세요.",
    errorMessage: "TXT 파일만 업로드 가능합니다.",
  },
};

function CustomDropzone({ fileType, onFileSelect }: CustomDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isHover, setIsHover] = useState(false); // Hover 상태 추가
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null); // input 요소를 참조하기 위한 ref

  const { accept, mimeType, icon, label, errorMessage } =
    fileTypeSettings[fileType]; // 파일 타입에 따른 설정

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    const file = files[0];

    // 파일 타입 검사
    if (file.type === mimeType) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          const fileContents = event.target.result as string;
          console.log(fileContents); // 파일 내용 출력
          onFileSelect(file, fileContents); // 파일과 파일 내용을 부모 컴포넌트로 전달
        }
      };
      reader.readAsText(file);
    } else {
      alert(errorMessage);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 검사
    if (file.type === mimeType) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          const fileContents = event.target.result as string;
          console.log(fileContents); // 파일 내용 출력
          onFileSelect(file, fileContents); // 파일과 파일 내용을 부모 컴포넌트로 전달
        }
      };
      reader.readAsText(file);
    } else {
      alert(errorMessage);
    }
  };

  // Hover 상태 처리 함수
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // div 클릭 시 input 요소 클릭 트리거
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // input 요소 클릭 트리거
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick} // div 클릭 시 파일 선택 트리거
      className={`border-2 ${
        isDragOver || isHover ? "border-blue-400" : "border-gray-300"
      } border-dashed rounded-lg p-10 text-center transition-colors duration-300 flex flex-col items-center`}
      style={{
        backgroundColor: isDragOver || isHover ? "#fafafa" : "#ffffff",
        cursor: "pointer",
      }}
    >
      {icon} {/* 파일 타입에 따른 아이콘 표시 */}
      <p>{label}</p> {/* 파일 타입에 따른 라벨 */}
      <input
        type="file"
        accept={accept} // 파일 타입에 따른 accept 속성
        onChange={handleFileSelect}
        style={{ display: "none" }}
        ref={fileInputRef} // input 요소에 ref 추가
        id="fileUpload"
      />
      <label htmlFor="fileUpload" className="cursor-pointer">
        {fileName ? `선택된 파일: ${fileName}` : ""}
      </label>
    </div>
  );
}

export default CustomDropzone;
