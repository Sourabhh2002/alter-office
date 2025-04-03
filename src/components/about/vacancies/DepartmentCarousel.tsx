import { useEffect, useState } from "react";
import { updateUserDetails } from "src/lib/utils/userStorage";

export default function DepartmentCarousel() {
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const handleSelectDepartment = (department: string) => {
    setSelectedDepartment(department);
    updateUserDetails({
      department: department,
    });
    const stringifiedDepartmentSkills =
      sessionStorage.getItem("departmentSkills");
    const parsedDepartmentSkills = JSON.parse(
      stringifiedDepartmentSkills || "{}"
    );
    const skills = parsedDepartmentSkills.departmentSkills[department];
    sessionStorage.setItem("skills", JSON.stringify(skills));
  };

  const fetchDepartmentSkills = async () => {
    try {
      const response = await fetch(
        "https://api.thealteroffice.com/candidate/skills",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-key": sessionStorage.getItem("sessionId") || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      sessionStorage.setItem("departmentSkills", JSON.stringify(data));
      setDepartments(data.departments);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const initializeDepartments = async () => {
      try {
        const stringifiedDepartmentSkills =
          sessionStorage.getItem("departmentSkills");

        if (stringifiedDepartmentSkills) {
          const parsedDepartmentSkills = JSON.parse(
            stringifiedDepartmentSkills
          );

          if (parsedDepartmentSkills?.departments) {
            setDepartments(parsedDepartmentSkills.departments);
          } else {
            await fetchDepartmentSkills();
          }
        } else {
          await fetchDepartmentSkills();
        }
      } catch (error) {
        console.error("Error initializing departments:", error);
        await fetchDepartmentSkills();
      }
    };

    initializeDepartments();
  }, []);

  return (
    <>
      <div className="overflow-hidden w-full absolute bottom-0 left-0">
        <div className="flex gap-6">
          {departments.map((item) => (
            <button
              key={item}
              onClick={() => handleSelectDepartment(item)}
              className={`h-[502px] w-[405px] font-HamonBold text-[94px] leading-[80px] relative px-7 break-all cursor-pointer transition-all duration-300 ${
                selectedDepartment === item
                  ? "bg-[#E51A22] text-[#ffffff]"
                  : "bg-[#ffffff] text-[#E51A22]"
              }`}
            >
              <p className="absolute bottom-[24px]">{item}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Arrow btns */}
      <div className="flex items-end absolute right-0 bottom-0">
        {/* Back arrow */}
        <a
          href="/about/vacancies/1"
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
        {selectedDepartment ? (
          <a
            href="/about/vacancies/3"
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
          </a>
        ) : (
          <div className="w-[130px] h-[135px] sm:w-[160px] sm:h-[165px]"></div>
        )}
      </div>
    </>
  );
}
