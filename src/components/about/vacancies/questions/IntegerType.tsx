import CustomSlider from "@components/ui/Slider";
import { useState } from "react";

interface IntegerTypeProps {
  question: string;
  jobRoleQuestionId: number;
  currentIndex: number;
  totalIndex: number;
}

export default function IntegerType({
  question,
  jobRoleQuestionId,
  currentIndex,
  totalIndex,
}: IntegerTypeProps) {
  const [answer, setAnswer] = useState("0");

  const handleForwardBtnClick = () => {
    const sessionKey = sessionStorage.getItem("sessionId");
    if (sessionKey) {
      postApplicationAnswers(sessionKey);
    }
  };

  const postApplicationAnswers = async (sessionKey: string) => {
    try {
      const response = await fetch(
        "https://api.thealteroffice.com/candidate/application/answers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-key": sessionKey,
          },
          body: JSON.stringify({
            jobRoleQuestionId: jobRoleQuestionId,
            answer: answer,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Set Question answer in the sessionStorage

      // Redirect after successful submission
      if (currentIndex >= totalIndex) {
        window.location.href = `/about/vacancies/6`;
      } else {
        window.location.href = `/about/vacancies/5?q=${currentIndex + 1}`;
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "There was an error submitting your information. Please try again."
      );
    }
  };

  return (
    <div className="mt-36">
      <div className="font-HamonBold text-[clamp(3.5rem,2.786rem+3.571vw,6rem)] leading-[clamp(3rem,2.446rem+2.768vw,5.5rem)] text-[#ffffff] w-full  md:w-[80%]">
        {question}
      </div>

      <div className="mt-[160px] w-[95%] md:w-[90%] relative md:left-5">
        <CustomSlider
          max={5}
          defaultValue={0}
          onChange={(val) => setAnswer(String(val))}
        />
      </div>

      {/* Arrow Buttons */}
      <div className="flex items-end absolute right-0 bottom-0">
        <a
          href={
            currentIndex < 1
              ? "/about/vacancies/4"
              : `/about/vacancies/5?q=${currentIndex - 1}`
          }
          className="h-[95px] w-[100px] sm:size-[123px] bg-[#C80005] flex items-center justify-center cursor-pointer"
        >
          <img
            src="/images/misc/back_arrow.svg"
            alt="Back_Arrow"
            width={54}
            height={54}
            loading="lazy"
            className="size-[40px] sm:size-[54px]"
          />
        </a>

        <button
          className="w-[130px] h-[135px] sm:w-[160px] sm:h-[165px] bg-[#2933AF] flex items-center justify-center cursor-pointer"
          onClick={() => handleForwardBtnClick()}
        >
          <img
            src="/images/misc/forward_arrow.svg"
            alt="Forward_Arrow"
            width={68}
            height={68}
            loading="lazy"
            className="size-[54px] sm:size-[68px]"
          />
        </button>
      </div>
    </div>
  );
}
