import React from 'react';
import FormField from './FormField';

const PhoneNumbers = ({ push, remove, form }) => {
  const { values } = form;
  return (
    <>
      {values.phoneNumbers.map((_, index) => (
        <div key={index} className="mb-2 flex items-center">
          <FormField
            name={`phoneNumbers[${index}]`}
            type="text"
            label={`Phone Number ${index + 1}`}
            mask="(999) 999-9999"
          />
          <button type="button" onClick={() => remove(index)}
                  className="ml-2 p-1 text-red-500 hover:border-0 focus:outline-0">
            x
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => push('')}
        className="mb-4 py-1 px-2 bg-blue-500 text-white rounded-md h-10"
      >
        Add Phone Number
      </button>
    </>
  );
};

export default PhoneNumbers;
