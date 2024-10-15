import React from "react";

interface TitleProps {
  h1: string;
  p: string;
  style?: React.CSSProperties;
}

export default function Title({ h1, p, style }: TitleProps) {
  return (
    <>
      <div className="pt-4" style={style}>
        <h1 className="font-semibold text-4xl text-center">
          {h1.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index !== h1.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
        <p className="text-[#5A6070] text-xl text-center p-10 ">{p}</p>
      </div>
    </>
  );
}
