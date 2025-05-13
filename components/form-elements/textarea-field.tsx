import React from 'react'
import ErrorField from './error-field-input'

const TextAreaField = ({ register, errors, label, name, placeholder, required, secondary_label }: {
    register: any,
    errors: any,
    label: string,
    name: string,
    placeholder: string,
    required: boolean,
    secondary_label?: string
}) => {
  return (
    <div>
            <div className="form-area">
            <label htmlFor={name} className="input-label">{label}<span className="text-warning">*</span></label>
            <p className={`input-sublabel ${!required ? "" : "mb-2"}`}>{secondary_label}</p>
            {!required && <p className="input-sublabel mb-2">(Optional)</p>}

            <textarea 
            {...register(name, { required: required })}
            id={name} 
            rows={5} 
            className="form-input z-[1]" 
            placeholder={placeholder}
            style={{
                borderColor: errors[name] ? "var(--color-warning)" : "",
                borderRadius: errors[name] ? "0.5rem" : ""
            }}
            />
            {errors[name] && <ErrorField errors={errors} identifier={name} margin="mt-[-5px]" />}

          </div>
    </div>
  )
}

export default TextAreaField
