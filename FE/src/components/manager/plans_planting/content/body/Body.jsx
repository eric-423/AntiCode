import React, { useEffect, useRef, useState } from "react";
import "./Body.css";
import CALENDAR from "../../../../../constant/calendar";

const Body = () => {
  const timeRef = useRef(null);
  const [viewMode, setViewMode] = useState(CALENDAR.LIST_YEAR);
  const [widthTimeLine, setWidthTimeLine] = useState();
  const [leftTimeLine, setLeftTimeLine] = useState();
  const caculateWidthTimeLine = (width) => {
    const startDate = new Date("2025-1-20");
    const endDate = new Date("2025-12-20");
    const _leftTimeLine =
      startDate.getMonth() * (width / (viewMode.length - 1));
    const _widthTimeLine =
      endDate.getMonth() * (width / (viewMode.length - 1)) - _leftTimeLine;
    setLeftTimeLine(_leftTimeLine === 0 ? 10 : _leftTimeLine);
    setWidthTimeLine(
      _leftTimeLine === 0 ? _widthTimeLine - 20 : _widthTimeLine
    );
  };

  useEffect(() => {
    if (timeRef) {
      caculateWidthTimeLine(timeRef.current.offsetWidth);
    }
  }, []);

  return (
    <ul className="plans-content-header">
      <li style={{
        backgroundColor: "#F7F7F7"
      }}>Plans Name</li>
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
            }}
          >
            <div className="progress-bar-done">
              <span>Planting Apple Tree</span>
            </div>
            <span className="percentage-done">40% Done</span>
          </div>
        )}
      </div>
    </ul>
  );
};

export default Body;
