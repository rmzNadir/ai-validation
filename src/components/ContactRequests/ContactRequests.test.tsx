import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { contactRequestsReducer } from '../../redux/slices/contactRequestsSlice';
import { ContactRequests } from './ContactRequests';
import { FC, ReactNode } from 'react';

const store = configureStore({
  reducer: {
    contactRequests: contactRequestsReducer,
  },
});

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe('ContactRequests', () => {
  it('renders nothing when there are no contact requests', () => {
    render(<ContactRequests />, { wrapper: Wrapper });
    expect(screen.queryByText(/Contact Requests/)).toBeNull();
  });

  it('renders contact requests when they exist', () => {
    store.dispatch({
      type: 'contactRequests/addContactRequest',
      payload: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        message: 'Test message',
      },
    });

    render(<ContactRequests />, { wrapper: Wrapper });

    expect(screen.getByText(/Contact Requests/)).toBeInTheDocument();
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/Doe/)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/Test message/)).toBeInTheDocument();
  });
});
