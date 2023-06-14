import React from 'react'

export const TextInputLabel = ({ LabelInput, Placeholder, ErrorInput, Value, Name, OnChange, Required, Disabled }) => {
    return (
        <>
            <div className='containerTextInput'>
                <label className='labelInput'>{LabelInput}</label>
                
                <input type='text' className='textInput '
                    disabled={Disabled}
                    name={Name}
                    required={Required}
                    placeholder={Placeholder}
                    defaultValue={Value}
                    onChange={OnChange}


                ></input>
                <label className='labelInputError'>{ErrorInput}</label>
            </div>
        </>
    )
}
