import React from "react";
import Survey from "./monitoring/Survey";
import List from "./monitoring/List";

const Monitoring = () => {
  return (
    <div className="flex-1">
      <div className="w-full p-10 flex flex-col">
        <div className="flex-1 bg-white rounded-lg shadow-md p-5">
          <Survey />
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
