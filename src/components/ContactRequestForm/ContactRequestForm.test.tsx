/* eslint-disable testing-library/no-unnecessary-act */
import { FC, ReactNode } from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { contactRequestsReducer } from '../../redux/slices/contactRequestsSlice';
import { ContactRequestForm } from './ContactRequestForm';

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

describe('ContactRequestForm', () => {
  it('renders without crashing', () => {
    render(<ContactRequestForm />, { wrapper: Wrapper });
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  });

  it('handles input change', async () => {
    render(<ContactRequestForm />, { wrapper: Wrapper });
    const input: HTMLInputElement = screen.getByLabelText(/First Name/i);

    await act(async () => {
      userEvent.type(input, 'John');
    });

    expect(input.value).toBe('John');
  });

  it('handles form submission', async () => {
    render(<ContactRequestForm />, { wrapper: Wrapper });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/First Name/i), 'John');
      userEvent.type(screen.getByLabelText(/Last Name/i), 'Doe');
      userEvent.type(screen.getByLabelText(/Email/i), 'john@example.com');
      userEvent.type(
        screen.getByLabelText(/Message/i),
        'Hello there! I have more than 10 characters.'
      );
    });

    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeEnabled();

    await act(async () => {
      userEvent.click(submitButton);
    });

    const state = store.getState();
    expect(state.contactRequests).toEqual([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        message: 'Hello there! I have more than 10 characters.',
      },
    ]);
  });

  it('disables the submit button if the form is invalid', () => {
    render(<ContactRequestForm />, { wrapper: Wrapper });

    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });
});
