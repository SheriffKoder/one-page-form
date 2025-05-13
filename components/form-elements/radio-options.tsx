import React from 'react'
import ErrorFieldArea from './error-field-area'
const RadioOptions = ({ register, radio_options, required, errors, secondary_label }: { register: any, radio_options: any, required: boolean, errors: any, secondary_label?: string }) => {
  return (
    <div className="form-area w-full flex flex-col gap-[5px]">

        <div className="w-full flex flex-col gap-[5px]"
         style={{
             borderColor: errors[radio_options.identifier] ? "var(--color-warning)" : "transparent"
         }}>

        <fieldset className="flex flex-col gap-[1rem]">
       
            <legend className="input-label w-full capitalize">{radio_options.identifier.split("_").join(" ")}
                {required && <span className="text-warning">*</span>}
            </legend>

            <p className={`input-sublabel ${!required ? "" : "mb-2"}`}>{secondary_label}</p>
            {!required && <p className="input-sublabel">(Optional)</p>}

            <div className="flex flex-row gap-[1rem]">
                {radio_options.options.map((option: any) => (
                    <div key={option.id} className="flex flex-row gap-[10px]">
                        <input type="radio" id={option.id} value={option.value} {...register("radio_option")}/>
                        <label htmlFor={option.id} className="capitalize input-text">{option.label}</label>
                    </div>
                ))}
                </div>
            </fieldset>
        </div>
        
        <ErrorFieldArea errors={errors} identifier={radio_options.identifier} />

    </div>
  )
}

export default RadioOptions
