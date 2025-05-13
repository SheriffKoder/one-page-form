import React, { useState, useEffect, useRef } from 'react';
import { Search, Check, ChevronDown, X, Plus } from 'lucide-react';
import ErrorFieldArea from './error-field-area';

interface DropdownOption {
  value: string | number;
  label: string;
}

interface DropdownSelectProps {
  name: string;
  label: string;
  secondary_label?: string;
  options: DropdownOption[];
  multiselect?: boolean;
  required?: boolean;
  placeholder?: string;
  onChange?: (selectedValues: (string | number)[]) => void;
  defaultValue?: (string | number)[];
  // Add these props for React Hook Form integration
  register?: any;
  setValue?: any;
  errors?: any;
  showSearch?: boolean;
  allowCustomOption?: boolean; // New prop to enable/disable custom option
}

const DropdownSelect = ({
  name,
  label,
  secondary_label,
  options,
  multiselect = false,
  required = false,
  placeholder = "Select an option",
  onChange,
  defaultValue = [],
  // React Hook Form props
  register,
  setValue,
  errors = {},
  // Search prop
  showSearch = true,
  allowCustomOption = false // Default to false
}: DropdownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  // Sort options in ascending order
  const sortedOptions = [...options].sort((a, b) => {
    if (typeof a.value === 'number' && typeof b.value === 'number') {
      return a.value - b.value;
    }
    return String(a.label).localeCompare(String(b.label));
  });

  // Filter options based on search term
  const filteredOptions = sortedOptions.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Register with React Hook Form if register is provided
  useEffect(() => {
    if (register) {
      register(name, { required });
    }
  }, [register, name, required]);

  // Initialize with default values
  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      const initialSelected = options.filter(opt => 
        defaultValue.includes(opt.value)
      );
      setSelectedOptions(initialSelected);
      
      // Update form value if setValue is provided
      if (setValue) {
        setValue(name, defaultValue, { shouldValidate: false });
      }
    }
  }, [defaultValue, options, name, setValue]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCustomInput(false);
        setCustomValue('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus the custom input when it becomes visible
  useEffect(() => {
    if (showCustomInput && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [showCustomInput]);

  // Handle option selection
  const handleOptionSelect = (option: DropdownOption) => {
    let newSelectedOptions: DropdownOption[];
    
    if (multiselect) {
      // For multiselect, toggle the selected state
      const isAlreadySelected = selectedOptions.some(item => item.value === option.value);
      
      if (isAlreadySelected) {
        newSelectedOptions = selectedOptions.filter(item => item.value !== option.value);
      } else {
        newSelectedOptions = [...selectedOptions, option];
      }
    } else {
      // For single select, replace the selection
      newSelectedOptions = [option];
      setIsOpen(false); // Close dropdown for single select
    }
    
    setSelectedOptions(newSelectedOptions);
    
    // Extract just the values for the callback
    const newValues = newSelectedOptions.map(opt => opt.value);
    console.log(`Selected values for ${name}:`, newValues);
    
    // Update form value if setValue is provided
    if (setValue) {
      setValue(name, newValues, { shouldValidate: true });
    }
    
    // Call onChange callback if provided
    if (onChange) {
      onChange(newValues);
    }
  };

  // Handle custom option selection
  const handleCustomOptionClick = () => {
    setShowCustomInput(true);
  };

  // Add the custom option
  const addCustomOption = () => {
    if (customValue.trim().length > 0) {
      // Create a unique value for the custom option
      const customOptionValue = customValue.trim();
      const customOption: DropdownOption = {
        value: customOptionValue,
        label: customValue.trim()
      };
      
      let newSelectedOptions: DropdownOption[];
      
      if (multiselect) {
        newSelectedOptions = [...selectedOptions, customOption];
      } else {
        newSelectedOptions = [customOption];
        setIsOpen(false);
      }
      
      setSelectedOptions(newSelectedOptions);
      
      // Extract just the values for the callback
      const newValues = newSelectedOptions.map(opt => opt.value);
      console.log(`Selected values with custom option for ${name}:`, newValues);
      
      // Update form value if setValue is provided
      if (setValue) {
        setValue(name, newValues, { shouldValidate: true });
      }
      
      // Call onChange callback if provided
      if (onChange) {
        onChange(newValues);
      }
      
      // Reset custom input
      setShowCustomInput(false);
      setCustomValue('');
    }
  };

  // Cancel custom input
  const cancelCustomInput = () => {
    setShowCustomInput(false);
    setCustomValue('');
  };

  // Handle custom input key press
  const handleCustomInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customValue.trim().length > 0) {
      e.preventDefault();
      addCustomOption();
    } else if (e.key === 'Escape') {
      cancelCustomInput();
    }
  };

  // Remove a selected option (for multiselect)
  const removeOption = (option: DropdownOption, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening
    const newSelectedOptions = selectedOptions.filter(item => item.value !== option.value);
    setSelectedOptions(newSelectedOptions);
    
    // Extract just the values for the callback
    const newValues = newSelectedOptions.map(opt => opt.value);
    console.log(`Selected values after removal for ${name}:`, newValues);
    
    // Update form value if setValue is provided
    if (setValue) {
      setValue(name, newValues, { shouldValidate: true });
    }
    
    // Call onChange callback if provided
    if (onChange) {
      onChange(newValues);
    }
  };

  // Clear all selected options
  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening
    setSelectedOptions([]);
    console.log(`Cleared all selections for ${name}`);
    
    // Update form value if setValue is provided
    if (setValue) {
      setValue(name, [], { shouldValidate: true });
    }
    
    // Call onChange callback if provided
    if (onChange) {
      onChange([]);
    }
  };

  return (
    <div className="form-area w-full" ref={dropdownRef}>
      <label htmlFor={name} className="input-label">{label}{required && <span className="text-warning">*</span>}</label>
      {secondary_label && <p className={`input-sublabel ${required ? 'mb-2' : ''}`}>{secondary_label}</p>}
      {!required && <p className="input-sublabel mb-2">(Optional)</p>}
      
      {/* Hidden input for React Hook Form */}
      {register && (
        <input
          type="hidden"
          name={name}
          ref={inputRef}
          value={JSON.stringify(selectedOptions.map(opt => opt.value))}
        />
      )}
      
      {/* Dropdown trigger */}
      <div 
        className="relative w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`flex items-center justify-between w-full p-2 border border-gray-300 bg-primary rounded-md`}>
          <div className="flex flex-wrap gap-1 items-center">
            {selectedOptions.length > 0 ? (
              <>
                {selectedOptions.map((option) => (
                  <div 
                    key={option.value} 
                    className="flex items-center gap-1 bg-background text-foreground px-2 py-1 rounded-sm input-text"
                  >
                    <span>{option.label}</span>
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-warning" 
                      onClick={(e) => removeOption(option, e)}
                    />
                  </div>
                ))}
                {multiselect && selectedOptions.length > 0 && (
                  <button 
                    type="button" 
                    className="text-xs text-foreground/70 hover:text-foreground ml-1"
                    onClick={clearAll}
                  >
                    Clear all
                  </button>
                )}
              </>
            ) : (
              <span className="text-background input-text">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-background" />
        </div>
        
        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-background/90 backdrop-blur-sm border border-gray-200 rounded-md shadow-lg">
            {/* Search input - only show if showSearch is true */}
            {showSearch && (
              <div className="p-2 border-b border-gray-300">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 input-text text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-8 pr-2 py-2 input-text border border-gray-300 rounded-md focus:outline-none focus:border-transparent focus:ring focus:ring-primary"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                  />
                </div>
              </div>
            )}
            
            {/* Options list */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                <>
                  {filteredOptions.map((option) => {
                    const isSelected = selectedOptions.some(item => item.value === option.value);
                    return (
                      <div
                        key={option.value}
                        className={`flex items-center justify-between p-2 cursor-pointer hover:bg-secondary/20 ${isSelected ? 'bg-primary/10' : ''}`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        <span className="input-text">{option.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-foreground" />}
                      </div>
                    );
                  })}
                  
                  {/* Custom "Other" option */}
                  {allowCustomOption && !showCustomInput && (
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-primary/10 border-t border-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCustomOptionClick();
                      }}
                    >
                      <span className="flex items-center input-text">
                        <Plus className="w-4 h-4 stroke-2 mr-2 text-gray-600" />
                        Other
                      </span>
                    </div>
                  )}
                  
                  {/* Custom input field */}
                  {allowCustomOption && showCustomInput && (
                    <div 
                      className="p-2 border-t"
                      onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    >
                      <div className="flex items-center">
                        <input
                          ref={customInputRef}
                          type="text"
                          className="flex-grow p-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Enter custom value..."
                          value={customValue}
                          onChange={(e) => setCustomValue(e.target.value)}
                          onKeyDown={handleCustomInputKeyPress}
                        />
                        <div className="flex ml-2">
                          {customValue.trim().length > 0 && (
                            <button
                              type="button"
                              className="p-1 rounded-full bg-primary text-background hover:bg-primary/90"
                              onClick={addCustomOption}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            className="p-1 ml-1 rounded-full bg-warning text-background hover:bg-warning/90"
                            onClick={cancelCustomInput}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-2 text-center text-foreground/50">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Show error message if there's an error */}
      {errors[name] && <ErrorFieldArea errors={errors} identifier={name} />}
    </div>
  );
};

export default DropdownSelect; 