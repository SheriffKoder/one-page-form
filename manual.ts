
// Adding an input
/*
in the form.tsx add the following
- schemaRegister zod schema
- Add it's type to the type SchemaValues
- Add the default value to the useForm defaultValues object

// to use the input components they require props like in the demo page 
// passed from the parent form
- register
- errors
- name // zod schema name
// developer entered for the UI: 
- label, secondary_label,
- placeholder, 
- required

// unique props to components
Radios: requires an object to be passed as a radio_options prop, example in the config.js
Checklists: requires an object to be passed as a checklist_options prop, example in the config.js
Dates: require the control prop passed from the form component
Text field: require a type prop, text, number etc.
Dropdown: 
- require multiselect, showSearch, AllowCustomOption as booleans 
- setValue from the form component
- dropdown_options an object to be passed as a radio_options prop, example in the config.js

** component call initialization: text input, password field, text-area
** components require a data object: radios, checklists, dropdown
** components not require data sets: Dates
** components not used: error components

*/



// Adding a section with multiple input components
/*
in the form.tsx add the following
- define the section title and id in the "sections" object 
- also add it as a step in the "sectionProgress" state, with value of 0 (starting progress)
- in the "sectionFields" add the "zod name" for its inputs to be validating before moving to next page
- in the validateSection add the "zod name" for its inputs to be validated before moving to next page
- in jsx add the section component like this, with the props needed from this parent file 
  {(!usePagination || currentSection === 2) && (
    <SectionThree register={register} errors={errors} control={control} />  
  )}

- to enable/disable pagination un-comment the pagination toggle jsx components

*/



// changing style; mostly in globals.css
/*
- colors: 
can be found in the @theme object in the globals.css
- fonts family
local file: layout.tsx and globals .css
url import: globals.css

- font styling size etc.
Font styling section in globals.css

- Form styling
form-input: input fields
form-area: all inputs containers
form-backgroud: the main form's background

there is also @styles/date-picker-styles.css to style the open calendar date picker

*/
