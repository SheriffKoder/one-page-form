import React from 'react'
import ErrorFieldArea from './error-field-area'


const RadioOptionsBoolean = ({ register, radio_options, required, errors, secondary_label }: { register: any, radio_options: any, required: boolean, errors: any, secondary_label?: string }) => {
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
            <div className="flex flex-row">
                {radio_options.options.map((option: any, index: number) => (
                    <div key={option.id} className="relative w-full">
                        <input 
                            type="radio" 
                            id={option.id} 
                            value={option.value} 
                            {...register(radio_options.identifier)}
                            className="peer absolute opacity-0 w-full h-full cursor-pointer"
                        />
                        <label 
                            htmlFor={option.id} 
                            className={`input-text capitalize block px-4 py-2 border border-gray-300 text-center
                                       cursor-pointer transition-all duration-200
                                       peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary
                                       hover:bg-gray-100 peer-checked:hover:bg-primary
                                    ${index === 0 ? "rounded-l-md border-r-0" : "rounded-r-md"}`}
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
                </div>
            </fieldset>
        </div>
        
        <ErrorFieldArea errors={errors} identifier={radio_options.identifier} />

    </div>
  )
}

export default RadioOptionsBoolean
