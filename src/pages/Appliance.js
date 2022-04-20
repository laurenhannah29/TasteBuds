import React, { useState } from "react";
import Data from "./Data";
import Card from "./Card";
 
function Appliance() {
  const [item, setItem] = useState(Data);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h1 className="col-12 text-center my-3 fw-bold">Our Menu</h1>
          <Card item={item} /> // UI Component
        </div>
      </div>
    </>
  );
};
 
export default Appliance;