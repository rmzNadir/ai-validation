import { FC } from 'react';
import { useAppSelector } from './store';

export const ContactRequests: FC = () => {
  const contactRequests = useAppSelector((state) => state.contactRequests);

  if (!contactRequests.length) return null;

  return (
    <div className='max-w-fit w-full p-4 bg-gray-800 rounded shadow-lg mt-10 overflow-x-auto'>
      <h2 className='text-2xl font-semibold mb-4 text-white'>
        Contact Requests
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-gray-700 text-white rounded-md divide-y divide-gray-600'>
          <thead>
            <tr>
              <th className='px-4 py-2'>First Name</th>
              <th className='px-4 py-2'>Last Name</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>Message</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-600'>
            {contactRequests.map(({ firstName, lastName, email, message }) => (
              <tr key={email}>
                <td className='px-4 py-2'>{firstName}</td>
                <td className='px-4 py-2'>{lastName}</td>
                <td className='px-4 py-2'>{email}</td>
                <td className='px-4 py-2'>{message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
