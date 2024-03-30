import React from 'react';

const ErrorMessageComponent = ({ children }) => (
  <div className="text-red-500 text-sm mt-1 absolute">{children}</div>
);

export { ErrorMessageComponent };
