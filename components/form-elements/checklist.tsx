import React from 'react'
import ErrorFieldArea from './error-field-area'

const Checklist = ({ register, errors, label, secondary_label, name, required, checklist_options }: { register: any, errors: any, label: string, secondary_label: string, name: string, required: boolean, checklist_options: any }) => {
  

  
  return (
    <div className="form-area">
      <label htmlFor={name} className="input-label">{label}<span className="text-warning">*</span></label>
      <p className={`input-sublabel ${!required ? "" : "mb-2"}`}>{secondary_label}</p>
      {!required && <p className="input-sublabel mb-2">(Optional)</p>}

      <div className="flex flex-col gap-2">
        {checklist_options.map((option: any) => (
          <div className="flex flex-row gap-2">
            <input
            {...register(name, { required: required })}
            type="checkbox" id={option.label} value={option.label} />
            <label htmlFor={option.label} className="input-text capitalize">{option.label}</label>
        </div>
        ))}
      </div>

      {errors[name] && (
        <ErrorFieldArea
        errors={errors}
        identifier={name}
        />
      )}


  </div>
  )
}

export default Checklist
