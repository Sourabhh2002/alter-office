import { useState } from "react";

export default function UploadResume() {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: Get presigned URL from your API
      const response = await fetch(
        "https://api.thealteroffice.com/candidate/application/file-upload-request?purpose=RESUME&contentType=pdf",
        {
          method: "GET",
          headers: {
            "x-access-key": sessionStorage.getItem("sessionId") || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { data } = await response.json();
      const url = data.url;
      console.log("Presigned URL response:", { url });

      // Step 2: Upload the file directly to S3 using the presigned URL
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      console.log("File uploaded successfully!", url);
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        id="resumeUpload"
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      {/* Styled button that triggers the file input */}
      <label
        htmlFor="resumeUpload"
        className="w-full sm:w-[600px] py-[35px] bg-[#ffffff] text-[#000000] font-HamonBold text-[26px] leading-[26px] sm:text-[30px] sm:leading-[30px] cursor-pointer relative left-[50%] translate-x-[-50%] mt-20 block text-center"
      >
        {isUploading ? "Uploading..." : "Attach your resume"}
      </label>

      {/* Arrow btns */}
      <div className="flex items-end absolute right-0 bottom-0">
        {/* Back arrow */}
        <button
          onClick={() => window.history.back()}
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
        </button>

        {/* Forward arrow */}
        <button
          className="w-[130px] h-[135px] sm:w-[160px] sm:h-[165px] bg-[#2933AF] flex items-center justify-center cursor-pointer"
          onClick={() => (window.location.href = "/about/vacancies/7")}
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
    </>
  );
}
