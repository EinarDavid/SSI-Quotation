import React from 'react'

export const TextInput = ({ Placeholder, ErrorInput, Value, Name, OnChange }) => {
    return (
        <>
            <div className='containerTextInput'>
                
                <input type='text' className='textInput'
                    name={Name}
                    placeholder={Placeholder}
                    value={Value}
                    onChange={OnChange}
                    
                ></input>
                <label className='labelInputError'>{ErrorInput}</label>
            </div>
        </>
    )
}
