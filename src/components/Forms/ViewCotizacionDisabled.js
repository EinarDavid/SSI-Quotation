import React, { useEffect, useState } from "react";
import {
  getClientAll,
  getProjectTypeAll,
  getResourcesAll,
} from "../../services/cotizacionService";

import { TextInputLabel } from "../textInput/TextInputLabel";

export const ViewCotizacionDisabled = ({ cabecera, handleChangeCabecera }) => {
  const [clients, setClients] = useState();
  const [resources, setResources] = useState();
  const [projectType, setProjectType] = useState();

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
            Disabled={true}
            Name="project_code"
            Required={true}
            LabelInput={"Código Jira"}
            Placeholder={"Escribe el código Jira de cotización"}
            OnChange={(e) => handleChangeCabecera(e)}
            Value={cabecera?.project_code}
          />
          <TextInputLabel
            Disabled={true}
            Name="id_order"
            Required={true}
            LabelInput={"Número de orden"}
            Placeholder={"Escribe el número de orden"}
            OnChange={(e) => handleChangeCabecera(e)}
            Value={cabecera?.id_order}
          />

          <div className="containerTextInput">
            <label className="labelInput">Cliente</label>

            <select
              disabled
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
            <label className="labelInput">Responsable</label>

            <select
              disabled
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
            <label className="labelInput">Tipo de Proyecto</label>

            <select
              disabled
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
