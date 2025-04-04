import { useState } from "react";

interface StringTypeProps {
  question: string;
  jobRoleQuestionId: number;
  currentIndex: number;
  totalIndex: number;
}

export default function StringType({
  question,
  jobRoleQuestionId,
  currentIndex,
  totalIndex,
}: StringTypeProps) {
  const [answer, setAnswer] = useState("");

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
    <main className="w-full mt-[150px]">
      <div className="flex flex-col sm:flex-row">
        <div className="font-HamonBold text-[clamp(3.5rem,2.786rem+3.571vw,6rem)] leading-[clamp(3rem,2.446rem+2.768vw,5.5rem)] text-white w-full sm:w-[55%]">
          {question}
        </div>

        <div className="w-full sm:w-[50%] ml-6 sm:ml-0 sm:absolute sm:right-0 border-b-[400px] sm:border-b-[528px] border-b-[#ffffff] border-l-[75px] sm:border-l-[114px] border-l-transparent mt-16 sm:mt-0">
          <textarea
            className="outline-none absolute w-[400px] sm:w-full mt-8 pl-10 pr-5 h-[350px] sm:h-[480px] text-[30px] leading-[30px] font-HamonRegular placeholder:font-HamonLight resize-none"
            placeholder="Type that experience"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </div>

      {/* Arrow btns */}
      <div className="flex items-end absolute right-0 bottom-0">
        {/* Back arrow */}
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

        {/* Forward arrow */}
        {answer.length > 10 ? (
          <button
            onClick={() => handleForwardBtnClick()}
            className="w-[130px] h-[135px] sm:w-[160px] sm:h-[165px] bg-[#2933AF] flex items-center justify-center cursor-pointer"
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
        ) : (
          <div className="w-[130px] h-[135px] sm:w-[160px] sm:h-[165px]"></div>
        )}
      </div>
    </main>
  );
}
