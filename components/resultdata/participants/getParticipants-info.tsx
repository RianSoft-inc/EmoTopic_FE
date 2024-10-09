// components/resultdata/participants-info.tsx
import React from "react";

export default function ParticipantsInfo({ data }: { data: any }) {
  // data가 존재하는지 먼저 확인할 것
  if (!data || !data.participants) {
    return <p>참여자 정보를 불러오는 중 입니다...</p>;
  }

  const allParticipants = data.participants;

  const participantsItem = allParticipants?.map(
    (participant: any, index: any) => (
      <div key={index} className="py-8 px-8 border border-gray-500">
        <h1 className="font-medium text-xl text-gray-500">
          <span className="text-indigo-500 font-bold">
            {participant.name.replace("님", "")}
          </span>
          님의 대화 스타일은 다음과 같아요
        </h1>
        <h2 className="py-4 text-4xl font-bold text-slate-800">
          {participant.style}
        </h2>
        <p className="px-10 text-left">{participant.typeDescribe}</p>
      </div>
    )
  );

  return (
    <div className="mx-8 rounded-3xl bg-white shadow-lg border border-purple-400">
      {participantsItem}
    </div>
  );
}
