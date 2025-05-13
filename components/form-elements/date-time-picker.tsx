import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { ChevronDown, Clock } from 'lucide-react';
import ErrorFieldArea from './error-field-area';

interface DateTimePickerProps {
  control: any;
  name: string;
  label: string;
  secondary_label?: string;
  required?: boolean;
  errors?: any;
}

const DateTimePicker = ({
  control,
  name,
  label,
  secondary_label,
  required = false,
  errors = {}
}: DateTimePickerProps) => {
  // For AM/PM toggle
  const [isAM, setIsAM] = useState(true);

  return (
    <div className="form-area">
      <label htmlFor={name} className="input-label">{label}{required && <span className="text-warning">*</span>}</label>
      {secondary_label && <p className={`input-sublabel ${!required ? "" : "mb-2"}`}>{secondary_label}</p>}
      {!required && <p className="input-sublabel mb-2">(Optional)</p>}
      
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          // Extract date parts from the value if it exists
          const value = field.value ? new Date(field.value) : new Date();
          const month = value.getMonth() + 1;
          const day = value.getDate();
          const year = value.getFullYear();
          const hours = value.getHours();
          const minutes = value.getMinutes();
          
          // Format hours for 12-hour display
          const displayHours = hours % 12 === 0 ? 12 : hours % 12;
          const ampm = hours >= 12 ? 'PM' : 'AM';
          
          // Update the date value
          const updateDate = (newMonth?: number, newDay?: number, newYear?: number, newHours?: number, newMinutes?: number) => {
            const updatedDate = new Date(value);
            
            if (newMonth !== undefined) updatedDate.setMonth(newMonth - 1);
            if (newDay !== undefined) updatedDate.setDate(newDay);
            if (newYear !== undefined) updatedDate.setFullYear(newYear);
            if (newHours !== undefined) updatedDate.setHours(newHours);
            if (newMinutes !== undefined) updatedDate.setMinutes(newMinutes);
            
            field.onChange(updatedDate);
          };
          
          return (
            <div className="space-y-4 md:flex md:flex-row md:gap-2">
              {/* Date Input (MM/DD/YYYY) */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Date</label>
                <div className="flex space-x-2">
                  {/* Month */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM"
                      className="w-full px-2 pb-2 pt-1 border border-gray-300 text-center text-sm rounded-md focus:border-transparent focus:outline-none focus:ring focus:ring-primary"
                      value={month.toString().padStart(2, '0')}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1 && val <= 12) {
                          updateDate(val);
                        }
                      }}
                      maxLength={2}
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  
                  <span className="flex items-center text-gray-500">/</span>
                  
                  {/* Day */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="DD"
                      className="w-full px-2 pb-2 pt-1 border border-gray-300 text-center text-sm rounded-md focus:border-transparent focus:outline-none focus:ring focus:ring-primary"
                      value={day.toString().padStart(2, '0')}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1 && val <= 31) {
                          updateDate(undefined, val);
                        }
                      }}
                      maxLength={2}
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  
                  <span className="flex items-center text-gray-500">/</span>
                  
                  {/* Year */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="YYYY"
                      className="w-full px-2 pb-2 pt-1 border border-gray-300 text-center text-sm rounded-md focus:border-transparent focus:outline-none focus:ring focus:ring-primary"
                      value={year}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1900 && val <= 2100) {
                          updateDate(undefined, undefined, val);
                        }
                      }}
                      maxLength={4}
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Time Input (HH:MM AM/PM) */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Time</label>
                <div className="flex items-center space-x-2">
                  <div className="relative w-[150px]">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <div className="flex">
                      {/* Hours */}
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="HH"
                        className="w-full pl-10 pr-3 pb-2 pt-1 border border-gray-300 rounded-l-md focus:outline-none text-sm focus:border-transparent focus:ring focus:ring-primary"
                        value={displayHours.toString().padStart(2, '0')}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val >= 1 && val <= 12) {
                            // Convert to 24-hour format based on AM/PM
                            let newHours = val;
                            if (ampm === 'PM' && val !== 12) newHours = val + 12;
                            if (ampm === 'AM' && val === 12) newHours = 0;
                            updateDate(undefined, undefined, undefined, newHours);
                          }
                        }}
                        maxLength={2}
                        style={{ appearance: 'textfield' }}
                      />
                      
                      <span className="flex items-center px-2 border-gray-300 border-t border-b text-gray-500">:</span>
                      
                      {/* Minutes */}
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="MM"
                        className="w-full px-3 pb-2 pt-1 border border-gray-300 rounded-r-md focus:outline-none text-sm focus:border-transparent focus:ring focus:ring-primary"
                        value={minutes.toString().padStart(2, '0')}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val >= 0 && val <= 59) {
                            updateDate(undefined, undefined, undefined, undefined, val);
                          }
                        }}
                        maxLength={2}
                        style={{ appearance: 'textfield' }}
                      />
                    </div>
                  </div>
                  
                  {/* AM/PM Toggle */}
                  <div className="flex rounded-md overflow-hidden border border-gray-300">
                    <button
                      type="button"
                      className={`cursor-pointer px-3 py-2 text-xs ${ampm === 'AM' ? 'bg-primary text-white' : 'bg-foreground/5 text-foreground'} transition-colors`}
                      onClick={() => {
                        if (ampm !== 'AM') {
                          // Convert from PM to AM (subtract 12 hours)
                          const newHours = (hours - 12) < 0 ? 0 : hours - 12;
                          updateDate(undefined, undefined, undefined, newHours);
                        }
                      }}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      className={`cursor-pointer px-3 py-2 text-xs ${ampm === 'PM' ? 'bg-primary text-white' : 'bg-foreground/5 text-foreground'} transition-colors`}
                      onClick={() => {
                        if (ampm !== 'PM') {
                          // Convert from AM to PM (add 12 hours)
                          const newHours = hours + 12 > 23 ? 23 : hours + 12;
                          updateDate(undefined, undefined, undefined, newHours);
                        }
                      }}
                    >
                      PM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />
      
      {errors[name] && <ErrorFieldArea errors={errors} identifier={name} />}
    </div>
  );
};

export default DateTimePicker; 