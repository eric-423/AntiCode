import "./Content.css";
import Header from "./header/Header";
import Body from "./body/Body";

const Content = () => {
  return (
    <div className="plans-content-container">
      <Header />
      <div className="plans-content-body-container">
        <Body />
        <Body />
        <Body />
      </div>
    </div>
  );
};

export default Content;
