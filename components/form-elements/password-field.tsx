import React, { useState } from 'react'
import ErrorField from './error-field-input'
import { Eye, EyeOff } from 'lucide-react'

const PasswordField = ({ register, errors, label, name, placeholder, secondary_label, required }: {
    register: any,
    errors: any,
    label: string,
    name: string,
    placeholder: string,
    secondary_label?: string,
    required: boolean
}) => {

    const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
        <div className="form-area flex flex-col">
            <label htmlFor={name} className="input-label">{label}<span className="text-warning">*</span></label>
            <p className={`input-sublabel ${!required ? "" : "mb-2"}`}>{secondary_label}</p>
            {!required && <p className="input-sublabel mb-2">(Optional)</p>}
            
            <div className="relative">
                <input 
                {...register(name, { required: required })}
                type={showPassword ? "text" : "password"} 
                id={name} 
                className="form-input z-[1] input-text"
                placeholder={placeholder}
                style={{
                    borderColor: errors[name] ? "var(--color-warning)" : "",
                    borderRadius: errors[name] ? "0.5rem" : ""
                }}
                />
                <span className="absolute right-[10px] top-[50%] -translate-y-[50%]" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-[15px] h-[15px]" /> : <Eye className="w-[15px] h-[15px]" />}
                </span>
            </div>
        </div>
        {errors[name] && <ErrorField errors={errors} identifier={name} margin="mt-[-20px] mx-4" />}
    </div>
  )
}

export default PasswordField
