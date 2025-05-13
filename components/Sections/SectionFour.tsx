import React from 'react'
import Checklist from '../form-elements/checklist'
import { dropdown_options } from '@/data/config'
import DropdownSelect from '../form-elements/dropdown-select'

const SectionFour = ({ register, errors, setValue }: { register: any, errors: any, setValue?: any }) => {



  return (
    <section className="flex flex-col gap-[0.5rem] w-full">
        <h2 className="section-title mb-[1rem] px-2">Dropdown</h2>

        <DropdownSelect
        name="dropdown_selection"
        label="Select Options"
        secondary_label="Choose from the list"
        options={dropdown_options}
        multiselect={false}
        required={true}
        placeholder="Select options..."
        register={register}
        errors={errors}
        setValue={setValue}
        showSearch={true}
        allowCustomOption={true}
        />
       
    </section>
  )
}

export default SectionFour
