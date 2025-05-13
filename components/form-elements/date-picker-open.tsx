import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import '@/styles/date-picker-styles.css'; // We'll create this file for custom styles
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import ErrorFieldArea from './error-field-area';

const AppointmentSection = ({ control, label, secondary_label, name, required, errors }: { control: any, label: string, secondary_label: string, name: string, required: boolean, errors: any }) => {
  return (
    <div className="form-area w-full ">
        <label className="input-label">{label}<span className="text-warning">{required ? "*" : ""}</span></label>
        <p className={`input-sublabel ${!required ? "" : "mb-2"}`}>{secondary_label}</p>
        {!required && <p className="input-sublabel mb-2">(Optional)</p>}

      <div className="">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              inline // This makes the calendar always visible without needing to click an input
              calendarClassName="w-full custom-datepicker" // Added custom class
              dayClassName={date => {
                // Check if this is today's date
                const today = new Date();
                const isToday = 
                  date.getDate() === today.getDate() && 
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();
                
                // Check if this is the selected date
                const isSelected = field.value && 
                  date.getDate() === field.value.getDate() && 
                  date.getMonth() === field.value.getMonth() &&
                  date.getFullYear() === field.value.getFullYear();
                
                if (isSelected) return "selected-day";
                if (isToday) return "today-day";
                return ""; // Return empty string instead of undefined
              }}
              minDate={new Date()} // Prevents selecting dates in the past
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="flex items-center justify-between px-2 py-2">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <ChevronLeftIcon className="w-4 h-4" /> 
                  </button>
                  <div className="text-lg font-medium">
                    {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
                  </div>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            />
          )}
        />
        
      </div>
      {errors[name] && <ErrorFieldArea errors={errors} identifier={name} />}

    </div>
  );
};

export default AppointmentSection;