import React from 'react'

const ErrorFieldArea = ({ errors, identifier }: { errors: any, identifier: string }) => {
    console.log(identifier)
  return (
    <div className={`overflow-hidden transition-all duration-300 ease-in-out
        rounded-md w-full mt-1
        ${errors[identifier] ? "max-h-15 " : "max-h-0"}
        `}>
          <p className="text-xs text-background text-start rounded-b-md  bg-[#e9164b]/90 p-2 pl-2">
            {errors[identifier]?.message}
          </p>
        </div>
  )
}

export default ErrorFieldArea
