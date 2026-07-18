import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [
    {
      id: "addr-1",
      name: "Aditya Mishra",
      phone: "+18005550199",
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "IL",
      postalCode: "62704",
      country: "United States",
      isDefault: true
    },
    {
      id: "addr-2",
      name: "Aditya Mishra Office",
      phone: "+18005550199",
      street: "100 Infinite Loop",
      city: "Cupertino",
      state: "CA",
      postalCode: "95014",
      country: "United States",
      isDefault: false
    }
  ],
  dob: "1995-08-15",
  profilePicture: null
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      if (action.payload.dob) state.dob = action.payload.dob;
      if (action.payload.profilePicture !== undefined) {
        state.profilePicture = action.payload.profilePicture;
      }
    },
    addAddress: (state, action) => {
      const newAddress = {
        ...action.payload,
        id: `addr-${Date.now()}`
      };
      if (newAddress.isDefault) {
        state.addresses.forEach((addr) => {
          addr.isDefault = false;
        });
      }
      state.addresses.push(newAddress);
    },
    updateAddress: (state, action) => {
      const updated = action.payload;
      const index = state.addresses.findIndex((addr) => addr.id === updated.id);
      if (index !== -1) {
        if (updated.isDefault) {
          state.addresses.forEach((addr) => {
            addr.isDefault = false;
          });
        }
        state.addresses[index] = updated;
      }
    },
    deleteAddress: (state, action) => {
      const id = action.payload;
      const index = state.addresses.findIndex((addr) => addr.id === id);
      if (index !== -1) {
        const wasDefault = state.addresses[index].isDefault;
        state.addresses = state.addresses.filter((addr) => addr.id !== id);
        
        // If we deleted the default, set first remaining address as default
        if (wasDefault && state.addresses.length > 0) {
          state.addresses[0].isDefault = true;
        }
      }
    },
    setDefaultAddress: (state, action) => {
      const id = action.payload;
      state.addresses.forEach((addr) => {
        addr.isDefault = addr.id === id;
      });
    }
  }
});

// Actions
export const { 
  updateProfile, 
  addAddress, 
  updateAddress, 
  deleteAddress, 
  setDefaultAddress 
} = profileSlice.actions;

// Selectors
export const selectAddresses = (state) => state.profile.addresses;
export const selectUserProfile = (state) => ({
  dob: state.profile.dob,
  profilePicture: state.profile.profilePicture
});
export const selectDefaultAddress = (state) => 
  state.profile.addresses.find((addr) => addr.isDefault);

// Reducer
export default profileSlice.reducer;
