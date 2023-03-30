import React from "react";

export const UnSelect = ({Image, Text}) => {
  return (
    <div>
      <div className="componentUnSelectNav">
        <img src={Image} alt="img" />
        <p className="parrafoNavigatorUnselected">{Text}</p>
      </div>
    </div>
  );
};
