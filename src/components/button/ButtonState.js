import React from "react";

export const ButtonState = ({ State, InProgress }) => {
  //console.log('----',State)
  return (
    <>
      {State === "NW" || State === "NEW" ? (
        InProgress === "EN PROGRESO" ? (
          <>
          <button
              className="stateStyle"
              style={{ background: "var(--bs-placeholder)" }}
              //onClick={OnClick}
              //disabled={Disabled}
            >
              <p className="stateParrafo">En progreso</p>
            </button>
          </>
        ) : (
          <>
            <button
              className="stateStyle"
              style={{ background: "var(--bs-warming)" }}
              //onClick={OnClick}
              //disabled={Disabled}
            >
              <p className="stateParrafo">Nuevo</p>
            </button>
          </>
        )
      ) : State === "REG" || State === "REGISTERED" ? (
        <>
          <button
            className="stateStyle"
            style={{ background: "var(--bs-success)" }}
            //onClick={OnClick}
            //disabled={Disabled}
          >
            <p className="stateParrafo">Registrado</p>
          </button>
        </>
      ) : State === "CANCEL" ? (
        <>
          <button
            className="stateStyle"
            style={{ background: "var(--bs-danger)" }}
            //onClick={OnClick}
            //disabled={Disabled}
          >
            <p className="stateParrafo">Cancelado</p>
          </button>
        </>
      ) : State === "BLOCKED" ? (
        <>
          <button
            className="stateStyle"
            style={{ background: "var(--bs-success)" }}
            //onClick={OnClick}
            //disabled={Disabled}
          >
            <p className="stateParrafo">Registrado</p>
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
