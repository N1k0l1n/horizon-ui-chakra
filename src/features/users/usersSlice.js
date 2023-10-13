import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  usersList: [],
  status: "idle",
  error: null,
};

const userApiBaseUrl = "https://localhost:7191/api/User";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch(`${userApiBaseUrl}/GetUsers`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

export const deleteUserById = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const response = await fetch(`${userApiBaseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    return id;
  } catch (error) {
    throw error;
  }
});

// Create an async thunk to add a new user
export const addUserAsync = createAsyncThunk("users/addUser", async (user) => {
  try {
    const response = await fetch(`${userApiBaseUrl}/AddUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to add user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

// Create an async thunk to edit an existing user
export const editUserAsync = createAsyncThunk("users/editUser", async (user) => {
  try {
    const response = await fetch(`${userApiBaseUrl}/UpdateUser/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to edit user");
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
  reducers: {},
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
      })
      .addCase(deleteUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.usersList = state.usersList.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.usersList.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const userIndex = state.usersList.findIndex((user) => user.id === action.payload.id);
        if (userIndex !== -1) {
          state.usersList[userIndex] = action.payload;
        }
      })
      .addCase(editUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
