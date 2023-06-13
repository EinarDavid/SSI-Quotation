import React, { useEffect, useState } from "react";
import Images from "../../config/Images";
import {
  getClientAll,
  getProjectTypeAll,
  getResourcesAll,
  getStateRequirement,
} from "../../services/cotizacionService";
import { TextInput } from "../textInput/TextInput";
import { TextNumber } from "../textInput/TextNumber";

export const SectionFilter = ({ Search, search }) => {
  const [searchCodigo, setSearchCodigo] = useState(true);
  const [cliente, setCliente] = useState(true);
  const [responsable, setResponsable] = useState(true);
  const [estado, setEstado] = useState();
  const [tipoProyecto, setTipoProyecto] = useState();
  const [fecha, setFecha] = useState();
  const [totalHoras, setTotalHoras] = useState()

  const [clients, setClients] = useState();
  const [resources, setResources] = useState();
  const [projectType, setProjectType] = useState();
  const [stateReq, setStateReq] = useState();

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

      getStateRequirement().then(({ data }) => {
        setStateReq(data);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  
  return (
    <>
      <div className="SeccionFilter">
        <hr className="lineFilter" />
        <div className="spaceVer5" />
        <div>
          <div className="titleFilter">
            <h3 className="titleStyleH3">Código</h3>
            <button
              className="buttonPrint"
              onClick={() => setSearchCodigo(!searchCodigo)}
            >
              {searchCodigo ? (
                <>
                  <img src={Images.ARROW_BOTTOM} width={20} alt={"ArrowDown"} />
                </>
              ) : (
                <>
                  <img src={Images.ARROW_TOP} width={20} alt={"ArrowUp"} />
                </>
              )}
            </button>
          </div>
          {searchCodigo ? (
            <>
              <TextInput
                Name={"project_code"}
                Placeholder={"Escribe aquí"}
                OnChange={(e) => {
                  Search(e);
                }}
                Value={search?.project_code || ""}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="spaceVer5" />
        <hr className="lineFilter" />
        <div className="spaceVer5" />

        <div>
          <div className="titleFilter">
            <h3 className="titleStyleH3">Cliente</h3>
            <button
              className="buttonPrint"
              onClick={() => setCliente(!cliente)}
            >
              {cliente ? (
                <>
                  <img src={Images.ARROW_BOTTOM} width={20} alt={"ArrowDown"} />
                </>
              ) : (
                <>
                  <img src={Images.ARROW_TOP} width={20} alt={"ArrowUp"} />
                </>
              )}
            </button>
          </div>
          {cliente ? (
            <>
              <select
                name="client"
                required
                className="textInput"
                onChange={(e) => Search(e)}
                value={search?.client || ""}
              >
                <option value="" >
                  {"Todos"}
                </option>
                {clients?.map(({ id_client, client }) => (
                  <option key={id_client} value={client}>
                    {client}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="spaceVer5" />
        <hr className="lineFilter" />
        <div className="spaceVer5" />

        <div>
          <div className="titleFilter">
            <h3 className="titleStyleH3">Responsable</h3>
            <button
              className="buttonPrint"
              onClick={() => setResponsable(!responsable)}
            >
              {responsable ? (
                <>
                  <img src={Images.ARROW_BOTTOM} width={20} alt={"ArrowDown"} />
                </>
              ) : (
                <>
                  <img src={Images.ARROW_TOP} width={20} alt={"ArrowUp"} />
                </>
              )}
            </button>
          </div>
          {responsable ? (
            <>
              <select
                name="responsible"
                required
                className="textInput"
                onChange={(e) => Search(e)}
                value={search?.responsible || ""}
              >
                <option value="" >
                  {"Todos"}
                </option>
                {resources?.map(({ id, resource, email }) => (
                  <option key={id} value={email}>
                    {resource}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="spaceVer5" />
        <hr className="lineFilter" />
        <div className="spaceVer5" />

        <div>
          <div className="titleFilter">
            <h3 className="titleStyleH3">Estado</h3>
            <button className="buttonPrint" onClick={() => setEstado(!estado)}>
              {estado ? (
                <>
                  <img src={Images.ARROW_BOTTOM} width={20} alt={"ArrowDown"} />
                </>
              ) : (
                <>
                  <img src={Images.ARROW_TOP} width={20} alt={"ArrowUp"} />
                </>
              )}
            </button>
          </div>
          {estado ? (
            <>
              <select
                name="status"
                required
                className="textInput"
                onChange={(e) => Search(e)}
                value={search?.status || ""}
              >
                <option value="" >
                  {"Todos"}
                </option>
                {stateReq?.map(({ id_catalog, description, cod_value }) => (
                  <option key={id_catalog} value={cod_value}>
                    {description}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="spaceVer5" />
        <hr className="lineFilter" />
        <div className="spaceVer5" />

        <div>
          <div className="titleFilter">
            <h3 className="titleStyleH3">Tipo de proyecto</h3>
            <button
              className="buttonPrint"
              onClick={() => setTipoProyecto(!tipoProyecto)}
            >
              {tipoProyecto ? (
                <>
                  <img src={Images.ARROW_BOTTOM} width={20} alt={"ArrowDown"} />
                </>
              ) : (
                <>
                  <img src={Images.ARROW_TOP} width={20} alt={"ArrowUp"} />
                </>
              )}
            </button>
          </div>
          {tipoProyecto ? (
            <>
              <select
                name="project_type"
                required
                className="textInput"
                onChange={(e) => Search(e)}
                value={search?.project_type || ""}
              >
                <option value="" >
                  {"Todos"}
                </option>
                {projectType?.map(({ id_catalog, description, cod_value }) => (
                  <option key={id_catalog} value={cod_value}>
                    {description}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="spaceVer5" />
        <hr className="lineFilter" />
        <div className="spaceVer5" />
        <div>
          <div className="titleFilter">
            <h3 className="titleStyleH3">Fecha</h3>
            <button className="buttonPrint" onClick={() => setFecha(!fecha)}>
              {fecha ? (
                <>
                  <img src={Images.ARROW_BOTTOM} width={20} alt={"ArrowDown"} />
                </>
              ) : (
                <>
                  <img src={Images.ARROW_TOP} width={20} alt={"ArrowUp"} />
                </>
              )}
            </button>
          </div>
          {fecha ? (
            <>
              <div className="dateRange">
                <div className="containerTextInputLabelRow">
                <label className='labelInputRow'>Inicio: </label>
                  <input
                    type="date"
                    max={search?.date_end}
                    className="textInput"
                    name={"date_start"}
                    placeholder={"Escribe aquí"}
                    value={search?.date_start || ""}
                    onChange={(e) => {
                      Search(e);
                    }}
                  ></input>
                </div>

                <div className="containerTextInputLabelRow">
                <label className='labelInputRow'>Fin: </label>
                  <input
                    type="date"
                    min={search?.date_start}
                    className="textInput"
                    name={"date_end"}
                    placeholder={"Escribe aquí"}
                    value={search?.date_end || ""}
                    onChange={(e) => {
                      Search(e);
                    }}
                  ></input>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="spaceVer5" />
        <hr className="lineFilter" />
        <div className="spaceVer5" />
        <div>
          <div className="titleFilter">
            <h3 className="titleStyleH3">Total Horas</h3>
            <button
              className="buttonPrint"
              onClick={() => setTotalHoras(!totalHoras)}
            >
              {totalHoras ? (
                <>
                  <img src={Images.ARROW_BOTTOM} width={20} alt={"ArrowDown"} />
                </>
              ) : (
                <>
                  <img src={Images.ARROW_TOP} width={20} alt={"ArrowUp"} />
                </>
              )}
            </button>
          </div>
          {totalHoras ? (
            <>
              <TextNumber
                Name={"total_effort"}
                Placeholder={"Escribe aquí"}
                OnChange={(e) => {
                  Search(e);
                  
                }}

                Value={search?.total_effort || ""}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="spaceVer5" />
        <hr className="lineFilter" />
        <div className="spaceVer5" />
      </div>
    </>
  );
};
