import React from 'react'
import Images from '../../config/Images'

export const ButtonFilter = ({ Active, Nombre, OnClick }) => {
    return (
        <>
            {
                (Active) ? (
                    <>
                        <button className='ButtonActiveFilter' type="submit" onClick={OnClick}>
                            <img src={Images.FILTER_WHITE} width={26} alt='icon' />
                            {Nombre}
                        </button>
                    </>
                ) : (
                    <>
                        <button className='ButtonUnActiveFilter' type="submit" onClick={OnClick}>
                            <img src={Images.FILTER_BLUE} width={26}  alt='icon' />    
                            {Nombre}
                        </button>
                    </>
                )
            }
        </>
    )
}
