"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts with SSR disabled for Next.js compatibility
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define the props interface
interface HourlyAvg {
  // [key: number]: number;
  hour: number;
  avg: number;
}

interface User {
  name: string;
  avgPerHour: HourlyAvg[];
}

interface HoursInfoProps {
  data: any; // 유연한 타입 지정으로 수정
}

const HoursInfo: React.FC<HoursInfoProps> = ({ data }) => {
  // avgMessagePerHours 데이터가 있는지 확인
  if (!data || !data.avgMessagePerHours) {
    return <p>시간별 메시지 데이터를 불러오는 중입니다...</p>;
  }

  const users = data.avgMessagePerHours;

  // 각 사용자의 시간대별 평균 메시지 전송 횟수를 모두 합산하여,
  // 그 사용자가 보낸 메시지의 총 평균 전송 횟수를 구하는 함수
  const calculateTotalMessages = (avgPerHour: HourlyAvg[]) => {
    const totalMessages = avgPerHour.reduce((sum, hourData) => {
      return sum + Object.values(hourData)[0];
    }, 0);
    // 소수점 두 자리까지 반올림한 값을 반환
    return parseFloat(totalMessages.toFixed(2));
  };

  // 가장 많은 메시지를 보낸 사람을 찾는 함수
  const findUserWithMaxMessages = (users: User[]) => {
    //초기값을 첫 번째 사용자로 설정
    let maxUser = users[0];
    let maxMessages = calculateTotalMessages(users[0].avgPerHour);

    //나머지 사용자들과 비교
    users.forEach((user) => {
      const totalMessages = calculateTotalMessages(user.avgPerHour);
      if (totalMessages > maxMessages) {
        maxUser = user; // 더 큰 값을 가진 사용자를 maxUser로 업데이트
        maxMessages = totalMessages;
      }
    });

    return maxUser;
  };

  //가장 많은 메시지를 보낸 사람 찾기
  const maxUser = findUserWithMaxMessages(users);

  const series = users.map((user: User) => ({
    name: user.name,
    data: user.avgPerHour.map((hourly) => {
      const hourValues = Object.values(hourly);
      return hourValues[0];
    }),
  }));

  const categories = users[0].avgPerHour.map(
    (hourly: number) => Object.keys(hourly)[0] + "시"
  );

  const options: ApexOptions = {
    fill: {
      type: "gradient",
      opacity: 0.5,
      colors: ["#f07ff6", "#c7e0ec"],
    },
    stroke: {
      colors: ["#f07ff6", "#abcae2eb"],
    },
    markers: {
      colors: ["#f07ff6", "#abcae2eb"],
      size: 0,
    },
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      show: false,
    },
    title: {
      text: "사용자별 시간당 평균 메시지 전송수",
      align: "center",
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y + " 건";
          }
          return "";
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      markers: {
        shape: "sparkle",
        fillColors: ["#f07ff6", "#dcdcdceb"],
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };

  return (
    <div className="flex items-center justify-center w-full p-5 bg-slate-200">
      <div className="px-4 w-3/5 shadow-lg rounded-lg bg-white">
        <ApexChart options={options} series={series} type="area" />
      </div>
      <div className="w-80 border border-emerald-400">
        {/* 가장 많이 보낸 사람에 대한 메시지 출력 */}
        <div className="mt-4 text-center text-lg font-bold">
          <p>{`${maxUser.name}님이 시간당 메시지를 더 자주 보내셨어요.`}</p>
        </div>
        {users.map((user: User, index: number) => (
          <div className="flex flex-col text-center" key={index}>
            <h3>{`${user.name}님 : 평균 ${calculateTotalMessages(
              user.avgPerHour
            )}회`}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoursInfo;
