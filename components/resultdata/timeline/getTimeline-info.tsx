"use client";
import React from "react";
import TopicGraph from "./exampleGraph";

export default function TimelineInfo({ data }: { data: any }) {
  if (!data) {
    return <p>시간별 메시지 데이터를 불러오는 중입니다...</p>;
  }
  // const formattedPartName = {
  //   ...data,
  //   name: data.name.replace("님", ""),
  // };
  const allTimeline = data.frequency;
  const percentages = allTimeline?.percentages;
  const totalMessages = allTimeline?.totalMessages; // 총 메시지 수
  const userTotals = allTimeline?.userTotals; // 사용자별 메시지 총합

  // percentages가 undefined가 아닌지 확인
  if (!percentages) {
    return <p>대화 참여율 데이터를 불러오는 중입니다...</p>;
  }

  console.log("percentages keys:", Object.keys(percentages));

  // 그래프
  const series = Object.keys(allTimeline.members).map((member) => ({
    name: member,
    data: allTimeline.members[member],
  }));
  const oldCategories = allTimeline.dates;
  console.log(oldCategories[0]);
  console.log(oldCategories[0].substring(2, 4));
  console.log("oldCategories[1]", oldCategories[1]);
  // categories 에 들어갈 날짜 변환
  const formatDate = (dateArray: string[]) => {
    const year = dateArray[0].substring(2, 4);
    const month = dateArray[1];
    const day = dateArray[2];
    // return `${year}년${month}월${day}일`;
    // return `${year}.${month}.${day}`;
    return `${year}/${month}/${day}`;
  };

  const categories = allTimeline.dates.map((C: any) =>
    formatDate(C.split("-"))
  );

  // 가장 적극적으로 대화에 참여한 사람 구하기
  const highestPercentageUser = Object.keys(percentages).reduce(
    (highestUser, user) => {
      return percentages[user] > percentages[highestUser] ? user : highestUser;
    },
    Object.keys(percentages)[0]
  );

  const getBgColor = (percentage: number, highestPercentage: number) => {
    // 수치에 따라 배경색 결정
    return percentage === highestPercentage ? "bg-yellow-300" : "bg-blue-200";
  };

  // 더 많이 대화한 사람의 원형 크기 구하기
  const calculateSize = (percentage: number) => {
    const size = 100 + (percentage / 100) * 150;
    return `${size}px`;
  };

  return (
    <div>
      <div className="py-8 px-16 border border-orange-400">
        <h2>
          {highestPercentageUser.replace("님", "")}님이 대화에 더 관심이 높아
          보여요.
        </h2>
        <h3>대화 참여율</h3>
        <div className="flex gap-20 items-center justify-center">
          {Object.keys(percentages).map((user, index) => (
            <div
              key={index}
              className="text-center flex flex-col justify-between items-center border-4 border-lime-300 h-[250px] w-[250px]"
              // 부모 컨테이너의 높이를 고정 📌 임시로 h와 w 250px 로 설정
            >
              {/* 더 많이 대화 한 사람의 원형 */}
              <div
                className={`rounded-full flex items-center justify-center ${getBgColor(
                  percentages[user],
                  percentages[highestPercentageUser]
                )}`}
                style={{
                  width: calculateSize(percentages[user]),
                  height: calculateSize(percentages[user]),
                }}
              >
                <span className="text-2xl font-bold ">
                  {percentages[user]}%
                </span>
              </div>
              {/* 🚨 수평 위치 안 맞음 여기 조절 필요 🚨*/}
              <h4 className="mt-3 font-medium text-lg">
                {user.replace("님", "")}님
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* 👀 대화한 날짜와 대화 참여자들 배열로 출력 */}
      {/* <div>
        <h3>Dates</h3>
        <ul>
          {allTimeline.dates.map((date: string, index: number) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
      </div> 
      <div>
        <h3>Members</h3>
        {Object.keys(allTimeline.members).map(
          (member: string, index: number) => (
            <div key={index}>
              <h4>{member}</h4>
              <ul>
                {allTimeline.members[member].map(
                  (value: string, index: number) => (
                    <li key={index}>{value}</li>
                  )
                )}
              </ul>
            </div>
          )
        )}
      </div>  */}
      <div className="flex items-center justify-center border border-green-400 w-full p-5">
        <TopicGraph
          series={series}
          categories={categories}
          highestPercentageUser={highestPercentageUser}
          type="bar"
        />

        <div className=" w-80 border border-blue-400">
          <p className="text-lg font-bold">
            {highestPercentageUser}님이 메시지를 더 많이 보냈어요.
          </p>

          <p>총 {totalMessages}번 메시지가 오갔어요</p>
          <ul>
            {Object.keys(userTotals).map((user, index) => (
              <li key={index}>
                {user}님 : {userTotals[user]}회
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
