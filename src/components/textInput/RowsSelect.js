import React from 'react'

export const RowsSelect = ({ LabelInput, Placeholder, SelectOption, OnChange, Value, Name }) => {
    return (
        <>
            <div className='containerTextInputRow'>
                <label className='labelInputSelectRow'>{LabelInput}</label>

                <select
                    className='textInputRow'
                    name={Name}
                    onChange= {OnChange}
                    value={Value || ''}

                >
                    {/* <option value='' disabled selected hidden> {Placeholder}</option> */}
                    {
                        SelectOption.map(({ option, id_option }) => (
                            <option key={id_option}
                                value={option}
                            >{option}</option>
                        ))
                    }
                </select>



            </div>
        </>
    )
}
