import React from 'react'

export const TextInput = ({ Placeholder, ErrorInput, Value, Name, OnChange }) => {
    return (
        <>
            <div className='containerTextInput'>
                
                <input type='text' className='textInput'
                    name={Name}
                    placeholder={Placeholder}
                    defaultValue={Value}
                    onChange={OnChange}
                    
                ></input>
                <label className='labelInputError'>{ErrorInput}</label>
            </div>
        </>
    )
}
