import React from "react";

const Spiner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spiner;