import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-[2px] z-10 ">
      <img className="w-[30%]" src="/loading-1.gif" alt="Loading" />
    </div>
  );
};

export default Loader;
