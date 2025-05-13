"use client";

/////////////////////////////////////////////////////////////////////////////
/**
 * SigninForm Component
 * 
 * A multi-section form with client-side validation using React Hook Form and Zod.
 * 
 * Features:
 * - Step-by-step form with section validation
 * - Toggle between paginated and single-page modes
 * - Live validation as user types
 * - Custom form elements with error handling
 * - Form submission with loading state
 * - Visual progress tracking for each section
 * - Field completion indicators
 * 
 * Implementation Steps:
 * 1. Form schema definition with Zod
 * 2. Form state setup with React Hook Form
 * 3. Section progress tracking
 * 4. Form validation and submission handling
 * 5. Section navigation and pagination
 * 6. UI rendering with conditional sections
 */
/////////////////////////////////////////////////////////////////////////////

// form imports
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


// components
import SectionOne from "../Sections/SectionOne";
import SectionTwo from "../Sections/SectionTwo";
import SectionThree from "../Sections/SectionThree";
import SectionFour from "../Sections/SectionFour";
import { ChevronLeft, ChevronRight } from "lucide-react";

// npm install react-hook-form zod @hookform/resolvers

/////////////////////////////////////////////////////////////////////////////
// ZOD SCHEMA DEFINITION
/////////////////////////////////////////////////////////////////////////////

/**
 * Zod schema for form validation
 * Defines validation rules for each form field
 */
const schemaRegister = z.object({
  // Name field: Must be between 3-20 characters
  name: z.string()
    .min(3, { message: "Name must be between 3 and 20 characters" })
    .max(20, { message: "Name must be between 3 and 20 characters" }),
  
  // Password field: Must be between 8-20 characters
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
  
  // Email field: Must be a valid email format
  email: z.string().email({ message: "Invalid email address" }),
  
  // Content field: Must be between 6-100 characters
  content: z.string()
    .min(6, { message: "Content must be between 6 and 100 characters" })
    .max(100, { message: "Content must be between 6 and 100 characters" }),
  
  // Radio option field: Must be one of the predefined options
  radio_option: z.string().refine((data) => data === "option_1" || data === "option_2", { message: "Invalid option" }),
  
  // Multiple select field: Must have at least one selection
  multiple_select: z.array(z.string()).refine((data) => data.length > 0, { message: "At least one day must be selected" }),
  
  // Appointment date field: Must be a valid date
  appointmentDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "Not a valid date",
  }).nullable().refine(data => data !== null, {
    message: "Please select a date and time"
  }),
  
  // Dropdown selection field: Must have at least one option selected
  dropdown_selection: z.array(z.string()).min(1, { message: "Please select at least one option" }),
});

// Type definition derived from Zod schema
type SchemaValues = {
  name: string;
  password: string;
  email: string;
  content: string;
  radio_option: string;  // Changed from "option_1" | "option_2" to string
  multiple_select: string[];
  appointmentDate: Date | null;  // Added null to match defaultValues
  dropdown_selection: string[];
}

/////////////////////////////////////////////////////////////////////////////
// MAIN COMPONENT
/////////////////////////////////////////////////////////////////////////////

export function SigninForm() {
  /////////////////////////////////////////////////////////////////////////////
  // FORM SETUP AND STATE
  /////////////////////////////////////////////////////////////////////////////
  
  /**
   * React Hook Form setup with Zod resolver
   * Provides form handling utilities and validation state
   */
  const {
    register,        // Function to register form inputs with validation
    handleSubmit,    // Function to handle form submission with validation
    watch,           // Function to watch form values in real-time
    setValue,        // Function to programmatically set form values
    control,         // Object to control form state for complex inputs
    formState: { errors }, // Object containing validation errors
    trigger,         // Function to manually trigger validation
  } = useForm<SchemaValues>({
    resolver: zodResolver(schemaRegister), // Connect Zod schema to form validation
    defaultValues: {
      name: "",
      password: "",
      email: "",
      content: "",
      radio_option: "",
      multiple_select: [],
      appointmentDate: null as unknown as Date,
      dropdown_selection: [],
    },
  })

  // UI state management
  const [loading, setLoading] = useState(false);           // Tracks form submission loading state
  
  // Pagination state
  const [currentSection, setCurrentSection] = useState(0); // Tracks current active section
  const [usePagination, setUsePagination] = useState(true); // Toggle between paginated and full form
  
  // Form sections configuration - defines the sections of the form
  const sections = [
    { title: "Input Fields", id: "input-fields" },
    { title: "Radio Options", id: "radio-options" },
    { title: "Checklist", id: "checklist" },
    { title: "Dropdown Select", id: "dropdown-select" },
  ];

  // Section progress tracking - stores completion percentage for each section
  const [sectionProgress, setSectionProgress] = useState<Record<number, number>>({
    0: 0, // Section 1 initial progress (0%)
    1: 0, // Section 2 initial progress (0%)
    2: 0, // Section 3 initial progress (0%)
    3: 0, // Section 4 initial progress (0%)
  });
  
  // Define which form fields belong to each section for validation tracking
  const sectionFields = {
    0: ["name", "password", "email", "content"],  // Section 1 fields
    1: ["radio_option"],                          // Section 2 fields
    2: ["multiple_select", "appointmentDate"],    // Section 3 fields
    3: ["dropdown_selection"]                     // Section 4 fields
  };
  
  // Watch all form values to calculate progress in real-time
  const formValues = watch();
  
  /////////////////////////////////////////////////////////////////////////////
  // SECTION PROGRESS TRACKING
  /////////////////////////////////////////////////////////////////////////////
  
  // Update section progress whenever form values or errors change
  useEffect(() => {
    // Calculate progress for each section
    const newProgress = { ...sectionProgress };
    
    // For each section, calculate how many fields are valid
    Object.entries(sectionFields).forEach(([sectionIndex, fields]) => {
      const sectionIdx = Number(sectionIndex);
      let validFields = 0;
      
      fields.forEach(field => {
        // Check if field has a value (handling both array and non-array values)
        const hasValue = field in formValues && 
          (Array.isArray(formValues[field as keyof SchemaValues]) 
            ? (formValues[field as keyof SchemaValues] as any).length > 0 
            : Boolean(formValues[field as keyof SchemaValues]));
        
        // Check if field has validation errors
        const hasError = field in errors;
        
        // Count field as valid if it has a value and no errors
        if (hasValue && !hasError) {
          validFields++;
        }
      });
      
      // Calculate percentage of valid fields in this section
      newProgress[sectionIdx] = fields.length > 0 
        ? Math.round((validFields / fields.length) * 100) 
        : 0;
    });
    
    // Only update state if progress has actually changed (prevents infinite loops)
    if (JSON.stringify(newProgress) !== JSON.stringify(sectionProgress)) {
      setSectionProgress(newProgress);
    }
  }, [formValues, errors, sectionFields]);

  /////////////////////////////////////////////////////////////////////////////
  // FORM SUBMISSION HANDLER
  /////////////////////////////////////////////////////////////////////////////
  
  /**
   * Form submission handler
   * Sends validated form data to the API endpoint
   * 
   * @param data - The validated form data
   */
  const onSubmit = async (data: SchemaValues) => {
    // Log form data for debugging
    console.log(data);

    // Set loading state to show submission in progress
    setLoading(true);
    try {
      // Send form data to API endpoint
      const response = await fetch('/api/zod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      
      // Parse API response
      const responseData = await response.json();

      // Show success indicator if submission was successful
      if (response.ok) {
        console.log('Form submitted successfully:', responseData);
      } else {
        console.error('API error:', responseData);
      }
    } catch (error) {
      // Log any errors during submission
      console.error('Error submitting form:', error);
    } finally {
      // Reset loading state regardless of outcome
      setLoading(false);
    }
  };

  // Debug validation errors in development
  useEffect(() => {
    console.log("Form errors:", errors);
  }, [errors]);

  /////////////////////////////////////////////////////////////////////////////
  // SECTION VALIDATION AND NAVIGATION
  /////////////////////////////////////////////////////////////////////////////
  
  /**
   * Validates the current section before proceeding
   * Ensures all required fields in the section are valid
   * 
   * @param sectionIndex - The index of the section to validate
   * @returns boolean - Whether the section is valid
   */
  const validateSection = async (sectionIndex: number) => {
    let fieldsToValidate: string[] = [];
    
    // Define which fields belong to each section
    switch(sectionIndex) {
      case 0:
        fieldsToValidate = ["name", "password", "email", "content"];
        break;
      case 1:
        fieldsToValidate = ["radio_option"];
        break;
      case 2:
        fieldsToValidate = ["multiple_select", "appointmentDate"];
        break;
      case 3:
        fieldsToValidate = ["dropdown_selection"];
        break;
      default:
        fieldsToValidate = [];
    }
    
    // Trigger validation only for the fields in current section
    const result = await trigger(
      fieldsToValidate as Array<keyof SchemaValues>
    );
    return result; // Returns true if validation passes
  };

  /**
   * Navigates to the next section if current section is valid
   * Prevents advancing if validation fails
   */
  const goToNextSection = async () => {
    const isValid = await validateSection(currentSection);
    if (isValid && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  /**
   * Navigates to the previous section
   * No validation required to go back
   */
  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  /**
   * Toggles between paginated and single-page form modes
   * Resets section view when switching to single-page mode
   */
  const togglePagination = () => {
    setUsePagination(!usePagination);
    // If turning pagination off, reset to show all sections
    if (usePagination) {
      setCurrentSection(0);
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  // COMPONENT RENDERING
  /////////////////////////////////////////////////////////////////////////////
  
  return (
    <>
      <div className="w-full max-w-xl lg:max-w-2xl mx-auto flex flex-col items-start justify-center">
        
        {/* Pagination toggle button - allows switching between step-by-step and full form */}
        <div className="w-full flex justify-end mb-2">
          <button
            type="button"
            onClick={togglePagination}
            className="text-xs px-3 py-1.5 rounded-md border border-primary hover:bg-primary/80 bg-primary text-white transition-colors"
          >
            {usePagination ? "Disable pagination" : "Enable pagination"}
          </button>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit((data: any) => onSubmit(data as SchemaValues))(e);
        }} className="flex flex-col items-center justify-center w-full">
          {/* Enhanced Progress indicator - only show when pagination is enabled */}
          {usePagination && (
            <div className="w-full">
              {/* Section tabs - highlight current section and show completion status */}
              <div className="flex justify-between w-full">
                {sections.map((section, index) => {
                  // Calculate z-index value (3 for index 0, 2 for index 1, 1 for index 2)
                  const zIndex = sections.length - index;
                  
                  return (
                    <div 
                      key={section.id}
                      className={`pagination-tab text-sm font-medium py-2 rounded-t-lg
                        flex-1 text-center text-[9px] relative
                        ${index === 0 ? "" : "-ml-2"}
                        ${index === currentSection 
                          ? "bg-primary text-background " 
                          : "bg-gray-100 text-foreground/80"
                        }
                        ${sectionProgress[index] === 100 ? "bg-secondary text-white" : ""}
                        `}
                      style={{ zIndex: zIndex }}
                    >
                      {section.title}
                      {/* Checkmark for completed sections */}
                      {/* {sectionProgress[index] === 100 && (
                        <span className="ml-2 text-green-500">✓</span>
                      )} */}

                      {/* Individual progress bar for each section */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            sectionProgress[index] === 100 
                              ? "bg-secondary" 
                              : index === currentSection 
                                ? "bg-primary" 
                                : "bg-gray-300"
                          }`}
                          style={{ width: `${sectionProgress[index]}%` }}
                        ></div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="form-background w-full mb-4 overflow-hidden rounded-lg rounded-t-none border border-gray-200
          flex flex-col">

            <div className="p-4 w-full">
              {/* Section 1: Input Fields - show if it's the current section or pagination is off */}
              {(!usePagination || currentSection === 0) && (
                  <SectionOne register={register} errors={errors} />
              )}

              {/* Section 2: Radio Options - show if it's the current section or pagination is off */}
              {(!usePagination || currentSection === 1) && (
                  <SectionTwo register={register} errors={errors} />  
              )}         

              {/* Section 3: Checklist - show if it's the current section or pagination is off */}
              {(!usePagination || currentSection === 2) && (
                  <SectionThree register={register} errors={errors} control={control} />  
              )}

              {/* Section 4: Dropdown Select - show if it's the current section or pagination is off */}
              {(!usePagination || currentSection === 3) && (
                  <SectionFour register={register} errors={errors} setValue={setValue} />  
              )}
            </div>
            
            {/* Total progress indicator - only show when pagination is enabled */}
            {usePagination && (
              <div className="w-full mt-auto">

              {/* Section completion status - numerical indicator of progress */}
              <div className="mt-1 text-xs text-gray-500 px-2 mb-1">
                Section {currentSection + 1} completion: {sectionProgress[currentSection]}%
              </div>

              {/* Overall section progress - shows how far through the form the user is */}
              <div className="w-full h-1 bg-gray-200 rounded-none overflow-hidden flex">
                {sections.map((section, index) => (
                  <div 
                    key={`progress-${section.id}`}
                    className="h-full relative"
                    style={{ width: `${100 / sections.length}%` }}
                  >
                    <div 
                      className={`h-full transition-all duration-300 ${
                        index < currentSection 
                          ? "bg-primary" 
                          : index === currentSection 
                            ? "bg-primary/50" 
                            : "bg-transparent"
                      }`}
                      style={{ 
                        width: index < currentSection 
                          ? "100%" 
                          : index === currentSection 
                            ? `${sectionProgress[currentSection]}%` 
                            : "0%" 
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              
              {/* Current section field completion progress - shows valid fields in current section */}
              <div className="w-full h-1 bg-transparent -mt-1 rounded-r overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ 
                    width: `calc(${((sectionProgress[currentSection] / 100) * 
                      ((currentSection + 1) / sections.length) * 100)}% + 5px)` 
                  }}
                ></div>
              </div>
              

            </div>
            )}

          </div>




          {/* Navigation buttons - only show when pagination is enabled */}
          {usePagination && (
            <div className="flex justify-center w-full mt-0 gap-2">
              {/* Previous button - disabled on first section */}
              <button 
                type="button" 
                onClick={goToPreviousSection}
                className={`px-2 py-2 rounded-full border bg-foreground text-background border-foreground hover:bg-foreground/80 transition-colors ${
                  currentSection === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
                disabled={currentSection === 0}
              >
                <ChevronLeft className="w-[15px] h-[15px]" />
              </button>
              
              {/* Next/Submit button - changes to Submit on last section */}
              {currentSection < sections.length - 1 ? (
                <button 
                  type="button" 
                  onClick={goToNextSection}
                  className="px-6 py-2 rounded-full bg-primary text-background hover:bg-primary/80 transition-colors"
                >
                    <ChevronRight className="w-[15px] h-[15px]" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={() => handleSubmit((data: any) => onSubmit(data as SchemaValues))()}
                  className="px-4 py-2 rounded-md bg-primary text-background hover:bg-primary/90"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>
          )}

          {/* Submit button - only show when pagination is disabled */}
          {!usePagination && (
            <div className="w-full mt-6">
              <button 
                type="submit" 
                className="cursor-pointer w-full px-4 py-2 rounded-md bg-primary text-background hover:bg-primary/90"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            )}
        </form>
      </div>
    </>
  );
}