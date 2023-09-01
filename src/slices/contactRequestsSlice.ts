import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const initialState: ContactRequest[] = [];

export const contactRequestsSlice = createSlice({
  name: 'contactRequests',
  initialState,
  reducers: {
    addContactRequest: (state, action: PayloadAction<ContactRequest>) => {
      state.push(action.payload);
    },
  },
});

export const { addContactRequest } = contactRequestsSlice.actions;

export const { reducer: contactRequestsReducer } = contactRequestsSlice;
