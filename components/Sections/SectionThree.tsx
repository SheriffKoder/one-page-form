import React from 'react'
import Checklist from '../form-elements/checklist'
import { checklist_options } from '@/data/config'
import ChecklistButtons from '../form-elements/checklist-buttons'
import DatePicker from '../form-elements/date-picker-open'
import DateTimePicker from '../form-elements/date-time-picker'
const SectionThree = ({ register, errors, control }: { register: any, errors: any, control: any }) => {



  return (
    <section className="flex flex-col gap-[0.5rem] w-full">
        <h2 className="section-title mb-[1rem] px-2">Checklist</h2>

        <Checklist
        register={register}
        errors={errors}
        label="What days and times are you available to work?"
        secondary_label="Select the days and times you are available to work"
        name="multiple_select"
        required={true}
        checklist_options={checklist_options}
        />

        <ChecklistButtons
        register={register}
        errors={errors}
        control={control}
        label="What days and times are you available to work?"
        secondary_label="Select the days and times you are available to work"
        name="multiple_select"
        required={true}
        checklist_options={checklist_options}
        />

        <DatePicker
        control={control}
        label="What days and times are you available to work?"
        secondary_label="Select the days and times you are available to work"
        name="appointmentDate"
        required={false}
        errors={errors}
        />

        <DateTimePicker
        control={control}
        label="What days and times are you available to work?"
        secondary_label="Select the days and times you are available to work"
        name="appointmentDate"
        required={false}
        errors={errors}
        />
    </section>
  )
}

export default SectionThree
