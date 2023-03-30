import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonState } from "../components/button/ButtonState";
import { RegistroCotizacion } from "../components/Forms/RegistroCotizacion";
import { ViewCotizacionDisabled } from "../components/Forms/ViewCotizacionDisabled";
import Images from "../config/Images";
import {
  getDetailQuotationAll,
  getHoursResource,
  getMonthsAll,
  getQuotationOne,
  getResourcesAll,
  getRoleAll,
  getStatusResource,
  getWeekOfYear,
  getYearsAll,
} from "../services/cotizacionService";
import { convertCurrencyToNumber3 } from "../services/ValidInput";

export const CotizaciónBloqued = () => {
  const navigate = useNavigate();
  let { id_quotation } = useParams();

  const [cabecera, setCabecera] = useState({});
  const [detalle, setDetalle] = useState([
    {
      id_resource_allocation: -1,
      id_quotation: Number(id_quotation),
      id_resource: 0,
      role: "",
      year: 0,
      month: 0,
      week: 0,
      effort: 0,
      days: 0.0,
      state: "",
    },
  ]);

  const [resources, setResources] = useState();
  const [role, setRole] = useState();
  const [stateResource, setStateResource] = useState();
  const [years, setYears] = useState();
  const [months, setMonths] = useState();

  const [weeks, setWeeks] = useState([[]]);
  const [validacionHoras, setValidacionHoras] = useState([[]]);

  let semanasIni = [];
  let validacionAuxiliar = [];

  useEffect(() => {
    if (id_quotation) {
      getQuotationOne(id_quotation).then(({ data }) => {
        //console.log('data--', data)
        setCabecera(data[0]);
      });
      getDetailQuotationAll(id_quotation).then(({ data }) => {
        //console.log("data Detalle--", data);

        data?.map((det, index) => {
          getWeekOfYear(det.year, det.month).then(({ data }) => {
            //console.log(index, det.year, det.month);
            //console.log("Data Semanas------", data);

            semanasIni = [...semanasIni];
            //console.log("Semanas",semanasIni)
            semanasIni.push({});
            semanasIni[index] = data;
            setWeeks(semanasIni);
          });

          det.backupEffortState = det.state;
          det.backupEffort = convertCurrencyToNumber3(det.effort);
          det.effort = convertCurrencyToNumber3(det.effort);

          HorasRecursoDetail(det, index); //Probar
        });

        setDetalle(data);
      });
    }
  }, []);

  function HorasRecursoDetail(campos, index) {
    getHoursResource(
      campos.id_resource,
      campos.year,
      campos.month,
      campos.week
    ).then(({ data }) => {
      //console.log("Horas recurso", data);

      var horasRecurso = 0;
      if (data.message) {
        horasRecurso = 0;

        let horasDisponibles = [...validacionHoras];
        horasDisponibles[index] = {
          message: data.message,
        };
        //console.log('------------llego a if message')
        setValidacionHoras(horasDisponibles);
      } else {
        horasRecurso =
          Number(data[0].totalefforthoursresource) -
          campos.backupEffort +
          campos.effort;
        //console.log("backupEffort----", horasRecurso);
        //console.log("horas asignadas: ", Number(data[0]?.hoursassigned));
        let horasDisponibles = [...validacionHoras];
        let horasSemana =
          Number(data[0]?.totalefforthoursresource) +
          Number(data[0]?.totalhoursnotassigned) +
          Number(data[0]?.hoursvacation);

        horasDisponibles[index] = {
          horasDisponibles: Number(data[0]?.totalhoursnotassigned),
          horasSemana: horasSemana,
          horasVacacion: Number(data[0]?.hoursvacation),
          horasAsignadas: Number(data[0]?.hoursassigned),
          horasReservadas: Number(data[0]?.hoursassignedfcast),
        };

        validacionAuxiliar[index] = horasDisponibles[index];
        //console.log("---------", index, validacionAuxiliar);

        setValidacionHoras(validacionAuxiliar);
      }
    });
  }

  useEffect(() => {
    try {
      getResourcesAll().then(({ data }) => {
        data = data.map((ta) => ({ ...ta, id: Number(ta.id) }));
        //console.log('------', data);
        setResources(data);
      });
      getRoleAll().then(({ data }) => {
        //console.log('------', data);
        setRole(data);
      });
      getStatusResource().then(({ data }) => {
        //console.log("------", data);
        setStateResource(data);
      });
      getYearsAll().then(({ data }) => {
        //console.log('------', data);
        setYears(data);
      });
      getMonthsAll(detalle[0]?.year).then(({ data }) => {
        //console.log('------', data);
        setMonths(data);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  var sum = 0.0;
  detalle.map(({ effort }) => {
    sum = sum + Number(effort);
    return sum;
  });

  let sumaEffort = sum.toFixed(0);

  return (
    <>
      <div className="App">
        <div className="containerView">
          <div className="headerContent">
            <div className="containerHeaderButtons">
              <div className="navTitleContainer">
                <button
                  className="button_close"
                  onClick={() => navigate("/cotizacion")}
                >
                  {<img src={Images.PAGELEFT} width={20} alt="icon"></img>}
                </button>
                <div className="spaceRow10" />
                <h1 className="h1Style">Ver cotización</h1>
              </div>
              <div className="containerButtonRight">
                <ButtonState State={cabecera?.status} />
              </div>
            </div>
            <div className="spaceVer15" />
            <div className="containerFormulario">
              <ViewCotizacionDisabled
                cabecera={cabecera}
                //handleChangeCabecera={handleChangeCabecera}
              />
            </div>
            <div className="spaceVer15" />
            <h1 className="h2Style">Recursos</h1>
          </div>
          <div className="spaceVer5" />
          <div className="containerTitleRecurso">
            <div className="rowContainerTitle">
              <h1 className="h3StyleBold">Nombre del recurso</h1>
              <h1 className="h3StyleBold">Rol</h1>
              <div className="dateContainer">
                <h1 className="h3StyleBold inputDate">Año</h1>
                <h1 className="h3StyleBold inputDate">Mes</h1>
                <h1 className="h3StyleBold inputDate">Semana</h1>
                <h1 className="h3StyleBold inputHours">Effort</h1>
              </div>
              <h1 className="h3StyleBold">Estado</h1>
            </div>
          </div>
          <div className="spaceVer15" />

          <div className="detailContainer">
            {detalle.map((det, i) => (
              <div
                key={det.id_resource_allocation}
                className="columnaContainer"
              >
                <div className="rowContainer">
                  <select
                    disabled
                    name="id_resource"
                    className="inputCell inputRole"
                    value={det?.id_resource || ""}
                    //onChange={(e) => handleChangeDetalle(e, i)}
                    required
                  >
                    <option value="" disabled hidden>
                      Recurso
                    </option>
                    {resources?.map(({ id, resource }) => (
                      <option key={id} value={id}>
                        {resource}
                      </option>
                    ))}
                  </select>

                  <select
                    disabled
                    name="role"
                    className="inputCell inputRole"
                    value={det?.role || ""}
                    //onChange={(e) => handleChangeDetalle(e, i)}
                    required
                  >
                    <option value="" disabled hidden>
                      Rol
                    </option>
                    {role?.map(({ role, id_role }) => (
                      <option key={id_role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>

                  <div className="dateContainer">
                    <select
                      disabled
                      name="year"
                      className="inputCell inputDate"
                      value={det?.year || ""}
                      //onChange={(e) => handleChangeDetalle(e, i)}
                      required
                    >
                      <option value="" disabled hidden>
                        Año
                      </option>
                      {years?.map(({ code_year, year }) => (
                        <option key={code_year} value={code_year}>
                          {year}
                        </option>
                      ))}
                    </select>

                    <select
                      disabled
                      name="month"
                      className="inputCell inputDate"
                      value={det?.month || ""}
                      //onChange={(e) => handleChangeDetalle(e, i)}
                      required
                    >
                      <option value="" disabled hidden>
                        Mes
                      </option>
                      {months?.map(({ monthnbrofyear, monthname }) => (
                        <option key={monthnbrofyear} value={monthnbrofyear}>
                          {monthname}
                        </option>
                      ))}
                    </select>
                    <select
                      disabled
                      name="week"
                      className="inputCell inputDate"
                      value={det?.week}
                      //onChange={(e) => handleChangeDetalle(e, i)}
                      required
                    >
                      <option value="" disabled hidden>
                        Semana
                      </option>
                      {weeks[i]?.length > 0 ? (
                        weeks[i]?.map(({ code_week, week }) => (
                          <option key={code_week} value={code_week}>
                            {week}
                          </option>
                        ))
                      ) : (
                        <></>
                      )}
                    </select>

                    <input
                      disabled
                      name="effort"
                      className="inputCell inputHours"
                      type="number"
                      placeholder="Effort"
                      value={det?.effort}
                    ></input>
                  </div>

                  <select
                    disabled
                    name="state"
                    className="inputCell inputRole"
                    value={det?.state}
                    //onChange={(e) => handleChangeDetalle(e, i)}
                    required
                  >
                    <option value="" disabled hidden>
                      Estado
                    </option>
                    {stateResource?.map(({ cod_value, id_catalog, value }) => (
                      <option key={id_catalog} value={cod_value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <button disabled className="buttonRemoveRowDisabled">
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="spaceVer15" />
          <hr className="lineFilter" />
          <div className="footerButtons">
            <div className="sectionOne"></div>
            <div className="sectionTwo">
              <p></p>
              <p className="Effort">Total hrs: {sumaEffort} </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
