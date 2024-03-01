import React from 'react'

const Select = ({label, options, onClick, editMode, value}) => {
    return (
        <div>
          <h2 className='text-2xl text-[#004466] font-bold pl-2 mb-1'>{label}</h2>
    
          {editMode ? (
            <select
              type="text"
              name={label}
              id={label}
              className='border border-gray-400 rounded-full h-12 w-full pt-2 pb-2 pl-6 pr-6 appearance-none'
              onClick={onClick}
            >
              {options.map((option, index) => {
                let optionValue, optionName;
                if (label === "Provincia") {
                  optionValue = option.idProvince;
                  optionName = option.nameProvince;
                } else if (label === "Ciudad") {
                  optionValue = option.idCity;
                  optionName = option.nameCity;
                } else if (label === "Profesion") {
                  optionValue = option.idProfession;
                  optionName = option.nameProfession;
                } else {
                  // Otra lógica si es necesario
                }
    
                return (
                  <option key={index} value={optionValue}>
                    {optionName}
                  </option>
                );
              })}
            </select>
          ) : (
            <select
              type="text"
              name={label}
              id={label}
              className='border border-gray-400 rounded-full h-12 w-full pt-2 pb-2 pl-6 pr-6 appearance-none'
              onClick={onClick}
              value={value}
              disabled
            >
              <option value={value}>
                {value}
              </option>
            </select>
          )}
        </div>
      );
    };
    
    export default Select;
