import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.example.com/items";

// Thunk để fetch dữ liệu từ API
export const fetchItems = createAsyncThunk(
  "data/fetchItems",
  async ({ search, filter }, thunkAPI) => {
    try {
      const response = await fetch(
        `${API_URL}?search=${search}&filter=${filter}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    search: "",
    filter: "",
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSearch, setFilter } = dataSlice.actions;

export default dataSlice.reducer;
