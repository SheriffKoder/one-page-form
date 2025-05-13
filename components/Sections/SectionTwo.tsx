import { radio_option_1 } from '@/data/config'
import React from 'react'
import RadioOptionsBoolean from '../form-elements/radio-options-boolean'
import { register } from 'node:module'
import RadioOptionsButtons from '../form-elements/radio-options-buttons'
import RadioOptions from '../form-elements/radio-options'

const SectionTwo = ({ register, errors }: { register: any, errors: any }) => {
  return (
    <section className="flex flex-col gap-[0.5rem] w-full">
        <h2 className="section-title mb-[1rem] px-2">Radio Options</h2>

        {/* Radio select */}
        <RadioOptions
        register={register}
        secondary_label="Select an option"
        radio_options={radio_option_1}
        required={true}
        errors={errors}
        />

        {/* Radio buttons */}
        <RadioOptionsButtons
        register={register}
        secondary_label="Select an option"
        radio_options={radio_option_1}
        required={true}
        errors={errors}
        />

        {/* Boolean select */}
        <RadioOptionsBoolean
        register={register}
        secondary_label="Select an option"
        radio_options={radio_option_1}
        required={true}
        errors={errors}
        />
  </section>
  )
}

export default SectionTwo
