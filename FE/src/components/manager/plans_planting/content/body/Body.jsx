import React, { useEffect, useRef, useState } from "react";
import "./Body.css";
import CALENDAR from "../../../../../constant/calendar";

const Body = ({
  item,
  setLocationCardHover,
  containerRef,
  setShowCardHover,
}) => {
  const timeRef = useRef(null);
  const [viewMode, setViewMode] = useState(CALENDAR.LIST_YEAR);
  const [widthTimeLine, setWidthTimeLine] = useState();
  const [leftTimeLine, setLeftTimeLine] = useState();
  const [percentage, setPercentage] = useState();

  const caculateWidthTimeLine = (width) => {
    const startDate = new Date(item?.startHarvest);
    const endDate = new Date(item?.endHarvest);
    const currentDate = new Date();

    const _leftTimeLine =
      startDate.getMonth() * (width / (viewMode.length - 1));
    const _widthTimeLine =
      endDate.getMonth() * (width / (viewMode.length - 1)) - _leftTimeLine;
    setLeftTimeLine(_leftTimeLine === 0 ? 10 : _leftTimeLine);
    setWidthTimeLine(
      _leftTimeLine === 0 ? _widthTimeLine - 20 : _widthTimeLine
    );
    const _percentage =
      ((currentDate.getTime() - startDate.getTime()) /
        (endDate.getTime() - startDate.getTime())) *
      100;
    setPercentage(_percentage);
  };

  const handleLocateMouseHover = (event) => {

      const clientX = event.clientX;
      const clientY = event.clientY;
      const rect = containerRef.current.getBoundingClientRect();
      const data = {
        x: clientX - rect.left + 20,
        y: (clientY - rect.top)/2,
        plan: item?.plans
      };
      setLocationCardHover(data);
      setShowCardHover(true);

  };

  const handleLocateMouseLeave = () => {
      setShowCardHover(false);
      setLocationCardHover();
  };

  useEffect(() => {
    if (timeRef) {
      caculateWidthTimeLine(timeRef.current.offsetWidth);
    }
  }, []);

  return (
    <ul className="plans-content-header">
      <li
        style={{
          backgroundColor: "#F7F7F7",
        }}
      >
        {item?.namePlans}
      </li>
      <div className="plans-content-cotainer-month-body" ref={timeRef}>
        {viewMode.map((item) => (
          <li></li>
        ))}
        {widthTimeLine && leftTimeLine && (
          <div
            className="plans-time-line"
            style={{
              width: widthTimeLine,
              left: leftTimeLine,
              cursor: "pointer",
            }}
            onMouseEnter={(event) => handleLocateMouseHover(event)}
            onMouseLeave={() => handleLocateMouseLeave()}
          >
            <div
              className="progress-bar-done"
              style={{
                width: percentage > 0 ? percentage * widthTimeLine : 0,
              }}
            >
              <span>{`Plans for planting ${item?.namePlans}`}</span>
            </div>
            <span className="percentage-done">
              {`${percentage < 0 ? `0%` : percentage}`} Done
            </span>
          </div>
        )}
      </div>
    </ul>
  );
};

export default Body;
