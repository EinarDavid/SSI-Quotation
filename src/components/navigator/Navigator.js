import React from "react";
import { NavLink } from "react-router-dom";
import Images from "../../config/Images";
import { Select } from "./Select";
import { UnSelect } from "./UnSelect";

export const Navigator = () => {
  return (
    <>
      <div className="mainNav">
        <div className="logoHeader">
          <img src={Images.SSI_LOGO} alt="ssi" />
        </div>
        <div className="spaceVer30" />
        <div className="containerNavComponents">
          

          <NavLink to={"/cotizacion"}>
            {({ isActive }) =>
              isActive ? (
                <Select Image={Images.COTIZACIONES} Text={"Cotizaciones"} />
              ) : (
                <UnSelect Image={Images.COTIZACIONES} Text={"Cotizaciones"} />
              )
            }
          </NavLink>

          <NavLink  target={"_blank"} to={"http://192.168.5.101:3000"}>
            {({ isActive }) =>
              isActive ? (
                <Select Image={Images.QUOSELECTED} Text={"SSI ODO"} />
              ) : (
                <UnSelect Image={Images.QUOUNSELECTED} Text={"SSI ODO"} />
              )
            }
          </NavLink>

          
        </div>
      </div>
    </>
  );
};
