import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonPrimary } from "../components/button/ButtonPrimary";
import { ButtonState } from "../components/button/ButtonState";

import Images from "../config/Images";
import {
  JiraASSESS,
  JiraEXEC,
  getDetailQuotationAll,
  getHoursResource,
  getMonthsAll,
  getQuotationOne,
  getResourcesAll,
  getRoleAll,
  getStatusResource,
  getWeekOfYear,
  getYearsAll,
  postAddResource,
  sendEmail,
} from "../services/cotizacionService";
import { convertCurrencyToNumber3 } from "../services/ValidInput";
import { ViewCotizacionDisabled } from "../components/Forms/ViewCotizacionDisabled";
//import { EnviarEmail } from "../services/Email";

let campoID = 0;
let StateDetail = "FCAST";

export const ViewCotización = ({ callback }) => {
  //let StateDetail = "FCAST";
  const navigate = useNavigate();
  let { id_quotation } = useParams();
  //console.log('---id', id_quotation);

  const [disableButton, setDisableButton] = useState(true);
  const [disbaledCheck, setDisbaledCheck] = useState(false);
  const [validUrl, setValidUrl] = useState(false);
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
      state: StateDetail,
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
  //console.log('------', cabecera);

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

  //console.log(cabecera);

  const handleChangeCabecera = (event) => {
    if (event.target.name === "statusCheck") {
      //console.log("Cabecera", event.target.name, event.target.checked);
      setCabecera({ ...cabecera, [event.target.name]: event.target.checked });
    }
  };

  const handleChangeDetalle = (event, index) => {
    let campos = [...detalle];
    campos[index][event.target.name] = event.target.value;

    if (
      event.target.name === "id_resource" ||
      event.target.name === "year" ||
      event.target.name === "month" ||
      event.target.name === "week" ||
      event.target.name === "effort"
    ) {
      campos[index][event.target.name] = Number(event.target.value);
    }

    if (event.target.name === "effort") {
      let dias = event.target.value / 8;
      campos[index].days = Number(dias.toFixed(2));

      //console.log("Dias", campos[index].days);
    }

    if (campos[index].year !== 0) {
      getMonthsAll(campos[index].year).then(({ data }) => {
        //console.log('------', data);
        setMonths(data);
      });
    }

    if (campos[index].year !== 0 && campos[index].month !== 0) {
      //console.log('-----')
      //console.log('campos', campos[index].year, campos[index].month)
      getWeekOfYear(campos[index].year, campos[index].month).then(
        ({ data }) => {
          //console.log('------', data);
          let semanas = [...weeks];
          semanas[index] = data;
          setWeeks(semanas);
        }
      );
    }
    if (event.target.name === "month") {
      //console.log('Mes cambio')
      campos[index].week = 0;
    }

    //console.log("Week----", campos[index].week);

    if (
      campos[index].id_resource !== 0 &&
      campos[index].year !== 0 &&
      campos[index].month !== 0 &&
      campos[index].week !== 0
    ) {
      HorasRecurso(campos, index);
    }

    if (event.target.name === "effort") {
      //console.log('---', event.target.value)

      if (event.target.value === "") {
        //console.log("OnChange---", event.target.backupEffort);

        campos[index].effort = Number(0);
      } else
        campos[index].effort = convertCurrencyToNumber3(event.target.value);
    }

    setDetalle(campos);
  };

  function HorasRecurso(campos, index) {
    getHoursResource(
      campos[index].id_resource,
      campos[index].year,
      campos[index].month,
      campos[index].week
    ).then(({ data }) => {
      console.log("Horas recurso", data);

      var horasRecurso = 0;
      if (data.message) {
        horasRecurso = 0;

        let horasDisponibles = [...validacionHoras];
        //validacion de horas a la semana
        horasDisponibles[index] = {
          message: data.message,
        };
        setValidacionHoras(horasDisponibles);
      } else {
        horasRecurso =
          Number(data[0].totalefforthoursresource) -
          detalle[index].backupEffort +
          detalle[index].effort;
        //console.log( "horas recurso: ", horasRecurso, Number(data[0].totalefforthoursresource), detalle[index].backupEffort, detalle[index].effort);

        let horasDisponibles = [...validacionHoras];
        let horasSemana =
          Number(data[0]?.totalefforthoursresource) +
          Number(data[0]?.totalhoursnotassigned) +
          Number(data[0]?.hoursvacation);

        //console.log("Estado", campos[index].state);

        const cambioState =
          campos[index].state !== detalle[index].backupEffortState;
        //console.log("State....", cambioState);
        //console.log(horasSemana, horasRecurso, Number(data[0]?.hoursvacation))
        if (campos[index].state === "ASGND") {
          horasDisponibles[index] = {
            horasDisponibles:
              horasSemana - horasRecurso - Number(data[0]?.hoursvacation),
            horasSemana: horasSemana,
            horasVacacion: Number(data[0]?.hoursvacation),

            horasAsignadas: cambioState
              ? Number(data[0]?.hoursassigned) + detalle[index].effort
              : Number(data[0]?.hoursassigned) -
                detalle[index].backupEffort +
                detalle[index].effort,

            horasReservadas: cambioState
              ? detalle[index].backupEffortState === "FCAST"
                ? Number(data[0]?.hoursassignedfcast) -
                  detalle[index].backupEffort
                : Number(data[0]?.hoursassignedfcast)
              : Number(data[0]?.hoursassignedfcast),
          };
        }
        if (campos[index].state === "FCAST") {
          horasDisponibles[index] = {
            horasDisponibles:
              horasSemana - horasRecurso - Number(data[0]?.hoursvacation),
            horasSemana: horasSemana,
            horasVacacion: Number(data[0]?.hoursvacation),

            horasAsignadas: cambioState
              ? detalle[index].backupEffortState === "ASGND"
                ? Number(data[0]?.hoursassigned) - detalle[index].backupEffort
                : Number(data[0]?.hoursassigned)
              : Number(data[0]?.hoursassigned),

            horasReservadas: cambioState
              ? Number(data[0]?.hoursassignedfcast) + detalle[index].effort
              : Number(data[0]?.hoursassignedfcast) -
                detalle[index].backupEffort +
                detalle[index].effort,
          };
        }

        if (campos[index].state === "VAC") {
          horasDisponibles[index] = {
            horasDisponibles:
              horasSemana - horasRecurso - Number(data[0]?.hoursvacation),
            horasSemana: horasSemana,
            horasVacacion: cambioState
              ? Number(data[0]?.hoursvacation) -
                detalle[index].backupEffort +
                detalle[index].effort
              : Number(data[0]?.hoursvacation) + detalle[index].effort,

            horasAsignadas: cambioState
              ? Number(data[0]?.hoursassigned)
              : Number(data[0]?.hoursassigned) - detalle[index].backupEffort,

            horasReservadas: cambioState
              ? Number(data[0]?.hoursassignedfcast)
              : Number(data[0]?.hoursassignedfcast) -
                detalle[index].backupEffort,
          };
        }

        //console.log("horas----", horasDisponibles[index]);

        setValidacionHoras(horasDisponibles);
      }
    });
  }

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

  const validarLimite = (e, limite, index) => {
    //console.log("Limite", limite);
    if (limite < 0) limite = 0;
    if (e.target.value >= limite) {
      let campos = [...detalle];
      campos[index][e.target.name] = limite;

      setDetalle(campos);
    }
  };

  const addInputs = (e) => {
    //e.preventDefault();
    campoID = campoID + 1;

    setDetalle([
      ...detalle,
      {
        id_resource_allocation: campoID,
        id_quotation: cabecera?.id_quotation,
        id_resource: 0,
        role: "",
        year: 0,
        month: 0,
        week: 0,
        backupEffort: 0,
        effort: 0,
        days: 0.0,
        state: StateDetail,
      },
    ]);
    setWeeks([...weeks, []]);
  };

  const handleRemoveDetail = (position) => {
    //console.log(detalle, position)
    setDetalle([...detalle.filter((_, index) => index !== position)]);
    setWeeks([...weeks.filter((_, index) => index !== position)]);
  };

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

  const onSubmit = async () => {
    try {
      setDisableButton(true);
      //console.log("Dataaa", cabecera);
      let data = cabecera;
      data.total_effort = sumaEffort;
      data.Campos = detalle;

      if (data.statusCheck) {
        data.status = "REG";
        console.log("entro", data.status);
      }
      //console.log("Datos Enviados: ", data);

      postAddResource(data).then(async ({ data }) => {
        //console.log("Res BD", data);
        var Jira;
        

        if (data.data.project_type == "ASSESS") {
          const dataAss = await JiraASSESS(data.data);
          console.log(dataAss.data.message);
          Jira = dataAss.data.message;

        } else if (data.data.project_type == "EXEC") {
          const dataEx = await JiraEXEC(data.data);
          console.log(dataEx.data.message);
          Jira = dataEx.data.message;
        }

        //Funcion enviar email
        let dataEmail = cabecera;
        dataEmail.total_effort = sumaEffort;
        dataEmail.Campos = detalle;

        const emailSend = await sendEmail(dataEmail);
        console.log(emailSend.data.message);
        Jira = Jira + "\n" + emailSend.data.message;

        if (callback) callback();
        //limpiar cajas, cerrar modal y avisar que fue añadido con exito

        Jira = Jira + "\n" + data.message;
        alert(Jira);
        setValidacionHoras([[]]);
        setDisableButton(false);
        navigate("/cotizacion");
      });
    } catch (error) {
      console.log("----", error);
    }
  };

  // Suma de la Horas
  var sum = 0.0;
  detalle.map(({ effort }) => {
    sum = sum + Number(effort);
    return sum;
  });

  let sumaEffort = sum.toFixed(0);

  //valicacion de campos
  useEffect(() => {
    var validarStateCheck = true;
    var validar = true;

    detalle?.map((det) => {
      if (!(det?.state === "ASGND")) {
        validarStateCheck = false;
      }
    });
    detalle?.map((det, index) => {
      //console.log('Detalle', index, det)
      if (
        !(
          det?.id_resource !== 0 &&
          det?.role !== "" &&
          det?.year !== 0 &&
          det?.month !== 0 &&
          det?.week !== 0 &&
          det?.effort !== 0
        )
      ) {
        validar = false;
        //console.log("Entro--detalle");
      }
    });

    if (detalle.length === 0) {
      validar = false;
      validarStateCheck = false;
    }

    setDisbaledCheck(!validarStateCheck);
    setDisableButton(!validar);
  }, [detalle]);

  const Email = () => {};

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
              {/* <RegistroCotizacion
                validUrl={validUrl}
                cabecera={cabecera}
                handleChangeCabecera={handleChangeCabecera}
              /> */}
              <ViewCotizacionDisabled cabecera={cabecera} />
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
                    name="id_resource"
                    className="inputCell inputRole"
                    value={det?.id_resource || ""}
                    onChange={(e) => handleChangeDetalle(e, i)}
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
                    name="role"
                    className="inputCell inputRole"
                    value={det?.role || ""}
                    onChange={(e) => handleChangeDetalle(e, i)}
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
                      name="year"
                      className="inputCell inputDate"
                      value={det?.year || ""}
                      onChange={(e) => handleChangeDetalle(e, i)}
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
                      name="month"
                      className="inputCell inputDate"
                      value={det?.month || ""}
                      onChange={(e) => handleChangeDetalle(e, i)}
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
                      name="week"
                      className="inputCell inputDate"
                      value={det?.week || ""}
                      onChange={(e) => handleChangeDetalle(e, i)}
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
                      name="effort"
                      className="inputCell inputHours"
                      type="number"
                      placeholder="Effort"
                      value={det?.effort}
                      //max={validacionHoras[i]?.horasDisponibles || 0}
                      onChange={(e) => {
                        handleChangeDetalle(e, i);
                      }}
                      //validarLimite(  e, validacionHoras[i]?.horasDisponibles - det.backupEffort,   i);
                      //onKeyDown={(e) => valideKeyEffort(e)}
                    ></input>
                  </div>

                  <select
                    name="state"
                    className="inputCell inputRole"
                    value={det?.state || ""}
                    onChange={(e) => handleChangeDetalle(e, i)}
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

                  <button
                    className="buttonRemoveRow"
                    onClick={() => {
                      handleRemoveDetail(i);
                    }}
                  >
                    -
                  </button>
                </div>

                {validacionHoras[i]?.message ? (
                  <div className="rowContainerMessage">
                    <p className="labelInputMessage">
                      {validacionHoras[i]?.message}
                    </p>
                  </div>
                ) : validacionHoras[i] === undefined ? (
                  <></>
                ) : (
                  <div className="rowContainerMessage">
                    <p className="labelInputMessage">
                      Total horas en la semana
                      <strong>: {validacionHoras[i]?.horasSemana}</strong>{" "}
                    </p>
                    <p className="labelInputMessageSuccess">
                      Horas de vacación
                      <strong>
                        : {validacionHoras[i]?.horasVacacion}
                      </strong>{" "}
                    </p>
                    {validacionHoras[i]?.horasDisponibles < 0 ? (
                      <p className="labelInputMessageError">
                        Horas disponibles
                        <strong>
                          : {validacionHoras[i]?.horasDisponibles}
                        </strong>{" "}
                      </p>
                    ) : (
                      <p className="labelInputMessage">
                        Horas disponibles
                        <strong>
                          : {validacionHoras[i]?.horasDisponibles}
                        </strong>{" "}
                      </p>
                    )}

                    <p className="labelInputMessage">
                      Horas asignadas
                      <strong>
                        : {validacionHoras[i]?.horasAsignadas}
                      </strong>{" "}
                    </p>
                    <p className="labelInputMessage">
                      Horas reservadas
                      <strong>
                        : {validacionHoras[i]?.horasReservadas}
                      </strong>{" "}
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="AddInputContainer">
              <button className="buttonAddForm" onClick={addInputs}>
                Clic aquí para añadir un nuevo campo
              </button>
            </div>
          </div>
          <div className="spaceVer15" />
          <hr className="lineFilter" />
          <div className="footerButtons">
            <div className="sectionOne">
              <ButtonPrimary
                Style={{ width: "100%" }}
                Disabled={disableButton}
                Nombre={"Guardar"}
                OnClick={onSubmit}
              />
            </div>
            <div className="sectionTwo">
              <label className="labelInputCheck">
                <input
                  disabled={disbaledCheck}
                  className="checkbookInput"
                  type="checkbox"
                  name="statusCheck"
                  //onClick={(e) => handleChangeCabecera(e)}
                  onChange={(e) => handleChangeCabecera(e)}
                  //value={cabecera.statusCheck}
                />
                Guardar como Registrado
              </label>

              <p className="Effort">Total hrs: {sumaEffort} </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/*
const cambioState =
          campos[index].state !== detalle[index].backupEffortState;
        console.log("State....", cambioState);

        if (campos[index].state === "ASGND") {
          horasDisponibles[index] = {
            horasDisponibles:
              horasSemana - horasRecurso - Number(data[0]?.hoursvacation),
            horasSemana: horasSemana,
            horasVacacion: cambioState
              ? detalle[index].backupEffortState === "VAC"
                ? Number(data[0]?.hoursvacation) - detalle[index].backupEffort
                : Number(data[0]?.hoursvacation)
              : Number(data[0]?.hoursvacation),

            horasAsignadas: cambioState
              ? Number(data[0]?.hoursassigned) + detalle[index].effort
              : Number(data[0]?.hoursassigned) -
                detalle[index].backupEffort +
                detalle[index].effort,

            horasReservadas: cambioState
              ? detalle[index].backupEffortState === "FCAST"
                ? Number(data[0]?.hoursassignedfcast) -
                  detalle[index].backupEffort
                : Number(data[0]?.hoursassignedfcast)
              : Number(data[0]?.hoursassignedfcast),
          };
        }
        if (campos[index].state === "FCAST") {
          horasDisponibles[index] = {
            horasDisponibles:
              horasSemana - horasRecurso - Number(data[0]?.hoursvacation),
            horasSemana: horasSemana,
            horasVacacion: cambioState
            ? Number(data[0]?.hoursvacation)
            : Number(data[0]?.hoursvacation) - detalle[index].backupEffort,

            horasAsignadas: cambioState
              ? Number(data[0]?.hoursassigned)
              : Number(data[0]?.hoursassigned) - detalle[index].backupEffort,

            horasReservadas: cambioState
              ? Number(data[0]?.hoursassignedfcast) -
                detalle[index].backupEffort +
                detalle[index].effort
              : Number(data[0]?.hoursassignedfcast) + detalle[index].effort,
          };
        }

        if (campos[index].state === "VAC") {
          horasDisponibles[index] = {
            horasDisponibles:
              horasSemana - horasRecurso - Number(data[0]?.hoursvacation),
            horasSemana: horasSemana,
            horasVacacion: cambioState
            ? Number(data[0]?.hoursvacation)-
              detalle[index].backupEffort +
              detalle[index].effort
            : Number(data[0]?.hoursvacation) + detalle[index].effort,

            horasAsignadas: cambioState
              ? Number(data[0]?.hoursassigned)
              : Number(data[0]?.hoursassigned) - detalle[index].backupEffort,

            horasReservadas: cambioState
              ? Number(data[0]?.hoursassignedfcast)
              : Number(data[0]?.hoursassignedfcast) - detalle[index].backupEffort,
          };
        }
*/
