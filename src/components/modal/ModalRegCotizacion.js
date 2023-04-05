import React, { useEffect, useState } from "react";
import Images from "../../config/Images";
import { postAddQuotation } from "../../services/cotizacionService";
import { ButtonPrimary } from "../button/ButtonPrimary";
import { RegistroCotizacion } from "../Forms/RegistroCotizacion";

export const ModalRegCotizacion = ({ SetModal, modal, callback }) => {
  const fecha = new Date();
  const a = fecha.getFullYear();
  const m = fecha.getMonth() + 1;
  const d = fecha.getDate();
  const fechaActual = `${m}/${d}/${a}`;

  const [disableButton, setDisableButton] = useState(true);
  const [validUrl, setValidUrl] = useState(false);

  const [cabecera, setCabecera] = useState({
    client: "",
    responsible: "",
    date: fechaActual,
    status: "NW",
    total_effort: 0.0,
    project_code: "",
    project_type: "",
    link_jira: "",
  });


  const onSubmit = () => {
    //Deshabilitas boton
    try {
      //alert('entro')

      setDisableButton(true);
      let data = cabecera;
      console.log(data);

      postAddQuotation(data).then(({ data }) => {
        console.log("resPOST", data);

        //Habilitas boton
        setDisableButton(false);
        SetModal(false);

        //limpiar cajas, cerrar modal y avisar que fue añadido con exito
        if (callback) callback();
        setCabecera({
          client: "",
          responsible: "",
          date: fechaActual,
          status: "NW",
          total_effort: 0.0,
          project_code: "",
          project_type: "",
        });

        alert(data.message);
      });
    } catch (error) {
      alert(error);
      console.log("----", error);
    }
  };

  const handleChangeCabecera = (event) => {
    if (event.target.name === "project_code") {
      setCabecera({
        ...cabecera,
        [event.target.name]: event.target.value.toUpperCase(),
      });
    }
    if (event.target.name === "link_jira") {
      if (!event.target.validity.valid) {
        //console.log("--", event.target.validity.valid);
        setValidUrl(true);
        setDisableButton(true);
      } else {
        setValidUrl(false);
        setDisableButton(false);
      }
      setCabecera({ ...cabecera, [event.target.name]: event.target.value });
    } else {
      setCabecera({ ...cabecera, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    //console.log(cabecera)
    if (
      cabecera.project_code !== "" &&
      cabecera.client !== "" &&
      cabecera.responsible !== "" &&
      cabecera.project_type !== ""
    ) {
      setDisableButton(false);
      //console.log('entro')
    } else {
      setDisableButton(true);
      //console.log('entroTRUE')
    }
  }, [cabecera]);

  return modal ? (
    <>
      <div className="popup_container">
        <div className="popup_itself">
          <div className="popup_button_container">
            <h1 className="h1Style">Añadir cotización</h1>
            <button className="button_close" onClick={() => SetModal(false)}>
              {<img src={Images.CLOSE} width={20} alt="icon"></img>}{" "}
            </button>
          </div>
          <div className="spaceVer20" />

          <RegistroCotizacion
            cabecera={cabecera}
            handleChangeCabecera={handleChangeCabecera}
            validUrl={validUrl}
          />

          <div className="spaceVer20" />
          <ButtonPrimary
            Nombre={"Guardar"}
            Disabled={disableButton}
            OnClick={onSubmit}
          />
        </div>
      </div>
    </>
  ) : (
    ""
  );
};
