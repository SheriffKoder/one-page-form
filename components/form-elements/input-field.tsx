import React from 'react'
import ErrorField from './error-field-input'

const InputField = ({ register, errors, label, name, type, placeholder, secondary_label, required }: {
    register: any,
    errors: any,
    label: string,
    name: string,
    type: string,
    placeholder: string,
    secondary_label?: string,
    required: boolean
}) => {

   

  return (
    <div>
        <div className="form-area flex flex-col">
            <label htmlFor={name} className="input-label">{label}<span className="text-warning">*</span></label>
            <p className={`input-sublabel ${!required ? "" : "mb-2"}`}>{secondary_label}</p>
            {!required && <p className="input-sublabel mb-2">(Optional)</p>}

            <input 
            {...register(name, { required: required })}
            type={type} 
            id={name} 
            className="form-input z-[1] input-text"
            placeholder={placeholder}
            style={{
                borderColor: errors[name] ? "var(--color-warning)" : "",
                borderRadius: errors[name] ? "0.5rem" : ""
            }}
            />
        </div>
            {errors[name] && <ErrorField errors={errors} identifier={name} margin="mt-[-20px] mx-4" />}
    </div>
  )
}

export default InputField
