import { FC } from 'react';
import { ContactRequestForm } from './ContactRequestForm';
import { ContactRequests } from './ContactRequests';

export const App: FC = () => {
  return (
    <div className='bg-gray-900 text-white min-h-screen flex flex-col justify-start items-center pt-40'>
      <ContactRequestForm />
      <ContactRequests />
    </div>
  );
};
