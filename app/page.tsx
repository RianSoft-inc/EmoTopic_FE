import SelectContainer from "@/components/selectContainer";
import Title from "@/components/title";
import researcherimg from "@/public/img1.jpg";
import Userimg from "@/public/img2.jpg";
import counselorimg from "@/public/img3.jpg";
export default function MainSelectPage() {
  return (
    <>
      <Title
        h1={"이모토픽"}
        p={
          "Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan."
        }
      />
      <div className="flex justify-center items-center h-80 m-10 gap-10">
        <SelectContainer src={Userimg} name="일반 사용자" link="/userstart" />
        <SelectContainer src={counselorimg} name="연구원" link="#" />
        <SelectContainer src={researcherimg} name="상담사" link="#" />
      </div>
    </>
  );
}
