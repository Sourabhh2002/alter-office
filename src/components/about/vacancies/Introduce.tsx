import { useState, useEffect } from "react";
import { updateUserDetails } from "src/lib/utils/userStorage";

export default function Introduce() {
  const [name, setName] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [isStudyBtnClicked, setIsStudyBtnClicked] = useState(false);
  const [showForwardBtn, setShowForwardBtn] = useState(false);

  const handleForwardClick = async () => {
    if (name.trim()) {
      updateUserDetails({
        name: name.trim(),
        gender: selectedGender,
      });

      await postCandidateSession(name.trim());
    }
  };

  const postCandidateSession = async (candidateName: string) => {
    try {
      const response = await fetch(
        "https://api.thealteroffice.com/candidate/session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: candidateName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      sessionStorage.setItem("sessionId", data.sessionKey);

      // Make next api call after successful submission
      await patchCandidateApplication(data.sessionKey);
    } catch (error) {
      console.error("Error:", error);
      alert(
        "There was an error submitting your information. Please try again."
      );
    }
  };

  const patchCandidateApplication = async (sessionKey: string) => {
    try {
      const response = await fetch(
        "https://api.thealteroffice.com/candidate/application",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-key": sessionKey,
          },
          body: JSON.stringify({
            gender: selectedGender,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Redirect after successful submission
      window.location.href = "/about/vacancies/2";
    } catch (error) {
      console.error("Error:", error);
      alert(
        "There was an error submitting your information. Please try again."
      );
    }
  };

  useEffect(() => {
    // Check if all conditions are met to show forward button
    if (name.trim() && selectedGender && isStudyBtnClicked) {
      setShowForwardBtn(true);
    } else {
      setShowForwardBtn(false);
    }
  }, [name, selectedGender, isStudyBtnClicked]);

  return (
    <main className="w-full mt-[95px] px-4 lg:px-[75px]">
      <div className="font-HamonBold text-[clamp(3.5rem,2.786rem+3.571vw,6rem)] leading-[clamp(3rem,2.446rem+2.768vw,4.938rem)] text-white text-center">
        Before starting, introduce yourself
      </div>

      <div className="w-full sm:w-[644px] flex flex-col mx-auto gap-[16px] mt-[50px] sm:mt-[72px] px-2 sm:px-0">
        {/* Name */}
        <input
          id="nameInput"
          className="placeholder__hide__on__focus placeholder__show__on__blur bg-[#ffffff] h-[92px] flex justify-center items-center font-HamonBold text-[24px] text-[#000000] outline-none text-center placeholder:text-[#000000] placeholder:opacity-30"
          placeholder="Tell your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="h-[168px] my-[24px]">
          {/* Gender selection */}
          {selectedGender === null ? (
            <div className="flex justify-center gap-[25px]">
              <button
                className="size-[168px] bg-[#ffffff] relative cursor-pointer"
                onClick={() => setSelectedGender("Male")}
              >
                <p className="font-HamonBold text-[24px] text-[#000000] opacity-30 absolute bottom-2 left-1/2 -translate-x-1/2">
                  Male
                </p>
              </button>
              <button
                className="genderBtn size-[168px] bg-[#ffffff] relative cursor-pointer"
                onClick={() => setSelectedGender("Female")}
              >
                <p className="font-HamonBold text-[24px] text-[#000000] opacity-30 absolute bottom-2 left-1/2 -translate-x-1/2">
                  Female
                </p>
              </button>
            </div>
          ) : (
            <div className="text-center font-HamonBold text-[24px] text-[#ffffff] relative top-1/2 -translate-y-1/2">
              We don't care about your gender🤷🏻‍♂️
            </div>
          )}
        </div>

        {/* Study */}
        {!isStudyBtnClicked ? (
          <button
            className="bg-[#ffffff] h-[92px] flex justify-center items-center mt-[10px] cursor-pointer"
            onClick={() => setIsStudyBtnClicked(true)}
          >
            <p className="font-HamonBold text-[24px] text-[#000000] opacity-30">
              Where you studied?
            </p>
          </button>
        ) : (
          <div className="font-HamonBold text-[24px] h-[92px] text-[#ffffff] mt-[10px] flex items-center justify-center">
            We don't care where you studied🤷🏻‍♂️
          </div>
        )}

        {!isStudyBtnClicked && (
          <>
            <div className="bg-[#ffffff] h-[92px] opacity-60 mt-[6px]"></div>
            <div className="bg-[#ffffff] h-[92px] opacity-40"></div>
            <div className="bg-[#ffffff] h-[92px] opacity-20"></div>
            <div className="bg-[#ffffff] h-[92px] opacity-10"></div>
          </>
        )}
      </div>

      {/* Arrow btns */}
      <div className="flex items-end absolute right-0 bottom-0">
        {/* Back arrow */}
        <a
          href="/about/vacancies/getting-started"
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
        {showForwardBtn ? (
          <button
            onClick={handleForwardClick}
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
