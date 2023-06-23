import React, { useEffect, useState } from "react";
import {
  getClientAll,
  getProjectTypeAll,
  getResourcesAll,
} from "../../services/cotizacionService.js";

import { TextInputLabel } from "../textInput/TextInputLabel";

export const RegistroCotizacion = ({
  cabecera,
  handleChangeCabecera,
  validUrl,
  changeReq,
}) => {
  const [clients, setClients] = useState();
  const [resources, setResources] = useState();
  const [projectType, setProjectType] = useState();

  //console.log('cabecera', cabecera?.client)
  //console.log('cliente', clients)
  //console.log('tipo de proyecto', projectType)

  useEffect(() => {
    try {
      getClientAll().then(({ data }) => {
        //console.log('------', data);
        setClients(data);
      });

      getResourcesAll().then(({ data }) => {
        //console.log('------', data);
        setResources(data);
      });

      getProjectTypeAll().then(({ data }) => {
        //console.log('------', data);
        setProjectType(data);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <>
      <div className="containerForm">
        <div className="rowInputs">
          <TextInputLabel
            Name="project_code"
            Required={true}
            LabelInput={"Código Jira *"}
            Placeholder={"Escribe el código Jira de cotización"}
            OnChange={(e) => handleChangeCabecera(e)}
            Value={cabecera?.project_code}
          />
          {changeReq ? (
            <TextInputLabel
              Name="project_chgreq_code"
              Required={true}
              LabelInput={"Código Jira Change Request *"}
              Placeholder={"Escribe el código Jira Change Request"}
              OnChange={(e) => handleChangeCabecera(e)}
              Value={cabecera?.project_chgreq_code}
            />
          ) : (
            <></>
          )}
          <TextInputLabel
            Name="id_order"
            Required={true}
            LabelInput={"Número de orden"}
            Placeholder={"Escribe el número de orden"}
            OnChange={(e) => handleChangeCabecera(e)}
            Value={cabecera?.id_order}
          />

          <div className="containerTextInput">
            <label className="labelInput">Cliente *</label>

            <select
              name="client"
              required
              className="textInput"
              onChange={(e) => handleChangeCabecera(e)}
              value={cabecera?.client || ""}
            >
              <option value="" disabled hidden>
                {" "}
                {"Selecciona"}
              </option>
              {clients?.map(({ id_client, client }) => (
                <option key={id_client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rowInputs">
          <div className="containerTextInput">
            <label className="labelInput">Link del Jira *</label>

            <input
              type="url"
              required
              className="textInput"
              name="link_jira"
              placeholder="Inserta el link del Jira"
              pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              defaultValue={cabecera?.link_jira}
              onChange={(e) => handleChangeCabecera(e)}
            ></input>
            {validUrl ? (
              <>
                <label className="labelInputMessageError">
                  El formato de la URL es incorrecto
                </label>{" "}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="containerTextInput">
            <label className="labelInput">Responsable *</label>

            <select
              name="responsible"
              required
              className="textInput"
              onChange={(e) => handleChangeCabecera(e)}
              value={cabecera?.responsible || ""}
            >
              <option value="" disabled hidden>
                {" "}
                {"Selecciona"}
              </option>
              {resources?.map(({ id, resource, email }) => (
                <option key={id} value={email}>
                  {resource}
                </option>
              ))}
            </select>
          </div>

          <div className="containerTextInput">
            <label className="labelInput">Tipo de Proyecto *</label>

            <select
              name="project_type"
              required
              className="textInput"
              onChange={(e) => handleChangeCabecera(e)}
              value={cabecera?.project_type || ""}
            >
              <option value="" disabled hidden>
                {" "}
                {"Selecciona"}
              </option>
              {projectType?.map(({ id_catalog, description, cod_value }) => (
                <option key={id_catalog} value={cod_value}>
                  {description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
