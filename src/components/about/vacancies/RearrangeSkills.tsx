import { useEffect, useState } from "react";
import { getUserDetails, updateUserDetails } from "src/lib/utils/userStorage";
import pkg from "react-sortablejs";
import FireExplode from "./FireExplode";

export default function RearrangeSkills() {
  const { ReactSortable } = pkg;
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleForwardBtnClick = () => {
    const sessionKey = sessionStorage.getItem("sessionId");
    if (sessionKey) {
      postApplicationSkills(sessionKey);
    }
  };

  const postApplicationSkills = async (sessionKey: string) => {
    try {
      const response = await fetch(
        "https://api.thealteroffice.com/candidate/application/skills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-key": sessionKey,
          },
          body: JSON.stringify({
            selectedSkills: selectedSkills,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Set matching job roles in session storage
      sessionStorage.setItem(
        "matchingJobRoles",
        JSON.stringify(data.matchingJobRoles)
      );

      // Set questions in session storage
      sessionStorage.setItem("questions", JSON.stringify(data.questions));

      // Show FireExplode animation for 4 seconds
      const animationElement = document.getElementById("fireExplode");
      if (animationElement) {
        animationElement.style.display = "block";

        // Redirect after 4 seconds
        setTimeout(() => {
          window.location.href = "/about/vacancies/5";
        }, 3600);
      } else {
        // If animation element not found, redirect immediately
        window.location.href = "/about/vacancies/5";
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "There was an error submitting your information. Please try again."
      );
    }
  };

  // get selectedSkills data from sessionStorage
  useEffect(() => {
    const userDetails = getUserDetails();
    setSelectedSkills(userDetails.skills || []);
  }, []);

  // set sessionStorage as soon as drag happens
  useEffect(() => {
    updateUserDetails({
      skills: selectedSkills,
    });
  }, [selectedSkills]);

  return (
    <>
      <div className="flex flex-col items-center gap-2 mt-10 relative">
        <div className="absolute -top-1 mr-[750px] text-[#ffffff] text-[54px] font-HamonLight hidden sm:block tracking-wide">
          Primary
        </div>

        {/* Container with fixed width to constrain the sortable area */}
        <div className="w-full max-w-xl">
          {/* Sortable List */}
          <ReactSortable
            list={selectedSkills.map((item) => ({ id: item, name: item }))}
            setList={(newList) => {
              setSelectedSkills(newList.map((item) => item.name));
            }}
            tag="div"
            animation={200}
            direction="vertical"
            ghostClass="opacity-60"
            chosenClass="bg-gray-100"
            dragClass="cursor-grabbing"
          >
            {selectedSkills.map((item) => (
              <div
                key={item}
                className="h-[80px] bg-[#ffffff] text-[#E51A22] font-HamonBold text-[54px] leading-[74px] px-10 flex items-center justify-center cursor-grab my-2 mx-auto transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ width: "fit-content", minWidth: "270px" }}
              >
                <p className="relative top-1 whitespace-nowrap">{item}</p>
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>

      {/* Arrow Buttons */}
      <div className="flex items-end absolute right-0 bottom-0">
        <a
          href="/about/vacancies/3"
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
      </div>

      <div id="fireExplode" style={{ display: "none" }}>
        <FireExplode />
      </div>
    </>
  );
}
