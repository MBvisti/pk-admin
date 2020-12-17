import React from "react";

export const Home = () => {
  const currentDay = new Date();

  return (
    <div className="md:flex md:flex-col">
      <div className="md:flex md:justify-between">
        <h2 className="text-pk-dark-gray md:text-xl md:font-semibold">
          Dashboard
        </h2>
        <span>
          {currentDay.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="md:mt-4 md:flex md:justify-between">
        <div className="md:flex md:flex-col md:w-2/5">
          <div className="md:flex md:justify-between">
            <p>1</p>
            <p>2</p>
          </div>
          <div className="md:flex md:justify-between">
            <p>1</p>
            <p>2</p>
          </div>
        </div>
        <div>
          <p>Big data </p>
        </div>
      </div>
      <p>Dashboard</p>
    </div>
  );
};
