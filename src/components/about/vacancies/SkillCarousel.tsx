import { useEffect, useState } from "react";
import { updateUserDetails } from "src/lib/utils/userStorage";

export default function SkillCarousel() {
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.length >= 5 && !selectedSkills.includes(skill)) {
      alert("You can only select up to 5 skills.");
      return;
    }
    setSelectedSkills((prev) => {
      const newSelectedSkills = prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill];

      return newSelectedSkills;
    });
  };

  const handleForwardClick = () => {
    updateUserDetails({ skills: selectedSkills });
    window.location.href = "/about/vacancies/4";
  };

  //  Load skills from the sessionStorage
  useEffect(() => {
    const stringifiedSkills = sessionStorage.getItem("skills");
    const parsedSkills = JSON.parse(stringifiedSkills || "{}");
    setSkills(parsedSkills);
  }, []);

  return (
    <>
      <div className="overflow-x-auto w-full absolute left-0 right-0 mt-6">
        <div className="flex gap-4 w-max">
          {skills.map((item) => (
            <button
              key={item}
              onClick={() => toggleSkill(item)}
              className={`h-[134px] sm:h-[168px] font-HamonBold text-[94px] leading-[80px] relative px-7 break-all cursor-pointer flex items-center justify-center transition-all duration-300 ${
                selectedSkills.includes(item)
                  ? "bg-[#E51A22] text-white"
                  : "bg-white text-[#E51A22]"
              }`}
            >
              <p className="relative top-1">{item}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Arrow btns */}
      <div className="flex items-end absolute right-0 bottom-0">
        {/* Back arrow */}
        <a
          href="/about/vacancies/2"
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
        {selectedSkills.length >= 1 ? (
          <button
            onClick={() => handleForwardClick()}
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
    </>
  );
}
