import "./Content.css";
import Header from "./header/Header";
import Body from "./body/Body";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import BASE from "../../../../constant/base";
import useFormattedDate from "../../../../hook/useFormatDate";

const Content = () => {
  const [plans, setPlans] = useState();
  const [locationCardHover, setLocationCardHover] = useState();
  const containerRef = useRef(null);
  const [showCardHover, setShowCardHover] = useState(false);
  const [planDetail, setPlanDetail] = useState();

  const handleFetchPlansDetail = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/plans/plant-id?plan=${locationCardHover.plan}`
      );
      if (!response || response.status !== 200) throw new Error("");
      setPlanDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchPlans = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/plans`);
      if (!response || response.status !== 200) throw new Error();
      setPlans(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!plans) {
      handleFetchPlans();
    }
  }, []);

  useEffect(() => {
    if (locationCardHover && showCardHover) {
      handleFetchPlansDetail();
    }
  }, [locationCardHover]);

  return (
    <div className="plans-content-container" ref={containerRef}>
      <Header />
      <div className="plans-content-body-container">
        {plans &&
          plans.map((item) => (
            <Body
              item={item}
              setLocationCardHover={setLocationCardHover}
              containerRef={containerRef}
              setShowCardHover={setShowCardHover}
            />
          ))}
        {showCardHover && (
          <div
            className="card-hover-plans-detail"
            style={{
              left: locationCardHover?.x,
              top: locationCardHover?.y,
            }}
          >
            <div>
              <span style={{ color: "#F28705" }}>{`${useFormattedDate(
                planDetail?.startHarvest,
                "dd/MM"
              )} - ${useFormattedDate(planDetail?.endHarvest, "dd/MM")}`}</span>
            </div>
            <div>
              <span>Plans Name:</span>
              <span>{planDetail?.namePlans}</span>
            </div>
            <div>
              <span>Farm:</span>
              <span>{planDetail?.farm}</span>
            </div>
            <div>
              <span>Area:</span>
              <span>{planDetail?.area}</span>
            </div>
            <div>
              <span>Location:</span>
              <span>{planDetail?.locations?.map((item) => `${item},`)}</span>
            </div>
            <div>
              <span>Task Coming Up:</span>
              <div>
                {planDetail?.tasks?.map((item, index) => (
                  <p>{`${index + 1} - ${item}`}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
