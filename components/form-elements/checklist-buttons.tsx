import React from 'react'
import { Check } from 'lucide-react'
import { useWatch } from 'react-hook-form'
import ErrorFieldArea from './error-field-area'

const ChecklistButtons = ({ 
  register, 
  errors, 
  control,
  label, 
  secondary_label, 
  name, 
  required, 
  checklist_options 
}: { 
  register: any, 
  errors: any, 
  control: any,
  label: string, 
  secondary_label: string, 
  name: string, 
  required: boolean, 
  checklist_options: any 
}) => {
  
  // Watch the field to know which options are selected
  const selectedValues = useWatch({
    control,
    name: name,
    defaultValue: []
  });

  return (
    <div className="form-area">
      <label htmlFor={name} className="input-label">{label}{required && <span className="text-warning">*</span>}</label>
      <p className={`input-sublabel ${!required ? "" : "mb-2"}`}>{secondary_label}</p>
      {!required && <p className="input-sublabel mb-2">(Optional)</p>}
      <div className="flex flex-col gap-2">
        {checklist_options.map((option: any, index: number) => {
          const isSelected = selectedValues?.includes(option.label);
          
          return (
            <div key={index} className="relative">
              <input
                {...register(name, { required: required })}
                type="checkbox" 
                id={`${name}_${index}`} 
                value={option.label}
                className="sr-only" // Hide the actual checkbox
              />
              <label
                htmlFor={`${name}_${index}`}
                className={`input-text flex items-center justify-between px-4 py-2 w-full rounded-md border cursor-pointer transition-colors
                  ${isSelected 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-foreground border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <span className="capitalize">{option.label}</span>
                {isSelected && <Check size={18} />}
              </label>
            </div>
          );
        })}
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

export default ChecklistButtons
