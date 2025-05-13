import React from 'react'

const ErrorField = ({ errors, identifier, margin }: { errors: any, identifier: string, margin?: string }) => {
  // Calculate a fixed height that will accommodate your error messages
  const errorHeight = "2.5rem"; // Adjust this value based on your needs
  
  return (
    <div className={`h-[2.5rem] relative z-[0] ${margin ? margin : ""}`}>
      <div className={`absolute w-full overflow-hidden transition-all duration-300 ease-in-out
          ${errors[identifier] ? `opacity-100 max-h-[${errorHeight}]` : "opacity-0 max-h-0"}
          rounded-b-md`}>
        <p className="text-xs text-background text-start rounded-b-md bg-[#e9164b]/90 pb-2 px-2 pt-3">
          {errors[identifier]?.message}
        </p>
      </div>
    </div>
  )
}

export default ErrorField
