import React from 'react';
import { updateForm } from './slices/formSlice';
import { useAppDispatch, useAppSelector } from './store';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const formState = useAppSelector((state) => state.form);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(updateForm({ [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <input
        placeholder='First Name'
        value={formState.firstName}
        name='firstName'
        onChange={handleFieldChange}
      />
      <input
        placeholder='Last Name'
        value={formState.lastName}
        name='lastName'
        onChange={handleFieldChange}
      />
      <input
        placeholder='Email'
        value={formState.email}
        name='email'
        onChange={handleFieldChange}
      />
      <textarea
        placeholder='Message'
        value={formState.message}
        name='message'
        onChange={handleFieldChange}
      />
    </div>
  );
};
