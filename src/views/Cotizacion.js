import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonFilter } from "../components/button/ButtonFilter";
import { ButtonIcon } from "../components/button/ButtonIcon";
import { ButtonState } from "../components/button/ButtonState";
import { ModalRegCotizacion } from "../components/modal/ModalRegCotizacion";

import { Navigator } from "../components/navigator/Navigator";
import { SectionFilter } from "../components/section/SectionFilter";
import { PaginationTable } from "../components/table/PaginationTable";
import { RowsSelect } from "../components/textInput/RowsSelect";

import Images from "../config/Images";
import {
  getQuotationAll,
  getQuotationCant,
  postFilters,
} from "../services/cotizacionService";
import { ConvertDate } from "../services/Fecha";
import { valideKeyEffort } from "../services/ValidInput";

export const Cotizacion = () => {
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [quotation, setQuotation] = useState([]);
  const [quotationOriginal, setQuotationOriginal] = useState();
  const [cantidadPagina, setCantidadPagina] = useState(20);
  const [search, setSearch] = useState({
    ordenarPor: "Fecha Descendente",
    project_code: "",
    client: "",
    responsible: "",
    status: "",
    project_type: "",
    date_start: "",
    date_end: "",
    total_effort: "",
  });

  const handleChangeSearch = (event) => {
    setSearch({ ...search, [event.target.name]: event.target.value });

    if (event.target.name == "total_effort") {
      //console.log("aqui");
      const value = event.target.value;
      const onlyNumbers = /^[0-9\b]+$/; // Expresión regular para permitir solo números y la tecla "backspace" (código 8)

      if (value === "" || onlyNumbers.test(value)) {
        //setInputValue(value);
        setSearch({ ...search, [event.target.name]: value });
      }
    } else {
      setSearch({ ...search, [event.target.name]: event.target.value });
    }
  };

  const handleDeleteFiltro = () => {
    setSearch({
      ordenarPor: "Fecha Descendente",
      project_code: "",
      client: "",
      responsible: "",
      status: "",
      project_type: "",
      date_start: "",
      date_end: "",
      total_effort: "",
    });
  };

  const FilterOrder = [
    {
      option: "Fecha Ascendente",
      id_option: 2,
    },
    {
      option: "Fecha Descendente",
      id_option: 3,
    },
  ];

  const RowsForPage = [
    {
      option: 20,
      id_option: 1,
    },
    {
      option: 30,
      id_option: 2,
    },
    {
      option: 50,
      id_option: 3,
    },
  ];

  const DescargarReporte = () =>{
    const XLSX = require('xlsx')

        // array of objects to save in Excel 
        let binary_univers = quotationOriginal;
        let listaDescargable = [];
        //console.log(quotation)
        binary_univers.forEach((element, index) => {
            listaDescargable.push({
                Nro: index + 1,status: element.status, project_code: element.project_code, id_order: element.id_order,
                client: element.client, responsible: element.responsible, project_type: element.project_type,
                date: element.date, total_effort: element.total_effort, link_jira: element.link_jira
            })
        });

        let binaryWS = XLSX.utils.json_to_sheet(listaDescargable);

        // Create a new Workbook
        var wb = XLSX.utils.book_new()

        // Name your sheet
        XLSX.utils.book_append_sheet(wb, binaryWS, 'Reporte')

        // export your excel
        XLSX.writeFile(wb, 'Reporte.xlsx');
  }

  const cargarDatos = () => {
    try {
      postFilters(search).then(({ data }) => {
        //console.log("Res Filter", data);
        data = data.map((da, i) => ({
          ...da,
          i,
        }));
        setQuotationOriginal(data);
        setQuotation(data);
      })
      .catch((e) => {
        console.error("---",e.message);
      })
    } catch (error) {
      console.log(error)
    }
    
  };



  useEffect(() => {
    //console.log("---searchssss", search);
    //console.log(quotation )
    cargarDatos();
  }, [search]);

  return (
    <>
      <div className="App">
        <Navigator />
        {/* <div className='spaceRow30' /> */}
        <div className="containerPrin">
          <div className="headerContent">
            <h1 className="h1Style">Cotizaciones</h1>
            <div className="spaceVer10" />
            <ButtonIcon
              Image={Images.ADD}
              Nombre={"Añadir cotización"}
              OnClick={() => setModalShow(true)}
            />
            <div className="spaceVer15" />
            <div className="containerFiltro">
              <ButtonFilter
                Nombre={"Filtros"}
                OnClick={() => {
                  setActiveButton(!activeButton);
                }}
                Active={activeButton}
              />

              <select
                name="ordenarPor"
                required
                className="textInput"
                onChange={(e) => handleChangeSearch(e)}
                value={search?.ordenarPor || ""}
              >
                <option value="" disabled hidden>
                  {"Ordenar Por"}
                </option>
                {FilterOrder?.map(({ id_option, option }) => (
                  <option key={id_option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {search.project_code !== "" ||
              search.client !== "" ||
              search.responsible !== "" ||
              search.status !== "" ||
              search.project_type !== "" ||
              search.date_start !== "" ||
              search.date_end !== "" ||
              search.total_effort !== "" ? (
                <button
                  className="ButtonDeleteFiltro"
                  onClick={() => {
                    handleDeleteFiltro();
                  }}
                >
                  Borrar filtros
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className="spaceVer15" />
          </div>
          <div className="tablePadreContainer">
            {activeButton ? (
              <>
                <div className="containerFiltros">
                  <SectionFilter Search={handleChangeSearch} search={search} />
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="cardBodyEvaluation">
              <div className="divTable">
                <table className="tableContainer">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="titleTable">Nro</th>
                      <th className="titleTable">Estado</th>
                      <th></th>
                      <th className="titleTable">Código</th>
                      <th className="titleTable">Change Req Cod</th>
                      <th className="titleTable">Id_order</th>
                      <th className="titleTable">Cliente</th>
                      <th className="titleTable">Responsable</th>
                      <th className="titleTable">Tipo de Proyecto</th>
                      <th className="titleTable">Fecha</th>
                      <th className="titleTable">Total Horas</th>
                    </tr>
                  </thead>
                  {quotation?.map((quo, i) => (
                    <tbody key={quo.id_quotation}>
                      <tr>
                        <td>
                          {quo.status === "NEW" ? (
                            <button
                              className="buttonPrint"
                              onClick={() =>
                                navigate("/view/cotizacion/" + quo.id_quotation)
                              }
                            >
                              <img src={Images.VIEW} width={20} alt={"View"} />
                            </button>
                          ) : quo.status === "REGISTERED" ? (
                            <>
                              <button
                                className="buttonPrint"
                                onClick={() =>
                                  navigate("/view/blocked/" + quo.id_quotation)
                                }
                              >
                                <img
                                  src={Images.VIEW}
                                  width={20}
                                  alt={"View"}
                                />
                              </button>
                            </>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td className="containerTable">{quo.i + 1}</td>
                        <td className="containerTable">
                          {quo.status ? (
                            <ButtonState State={quo?.status} InProgress={quo?.inprogress} />
                          ) : (
                            <></>
                          )}
                        </td>
                        <td>
                          {quo.link_jira ? (
                            <a target={"_blank"} href={quo.link_jira}>
                              <img src={Images.JIRA} width={25} alt={"View"} />
                            </a>
                          ) : (
                            <></>
                          )}
                        </td>

                        <td className="containerTable">{quo.project_code}</td>
                        <td className="containerTable">{quo.project_chgreq_code}</td>
                        <td className="containerTable">{quo.id_order}</td>
                        <td className="containerTable">{quo.client}</td>
                        <td className="containerTable">{quo.responsible}</td>
                        <td className="containerTable">{quo.project_type}</td>
                        <td className="containerTable">
                          {ConvertDate(quo.date)}
                        </td>
                        <td className="containerTable">{quo.total_effort}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="footerTable">
                <div>
                  <ButtonIcon
                    Nombre={"Descargar Reporte"}
                    OnClick={() => {
                      DescargarReporte();
                    }}
                    Image={Images.DOWNLOAD}
                  />
                </div>
                <div className="footerPagination">
                  <RowsSelect
                    Name={"Page"}
                    LabelInput={"Filas por página"}
                    SelectOption={RowsForPage}
                    OnChange={(e) => {
                      setCantidadPagina(Number(e.target.value));
                    }}
                    Value={cantidadPagina || ""}
                  />
                  <PaginationTable
                    setLaboratorios={setQuotation}
                    laboratoriosOriginal={quotationOriginal}
                    cantidadPagina={cantidadPagina}
                    getLaboratorioCant={getQuotationCant}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalRegCotizacion
        modal={modalShow}
        SetModal={setModalShow}
        callback={() => cargarDatos()}
      ></ModalRegCotizacion>
    </>
  );
};
