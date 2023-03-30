import React from 'react'

export const ButtonIcon = ({ OnClick, Image, Nombre }) => {
    return (
        <>
            <button className='ButtonIcon' onClick={OnClick}>
                <img src={Image} width={20} alt={'icon'} className='StyleIcon' />
                <div className='spaceRow5' />
                {Nombre}
            </button>
        </>
    )
}
