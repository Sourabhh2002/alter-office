export default function AnalysisLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-[#E51A22] pt-[10px] sm:pt-[16px] md:pt-[21px] 2xl:pt-[33px]">
      <div className="inner-container">
        <div className="w-full px-[11px] sm:px-[27px] md:px-[43px] lg:px-[75px]">
          {/* Alter office logo */}
          <img
            src="/images/misc/tao_logo_blue.png"
            alt="Alter_Office_Logo"
            width={212}
            height={72}
            loading="eager"
            className="w-[164px] h-[56px] sm:w-[188px] sm:h-[64px] md:w-[212px] md:h-[72px]"
          />
        </div>
        {/* Close btn */}
        <a
          href="/about"
          className="size-[70px] sm:size-[98px] absolute top-0 right-0 bg-[#000000] flex items-center justify-center cursor-pointer"
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

        {/* Main content */}
        <div className="text-[#ffffff] text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <div className="font-HamonBold text-[clamp(3.5rem,2.786rem+3.571vw,6rem)] leading-[clamp(3rem,2.446rem+2.768vw,5.5rem)]">
            We're analysing now...
          </div>
          <p className="font-HamonLight text-[clamp(2rem,0.714rem+3.929vw,4.25rem)] leading-[clamp(1.063rem,0.259rem+4.018vw,3.875rem)] mt-8">
            To find out which role you can be in
          </p>
          <p className="font-HamonLight text-[clamp(2rem,0.714rem+3.929vw,4.25rem)] leading-[clamp(1.063rem,0.259rem+4.018vw,3.875rem)] mt-4 sm:mt-2">
            The Alter Office
          </p>
        </div>
      </div>
    </div>
  );
}
