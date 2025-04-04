import { useState } from "react";

interface MultiTypeProps {
  question: string;
  options: string[];
  jobRoleQuestionId: number;
  currentIndex: number;
  totalIndex: number;
}

export default function MultiType({
  question,
  options,
  jobRoleQuestionId,
  currentIndex,
  totalIndex,
}: MultiTypeProps) {
  const [answer, setAnswer] = useState<string[]>([]);

  const toggleAnswer = (val: string) => {
    if (answer.length >= 5 && !answer.includes(val)) {
      alert("You can only select up to 5 skills.");
      return;
    }
    setAnswer((prev) => {
      const newSelectedSkills = prev.includes(val)
        ? prev.filter((s) => s !== val)
        : [...prev, val];

      return newSelectedSkills;
    });
  };

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
    <main className="w-full mt-[100px]">
      <div className="font-HamonBold text-[clamp(3.5rem,2.786rem+3.571vw,6rem)] leading-[clamp(3rem,2.446rem+2.768vw,4.938rem)] text-white">
        {question}
      </div>

      <div className="overflow-x-auto w-full absolute left-0 mt-12">
        <div className="flex gap-6 w-max">
          {options.map((item) => (
            <button
              key={item}
              onClick={() => toggleAnswer(item)}
              className={`h-[134px] sm:h-[168px] font-HamonBold text-[94px] leading-[80px] relative px-7 break-all cursor-pointer flex items-center justify-center transition-all duration-300 ${
                answer.includes(item)
                  ? "bg-[#E51A22] text-white"
                  : "bg-white text-[#E51A22]"
              }`}
            >
              <p className="relative text-left">{item}</p>
            </button>
          ))}
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
        {answer.length >= 1 ? (
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
