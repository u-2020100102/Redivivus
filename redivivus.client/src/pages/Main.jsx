import React from "react";
import LayoutHeader from "../component/layout/layoutHeader";
import LayoutMain from "../component/layout/layoutMain";
import LayoutFooter from "../component/layout/layoutFooter";

const Main = () => {
  return (
    <div className="w-full h-full grid">
      <div className="border-b-2 border-neutral">
        <LayoutHeader />
      </div>
      <div className="min-h-screen">
        <LayoutMain />
      </div>
      <div>
        <LayoutFooter />
      </div>
    </div>
  );
};

export default Main;
