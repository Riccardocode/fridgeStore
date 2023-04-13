import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

export const fetchSuppliers = createAsyncThunk(
    'suppliers/fetchSuppliers',
    async () => {
        const response = await fetch(baseUrl + 'suppliers');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

export const postSupplier = createAsyncThunk(
    "suppliers/postSupplier",
    async (payload, { dispatch, getState }) => {
      setTimeout(() => {
        const { suppliers } = getState();
        let date = new Date();
        payload.date = date.toISOString();
        payload.id = suppliers.suppliersArray.length-1;
        dispatch(addSupplier(payload));
      }, 2000);
    }
  );
  

const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState: { isLoading: true, errMess: null, suppliersArray: [] },
    reducers: {
        addSupplier: (state, action) => {
        state.suppliersArray.push(action.payload);
      },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.suppliersArray = action.payload;
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});
export const { addSupplier } = suppliersSlice.actions;
export const suppliersReducer = suppliersSlice.reducer;