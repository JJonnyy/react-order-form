import React, { useEffect } from 'react';
import { Formik, Form, FieldArray  } from 'formik';
import * as Yup from 'yup';
import mastercard from '../assets/logos_mastercard.svg';
import SectionHeading from './SectionHeading';
import PhoneNumbers from './PhoneNumbers';
import FormField from './FormField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutForm = () => {
  const [cardHolder, setCardHolder] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  useEffect(() => {
    if (firstName.length > 2 && lastName.length > 2)
      setCardHolder(`${firstName} ${lastName}`);
    else {
      setCardHolder('');
    }
  }, [firstName, lastName]);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumbers: [''],
    country: '',
    address: '',
    creditCard: '',
    cvv2: '',
    agreement: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required')
      .min(3, 'First name must be at least 3 characters')
      .max(18, 'First name must be at most 18 characters'),
    lastName: Yup.string().required('Last name is required')
      .min(3, 'Last name must be at least 3 characters')
      .max(18, 'Last name must be at most 18 characters'),
    email: Yup.string().email('Invalid email address'),
    phoneNumbers: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one phone number is required')
      .max(3, 'Maximum three phone numbers allowed'),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    creditCard: Yup.string()
      .required('Credit card number is required')
      .test('isValidCardNumber', 'Invalid card number', (value) => {
        const regex = /^\d{16}$/;
        return regex.test(value.replace(/\s/g, ''));
      }),
    cvv2: Yup.string()
      .required('CVV2 code is required')
      .matches(/^\d{3}$/, 'Must be 3 digits'),
    agreement: Yup.boolean()
      .oneOf([true], 'You must agree to the terms and conditions'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      toast.success('Form submitted successfully!', {
        position: toast.POSITION.TOP_CENTER
      });
    }, 1000);
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full md:w-10/12 max-w-screen-lg m-0 sm:my-8 sm:mx-6 shadow-md p-2 sm:p-6 rounded-0 sm:rounded-2xl bg-white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 p-3">
                  <div className="mb-2">
                    <SectionHeading>Personal Information</SectionHeading>
                    <div className="md:flex-row flex-col flex justify-between gap-4">
                      <FormField name="firstName" formClass={'w-full'} type="text" label="First Name" />
                      <FormField name="lastName" formClass={'w-full'} type="text" label="Last Name" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <SectionHeading>Contact Information</SectionHeading>
                    <FieldArray name="phoneNumbers" component={PhoneNumbers} />
                    <div className="md:flex-row flex-col flex justify-between gap-4">
                      <FormField formClass={'w-full'} name="email" type="email" label="Email for Receipt" />
                      <FormField formClass={'w-full'} name="address" type="text" label="Address" />
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 p-3">
                  <SectionHeading>Payment Details</SectionHeading>
                  <div className="">
                    <div className="creditCard  h-[240px] shadow-md border rounded-2xl px-5 py-5">
                      <img className="icon-mastercard mb-5" src={mastercard} alt="mastercard" />
                      <div className="flex justify-between">
                        <FormField name="creditCard" type="text" label="Card Number" />
                        <FormField formClass="max-w-[90px]" name="cvv2" type="text" label="CVV2" />
                      </div>
                      <label>Card Holder</label>
                      <p>{cardHolder}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-6">
                  <FormField type="checkbox" name="agreement" formClass='!mb-0 mr-2' />
                  <label htmlFor="agreement" className="text-base text-gray-600">
                    I agree to the terms and conditions
                  </label>
                </div>
                <button
                  type="submit"
                  className={`max-w-xs w-full py-2 px-4 rounded-md bg-blue-500 text-white font-medium 
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CheckoutForm;
