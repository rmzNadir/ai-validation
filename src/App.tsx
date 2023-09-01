import React, { useState } from 'react';
import { updateForm } from './slices/formSlice';
import { useAppDispatch } from './store';
import isEmail from 'validator/es/lib/isEmail';
import isEmpty from 'validator/es/lib/isEmpty';
import isLength from 'validator/es/lib/isLength';

const allowedFields = new Set(['firstName', 'lastName', 'email', 'message']);

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const [localFormState, setLocalFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const { firstName, lastName, email, message } = localFormState;

  const isFormValid =
    !isEmpty(firstName) &&
    !isEmpty(lastName) &&
    isEmail(email) &&
    isLength(message, { min: 10 });

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!allowedFields.has(e.target.name)) return;

    setLocalFormState({
      ...localFormState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      dispatch(updateForm(localFormState));
    }
  };

  return (
    <div className='bg-gray-900 text-white min-h-screen flex flex-col justify-start items-center pt-60'>
      <form
        className='max-w-xl w-full p-4 bg-gray-800 rounded shadow-lg'
        aria-labelledby='formTitle'
        onSubmit={handleSubmit}
      >
        <h1 id='formTitle' className='text-2xl font-semibold mb-4 text-white'>
          Contact Form
        </h1>
        <fieldset>
          <div className='mb-4'>
            <label
              htmlFor='firstName'
              className='block text-sm font-semibold text-gray-300'
            >
              First Name
            </label>
            <input
              id='firstName'
              className='mt-1 p-2 w-full border rounded-md bg-gray-700 text-white'
              placeholder='John'
              value={firstName}
              name='firstName'
              onChange={handleFieldChange}
              aria-required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='lastName'
              className='block text-sm font-semibold text-gray-300'
            >
              Last Name
            </label>
            <input
              id='lastName'
              className='mt-1 p-2 w-full border rounded-md bg-gray-700 text-white'
              placeholder='Doe'
              value={lastName}
              name='lastName'
              onChange={handleFieldChange}
              aria-required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-semibold text-gray-300'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              className='mt-1 p-2 w-full border rounded-md bg-gray-700 text-white'
              placeholder='johndoe@example.com'
              value={email}
              name='email'
              onChange={handleFieldChange}
              aria-required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='message'
              className='block text-sm font-semibold text-gray-300'
            >
              Message
            </label>
            <textarea
              id='message'
              className='mt-1 p-2 w-full h-32 border rounded-md bg-gray-700 text-white'
              placeholder='Say anything!'
              value={message}
              name='message'
              onChange={handleFieldChange}
              aria-required
            />
          </div>
          <div>
            <button
              type='submit'
              className={`py-2 px-4 bg-blue-600 text-white rounded-md ${
                !isFormValid && 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
              aria-disabled={!isFormValid}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
