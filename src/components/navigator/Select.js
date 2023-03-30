import React from "react";
import Images from "../../config/Images";

export const Select = ({Image, Text}) => {
  return (
    <>
      <div className="componentSelectNav">
        <img src={Image} alt="img" />
        <p className="parrafoNavigator">{Text}</p>
      </div>
    </>
  );
};
