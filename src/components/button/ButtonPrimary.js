import React from 'react'

export const ButtonPrimary = ({ Disabled, Nombre, OnClick, Style }) => {
    return (
        <>
            <div className='containerButtonModal'>
                {
                    (Disabled) ? (
                        <button className='ButtonPrimaryDisabled' type="submit" disabled={Disabled} style={Style} >{Nombre}</button>
                    ) : (<button className='ButtonPrimary' type="submit" disabled={Disabled} onClick={OnClick} style={Style}>{Nombre}</button>)
                }
            </div>
        </>
    )
}
//envio;  responsible: fernando.arias@salamancasolutions.com,

    // semanas: [
    //     1: {
    //         semana: 11,
    //         horasOcupadas: 8,
    //         horasTotales: 32
    //     }
        

    //     2: {
    //         semana: 18,
    //         horasOcupadas: 8,
    //         horasTotales: 32
    //     }
    // ]

