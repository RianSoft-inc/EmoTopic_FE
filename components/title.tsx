import React from "react";
interface TitleProps {
  h1: string;
  p: string;
  style?: React.CSSProperties;
}

export default function Title({ h1, p, style }: TitleProps) {
  return (
    <>
      <div className="py-20" style={style}>
        <h1 className="font-semibold text-5xl text-center">{h1}</h1>
        <p className="text-[#5A6070] text-xl text-center p-10 ">{p}</p>
      </div>
    </>
  );
}
