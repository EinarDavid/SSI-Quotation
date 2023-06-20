import React, { useEffect, useState } from "react";
import Images from "../../config/Images";

export const PaginationTable = ({
  cantidadPagina,
  laboratoriosOriginal,
  setLaboratorios,
  getLaboratorioCant,
}) => {
  const [cant, setCant] = useState([]);
  const [pag, setPag] = useState(1);

  const click = (pagina) => {
    //console.log("click:", pagina)
    setPag(pagina);
  };

  useEffect(() => {
    setPag(1);
    //console.log("paaag", cantidadPagina);
  }, []);

  useEffect(() => {
    //console.log("---------", pag, cantidadPagina, laboratoriosOriginal?.length )
    if ( cantidadPagina <= laboratoriosOriginal?.length) {
        var CantidadData = laboratoriosOriginal?.slice(
            (pag - 1) * cantidadPagina,
            (pag - 1) * cantidadPagina + cantidadPagina
          )
      setLaboratorios( CantidadData);
      //console.log("Cant Pag------------", CantidadData);

    } else {
      setLaboratorios(laboratoriosOriginal?.slice((pag - 1) * cantidadPagina));
    }
  }, [laboratoriosOriginal, pag, cantidadPagina]);

  useEffect(() => {
    if (pag)
      getLaboratorioCant().then(({ data }) => {
        //console.log('Cant:', data.cant, 'cantidadPagina:', cantidadPagina)
        //console.log('Cantidad', laboratoriosOriginal?.length )
        setCant(Math.ceil(laboratoriosOriginal?.length / cantidadPagina));
      });
    else {
      setPag(1);
    }
  }, [pag, cantidadPagina, laboratoriosOriginal]);

  function normal() {
    return (
      <div>
        {pag <= 1 ? (
          <div className="containerPag">
            <button className="buttonPrevNext " onClick={() => click(1)}>
              <img src={Images.FIRSTPAGE} width={20} alt="Prev" />
            </button>
            <button className="buttonPrevNext " onClick={() => click(1)}>
              <img src={Images.PAGELEFT} width={20} alt="Prev"></img> Prev
            </button>

            <div className="buttonSelect">{1}</div>
            <button className="buttonUnselected " onClick={() => click(2)}>
              {2}
            </button>
            <button className="buttonUnselected " onClick={() => click(3)}>
              {3}
            </button>
            <button
              className="buttonPrevNext"
              onClick={() => click(parseInt(pag) + 1)}
            >
              Next <img src={Images.PAGERIGHT} width={20} alt="Next"></img>
            </button>
            <button className="buttonPrevNext" onClick={() => click(cant)}>
              <img src={Images.LASTPAGE} width={20} alt="Next"></img>
            </button>
          </div>
        ) : pag < cant ? (
          <div className="containerPag">
            <button className="buttonPrevNext" onClick={() => click(1)}>
              <img src={Images.FIRSTPAGE} width={20} alt="Prev" />
            </button>
            <button
              className="buttonPrevNext"
              onClick={() => click(parseInt(pag) - 1)}
            >
              <img src={Images.PAGELEFT} width={20} alt="Prev"></img> Prev
            </button>
            <button
              className="buttonUnselected"
              onClick={() => click(parseInt(pag) - 1)}
            >
              {pag - 1}
            </button>
            <div className="buttonSelect">{pag}</div>
            <button
              className="buttonUnselected"
              onClick={() => click(parseInt(pag) + 1)}
            >
              {1 * pag + 1}
            </button>
            <button
              className="buttonPrevNext"
              onClick={() => click(parseInt(pag) + 1)}
            >
              Next <img src={Images.PAGERIGHT} width={20} alt="Next"></img>
            </button>
            <button className="buttonPrevNext" onClick={() => click(cant)}>
              <img src={Images.LASTPAGE} width={20} alt="Next" />
            </button>
          </div>
        ) : (
          <div className="containerPag">
            <button className="buttonPrevNext" onClick={() => click(1)}>
              <img src={Images.FIRSTPAGE} width={20} alt="Prev" />
            </button>
            <button
              className="buttonPrevNext"
              onClick={() => click(parseInt(pag) - 1)}
            >
              <img src={Images.PAGELEFT} width={20} alt="Prev"></img> Prev
            </button>
            <button
              className="buttonUnselected"
              onClick={() => click(parseInt(cant) - 2)}
            >
              {cant - 2}
            </button>
            <button
              className="buttonUnselected"
              onClick={() => click(parseInt(cant) - 1)}
            >
              {1 * cant - 1}
            </button>
            <div className="buttonSelect">{cant}</div>
            <button className="buttonPrevNext" onClick={() => click(cant)}>
              Next <img src={Images.PAGERIGHT} width={20} alt="Next"></img>
            </button>
            <button className="buttonPrevNext" onClick={() => click(cant)}>
              <img src={Images.LASTPAGE} width={20} alt="Next"></img>
            </button>
          </div>
        )}
      </div>
    );
  }
  function uno() {
    return (
      <div className="containerPag">
        <button className="buttonPrevNext " onClick={() => click(1)}></button>
        <div className="buttonSelect">{1}</div>
        <button className="buttonPrevNext" onClick={() => click(cant)}></button>
      </div>
    );
  }
  function dos() {
    if (pag <= 1)
      return (
        <div className="containerPag">
          <div className="buttonSelect">{1}</div>
          <button className="buttonUnselected " onClick={() => click(2)}>
            {2}
          </button>
        </div>
      );
    else
      return (
        <div className="containerPag">
          <button className="buttonUnselected " onClick={() => click(1)}>
            {1}
          </button>
          <div className="buttonSelect">{2}</div>
        </div>
      );
  }
  return (
    <>
      <div className="containerPagination">
        {cant === 1 ? uno() : cant === 2 ? dos() : cant > 0 ? normal() : <></>}
      </div>
    </>
  );
};
