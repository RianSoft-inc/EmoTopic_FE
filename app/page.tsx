import SelectContainer from "@/components/selectContainer";
import Title from "@/components/title";
import researcherimg from "@/public/img1.jpg";
import Userimg from "@/public/img2.jpg";
import counselorimg from "@/public/img3.jpg";

export default function MainSelectPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:mt-14 pt-72 lg:pt-14">
      <Title
        h1={
          "플로우톡과 함께 소통을 더 깊이 이해하세요!\n더 많은 사람들과 나눠보세요!"
        }
        p={
          "플로우톡으로 당신과 타인의 대화를 분석해, 더 깊이 있는 소통을 이해하고 향상시켜 보세요. 지금 시작하세요!"
        }
      />
      {/* min-h-screen 적용 */}
      <div className="flex justify-center items-center gap-10 h-[500px]">
        <SelectContainer
          src={Userimg}
          name="일반 사용자"
          summary={
            <>
              <span>
                나와 상대방의 대화 스타일은? 상대방과 나눴던 주요 키워드와 누가
                더 많이 이야기했는지 궁금하신가요? 카카오톡 대화 추출 파일을
                업로드하고 지금 대화 분석을 통해 알아보세요!
              </span>
            </>
          }
          link="/userstart"
        />

        <SelectContainer
          src={researcherimg}
          name="연구원"
          summary={
            <>
              주요 주제와 키워드를 심층적으로 분석하여 데이터를 이해할 수
              있습니다. 토픽 모델링을 통해 대화 속에서 반복되는 패턴을 발견하고,
              연구에 필요한 인사이트를 빠르게 확보하세요.
            </>
          }
          link="/login"
        />
        {/* <SelectContainer
          src={counselorimg}
          name="상담사"
          summary={
            <>
              대화 분석을 통해 내담자의 소통 방식과 말투, 주된 관심사를 파악하여
              더 효과적인 상담 전략을 수립할 수 있습니다. 내담자의 감정 변화나
              부족한 부분을 심도 있게 이해하고, 그에 맞는 맞춤형 상담 방향을
              제시할 수 있도록 도와드립니다.
            </>
          }
          link="#"
        /> */}
      </div>
    </div>
  );
}
