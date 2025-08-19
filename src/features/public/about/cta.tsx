import React from "react";
import stacks from "@/assets/extra imges/jwellaryset.jpeg";
import { useNavigate } from "@tanstack/react-router";
// import { useNavigate } from "react-router";

const CTA: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate({ to: "/products" });
  };

  return (
    <div className="relative pt-20 lg:pt-10 overflow-hidden mb-20 lg:mb-30">
      {/* <h2 className="text-3xl font-bold text-center text-black mb-12">
        Why Our Clients Love Us
      </h2> */}
      {/* <h2 className="text-3xl font-bold md:text-4xl text-white mb-12 text-center">
        Why Our{" "}
        <span className="from-[#F7C46B] to-[#F29F05] bg-linear-to-r bg-clip-text text-transparent">
          Clients Love Us{" "}
        </span>
      </h2> */}
      <h2 className='text-3xl font-bold md:text-4xl mb-12 text-center'>
            <span className='from-accent-foreground to-primary bg-linear-to-r bg-clip-text text-transparent'>
            Why Our{" "}
            </span>
            Clients Love Us{" "}
          </h2>
      <div className="relative p-px rounded-2xl overflow-hidden group z-10 mx-4 sm:mx-16 md:mx-28 2xl:mx-auto max-w-[1280px]">
        <div className="absolute inset-0 rounded-xl bg-[linear-gradient(155deg,#C47F31,#555_60%)] transition-transform duration-700 group-hover:rotate-180 blur-3xl scale-150"></div>
        <div
          className="absolute inset-0 rounded-xl transition-transform duration-700 group-hover:rotate-180 blur-3xl scale-150"
          style={{
            background: "linear-gradient(155deg, var(--theme-color), #555 60%)",
          }}
        ></div>

        <div className="bg-gradient-to-b from-[#141110] to-[#231e1d] rounded-2xl justify-between items-start gap-[27px] flex overflow-hidden relative">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-[100%] lg:w-[55%] z-10">
            <div className="text-3xl lg:text-4xl font-medium leading-[3rem] text-white">
              Shreesha Jwellary
            </div>
            <div className="text-white text-xl lg:text-2xl font-medium mt-6 mb-12">
              Elegant designs that shine so bright,
              <br />
              Luxury looks at a perfect price,
              <br />
              Crafted with care, made just for you,
              <br />
              Timeless beauty, always true!
            </div>

            <div className="mt-5">
              <button
                onClick={handleClick}
                type="button"
                className={`px-5 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-2 lg:px-8 lg:py-2 border rounded-2xl border-white justify-center items-center inline-flex overflow-hidden cursor-pointer relative transition-all duration-500 group/nested disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                <div className="dot absolute left-3 sm:left-4 md:left-5 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 bg-white rounded-xl group-hover/nested:left-0 group-hover/nested:h-full group-hover/nested:w-full transition-all duration-500"></div>
                <div className="absolute left-3 sm:left-4 md:left-5 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 bg-black rounded-xl scale-0 opacity-0 group-hover/nested:scale-100 group-hover/nested:opacity-100 transition-all duration-500"></div>
                <div className="relative z-10 text-white group-hover/nested:text-black text-sm sm:text-base md:text-sm lg:text-xl font-medium text-nowrap ml-3 sm:ml-4 md:ml-5 transition-all duration-500 flex items-center gap-2">
                  See New Products
                </div>
              </button>
            </div>
          </div>
          <div className="absolute h-full right-0 opacity-20 md:opacity-40 lg:opacity-100 blur-0 lg:blur-0 ">
            <img
              loading="lazy"
              src={stacks}
              alt="stack"
              className="h-full w-full object-cover bg-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
