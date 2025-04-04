import { useEffect, useState } from "react";

export default function SuggestedRoles() {
  const [suggestedRoles, setSuggestedRoles] = useState<any>([]);

  useEffect(() => {
    const stringifiedData = sessionStorage.getItem("matchingJobRoles") || "";
    const parsedData = JSON.parse(stringifiedData);
    setSuggestedRoles(parsedData);
  }, []);

  console.log(suggestedRoles);

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center gap-16 mt-16 px-4 md:px-0">
      {suggestedRoles.map((item: any) => (
        <div className="w-full md:w-[446px]" key={item?.imageUrl}>
          <div className="h-[200px] md:h-[446px]">
            <img
              src={item?.imageUrl}
              alt="roles_img"
              loading="lazy"
              className="object-cover size-full"
            />
          </div>
          <div className="h-[97px] bg-[#ffffff] font-HamonBold text-[45px] text-[#E3211F] flex items-center justify-center">
            {item?.title}
          </div>
        </div>
      ))}
    </div>
  );
}
