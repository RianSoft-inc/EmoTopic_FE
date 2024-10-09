export default function KeywordInfo({ data }: { data: any }) {
  // data가 존재하는지 먼저 확인할 것
  if (!data || !data.participants) {
    return <p>참여자 정보를 불러오는 중 입니다...</p>;
  }
  const allKeywords = data.keywords;

  // 각 열에 배치할 데이터를 그룹화합니다.
  const groupedItems = allKeywords.reduce(
    (acc: any[], keyword: any, index: number) => {
      const groupIndex = Math.floor(index / 4); // 각 그룹의 index를 계산
      if (!acc[groupIndex]) {
        acc[groupIndex] = [];
      }
      acc[groupIndex].push(
        <div key={index} className="flex gap-2">
          <div className="font-extrabold text-xl">{index + 1}.</div>
          <div>{keyword.keyword}</div>
        </div>
      );
      return acc;
    },
    []
  );

  return (
    <div className="my-14 border border-red-300">
      <div className="my-2 mx-8 py-8 px-16 rounded-3xl bg-white shadow-lg grid grid-cols-3 gap-4 ">
        {groupedItems.map((group: any, groupIndex: any) => (
          <div key={groupIndex} className="space-y-2 mx-auto">
            {group}
          </div>
        ))}
      </div>
    </div>
  );
}
