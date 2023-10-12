import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  usersList: [], // Initialize an empty array to hold the list of users
  status: "idle",
  error: null,
};

// Create an async thunk to fetch the user list
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    // Make an API request to get the list of users
    const response = await fetch("https://localhost:7191/api/User/GetUsers");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.usersList.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, name, email } = action.payload;
      const existingUser = state.usersList.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.usersList = state.usersList.filter((user) => user.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.usersList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
