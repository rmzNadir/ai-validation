import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { contactRequestsReducer } from '../../redux/slices/contactRequestsSlice';
import { App } from './App';
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

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />, { wrapper: Wrapper });
  });

  it('renders ContactRequestForm', () => {
    render(<App />, { wrapper: Wrapper });

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  });

  it('renders ContactRequests', () => {
    store.dispatch({
      type: 'contactRequests/addContactRequest',
      payload: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        message: 'Test message',
      },
    });

    render(<App />, { wrapper: Wrapper });

    expect(screen.getByText(/Contact Requests/i)).toBeInTheDocument();
  });
});
