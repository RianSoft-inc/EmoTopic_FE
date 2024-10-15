import React, { useRef } from "react";

export default function CollapseMenu() {
  const collapseRef = useRef<HTMLInputElement>(null); // collapse 상태를 제어하기 위한 ref

  const handleAgreeCheck = () => {
    if (collapseRef.current) {
      collapseRef.current.checked = false; // 체크박스를 누르면 collapse 닫기
    }
  };
  return (
    <>
      <div className="flex flex-col gap-10">
        {/* 플로우톡이 처음이신가요? */}
        <div className="collapse collapse-arrow ring-2 ring-transparent hover:ring-indigo-400">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-base-300 text-md font-semibold peer-checked:bg-indigo-400 peer-checked:text-secondary-content ">
            플로우톡이 처음이신가요?
          </div>
          <div className="collapse-content text-primary-content peer-checked:bg-indigo-400 peer-checked:text-secondary-content overflow-scroll">
            <p className="h-36">
              플로우톡은 카카오톡 대화를 분석하여, 당신의 대화 패턴과 스타일을
              알아보는 서비스입니다. 일반 사용자는 주로 대화에서 나와 상대방이
              누가 더 자주 대화를 주도하는지, 주요 대화 주제는 무엇인지 등을
              분석하여 소통 스타일을 개선할 수 있습니다. 또한, 대화 속에서 자주
              언급되는 단어나 표현을 파악해 개인의 대화 습관을 알아보는 데
              도움을 줍니다.
              <br />
              <br />
              연구자는 플로우톡을 통해 더 깊이 있는 대화 데이터를 분석할 수
              있습니다. 예를 들어, 연구 대상자의 대화에서 반복적으로 등장하는
              키워드와 주제를 기반으로 대화 패턴을 도출하고, 정량적 분석을 통해
              실험적 결과나 연구 목적에 맞는 인사이트를 제공받을 수 있습니다.
              주요 주제나 감정 분석, 빈도 분석 등 다양한 도구를 활용해 데이터를
              심층적으로 분석할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 개인정보에 대해 알고싶다면? */}
        <div className="collapse collapse-arrow ring-2 ring-transparent hover:ring-indigo-400">
          <input type="checkbox" className="peer" ref={collapseRef} />
          <div className="collapse-title bg-base-300 text-md font-semibold peer-checked:bg-indigo-400 peer-checked:text-secondary-content">
            개인정보에 대해 알고싶다면?
          </div>
          <div
            className="collapse-content text-primary-content peer-checked:bg-indigo-400 peer-checked:text-secondary-content overflow-y-auto"
            style={{ maxHeight: "150px" }}
          >
            <div>
              플로우톡은 개인정보 보호를 최우선으로 하여, 사용자의 대화 데이터는
              철저하게 익명 처리되며, 제3자에게 제공되지 않습니다. 다음은 주요
              개인정보 처리 방침입니다:
              <br />
              <br />
              1. 수집 목적: 대화 패턴 분석 및 개인 맞춤형 분석 제공.
              <br />
              2. 수집 항목: 대화 내용(텍스트 데이터) 및 사용자의 연락처, 이름.
              <br />
              3. 보유 기간: 분석 목적이 달성되면 즉시 파기.
              <br />
              4. 사용자 권리: 언제든지 본인의 개인정보 제공을 철회할 수
              있습니다.
              <br />
              5. 데이터 보안: 암호화된 방식으로 데이터 저장 및 전송.
              <br />
              <br />
              개인정보 보호와 관련된 더 자세한 내용은 [개인정보 처리 방침](#)을
              참고해 주세요.
            </div>
          </div>
          {/* 동의 체크박스를 누르면 collapse가 닫힘 */}
          <div className=" items-center justify-start mt-4 peer-checked:flex peer-checked:visible peer-checked:opacity-100 hidden">
            <input
              type="checkbox"
              id="agree"
              className="mr-2"
              onClick={handleAgreeCheck}
            />
            <label htmlFor="agree" className="text-slate-500">
              개인정보 수집 및 이용에 동의합니다.
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
