import React from "react";
import { useState } from "react";

export const TextNumber = ({
  Placeholder,
  ErrorInput,
  Value,
  
  Name,
  OnChange,
}) => {
  //const [inputValue, setInputValue] = useState("");

  

  return (
    <>
      <div className="containerTextInput">
        <input
          type="number"
          className="textInput"
          name={Name}
          placeholder={Placeholder}
          value={Value}
          onChange={OnChange}
          
        ></input>
        <label className="labelInputError">{ErrorInput}</label>
      </div>
    </>
  );
};
