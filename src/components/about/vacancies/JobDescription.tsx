import { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function JobDescription() {
  const [jobDescription, setJobDescription] = useState(null);
  const [jobImg, setJobImg] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get jobRoleId from URL params
    const searchParams = new URLSearchParams(window.location.search);
    const jobRoleId = searchParams.get("jobRoleId");

    // Get job roles data from sessionStorage
    const stringifiedDescription = sessionStorage.getItem("matchingJobRoles");
    const parsedDescriptions = stringifiedDescription
      ? JSON.parse(stringifiedDescription)
      : null;

    if (parsedDescriptions && jobRoleId) {
      // Find the job with matching jobRoleId
      const matchedJob = parsedDescriptions.find(
        (job: any) => job.jobRoleId.toString() === jobRoleId
      );

      if (matchedJob) {
        setJobDescription(matchedJob.description);
        setJobImg(matchedJob.imageUrl);
      }
    }
  }, []);

  const postCandidateSession = async () => {
    if (!name || !mobile) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.thealteroffice.com/candidate/application/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-key": sessionStorage.getItem("sessionId") || "",
          },
          body: JSON.stringify({
            name: name,
            mobile: mobile,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Show success message
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(
        "There was an error submitting your information. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 lg:px-[75px] mt-16">
      {/* Close btn */}
      <a
        id="close-btn"
        href="/about"
        className="size-[70px] sm:size-[98px] absolute top-0 right-0 bg-[#000000] flex items-center justify-center cursor-pointer z-50"
      >
        <img
          src="/images/misc/close.svg"
          alt="Close"
          width={42}
          height={42}
          loading="eager"
          className="size-[28px] sm:size-[42px]"
        />
      </a>

      {/* Job description */}
      <div className="text-xl w-[60%]">{parse(jobDescription || "")}</div>

      {/* Job image */}
      <div className="h-[900px] w-[500px] absolute top-0 right-0">
        <img
          src={jobImg || ""}
          alt="roles_img"
          loading="lazy"
          className="object-cover size-full"
        />
      </div>

      <div className="absolute bottom-24">
        <p className="font-HamonBold text-[24px] leading-[26px]">
          Do you think you can fit in this role, thammaiah?
        </p>

        <div className="font-HamonBold text-[24px] flex gap-6 mt-4">
          <input
            className="w-[400px] h-[80px] bg-[#EDEDED] placeholder:opacity-20 px-6 outline-none"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-[400px] h-[80px] bg-[#EDEDED] placeholder:opacity-20 px-6 outline-none"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value;
              // Only allow numbers and restrict to 10 digits
              if (value === "" || (/^\d+$/.test(value) && value.length <= 10)) {
                setMobile(value);
              }
            }}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
          />
          <button
            id="applyBtn"
            className="px-[72px] py-[20px] bg-[#293B9D] text-[#ffffff] font-HamonBold text-[26px] leading-[26px] sm:text-[30px] sm:leading-[30px] cursor-pointer"
            onClick={postCandidateSession}
            disabled={isSubmitting}
          >
            <p className="relative top-[2px]">
              {isSubmitting ? "SENDING..." : "APPLY"}
            </p>
          </button>
        </div>
      </div>

      <div className="w-full h-5 bg-[#293B9D] absolute bottom-0 left-0 right-0" />
    </div>
  );
}
