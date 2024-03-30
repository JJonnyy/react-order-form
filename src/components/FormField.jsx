import React from 'react';
import { Field as FormikField, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';
import { ErrorMessageComponent } from './ErrorMessageComponent';

const FormField = ({ label, mask, formClass, ...props }) => (
  <div className={`mb-4 ${formClass}`}>
    <label className="text-gray-700 block text-base font-medium mb-1">{label}</label>
    {mask ? (
      <InputMask {...props} mask={mask} className="w-full py-2 px-3 rounded-md border border-gray-300" />
    ) : (
      <FormikField {...props} className="w-full py-2 px-3 rounded-md border border-gray-300" />
    )}
    <ErrorMessage name={props.name} component={ErrorMessageComponent} />
  </div>
);

export default FormField;
