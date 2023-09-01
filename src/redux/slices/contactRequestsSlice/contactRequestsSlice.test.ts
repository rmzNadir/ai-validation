import {
  contactRequestsSlice,
  addContactRequest,
  ContactRequest,
} from './contactRequestsSlice';

describe('contactRequests slice', () => {
  const initialState: ContactRequest[] = [];

  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    const state = contactRequestsSlice.reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle addContactRequest', () => {
    const contactRequest = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      message: 'Hello there!',
    };

    const state = contactRequestsSlice.reducer(
      initialState,
      addContactRequest(contactRequest)
    );
    expect(state).toEqual([contactRequest]);
  });
});
