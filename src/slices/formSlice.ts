// formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface UpdateFormPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<UpdateFormPayload>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateForm } = formSlice.actions;

export default formSlice.reducer;
