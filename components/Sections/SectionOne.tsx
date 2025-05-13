import { register } from 'node:module'
import React from 'react'
import InputField from '../form-elements/input-field'
import PasswordField from '../form-elements/password-field'
import TextAreaField from '../form-elements/textarea-field'

const SectionOne = ({ register, errors }: { register: any, errors: any }) => {
  return (
    <section className="flex flex-col w-full">
        <h2 className="section-title mb-[1rem] px-2">Tell us about yourself</h2>
        <InputField
        register={register}
        errors={errors}
        label="Name"
        // secondary_label="Enter your name"
        name="name"
        type="text"
        placeholder="John Doe"
        required={true}
        />

        <PasswordField
        register={register}
        errors={errors}
        label="Password"
        // secondary_label="Enter your password"
        name="password"
        placeholder="********"
        required={true}
        />

        <InputField
        register={register}
        errors={errors}
        label="Email"
        // secondary_label="Enter your email"
        name="email"
        type="text"
        placeholder="john@doe.com"
        required={true}
        />

        <TextAreaField
        register={register}
        errors={errors}
        label="More about you"
        // secondary_label="Enter your content"
        name="content"
        placeholder="Describe yourself"
        required={true}
        />
  </section>
  )
}

export default SectionOne
