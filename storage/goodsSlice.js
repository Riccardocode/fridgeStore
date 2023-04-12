import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

export const fetchGoods = createAsyncThunk(
    'goods/fetchGoods',
    async () => {
        const response = await fetch(baseUrl + 'goods');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

export const postGood = createAsyncThunk(
    "goods/postGood",
    async (payload, { dispatch, getState }) => {
      setTimeout(() => {
        const { goods } = getState();
        let date = new Date();
        payload.date = date.toISOString();
        payload.id = goods.commentsArray.length;
        dispatch(addGood(payload));
      }, 2000);
    }
  );
  

const goodsSlice = createSlice({
    name: 'goods',
    initialState: { isLoading: true, errMess: null, goodsArray: [] },
    reducers: {
        addGood: (state, action) => {
        state.goodsArray.push(action.payload);
      },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGoods.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.goodsArray = action.payload;
            })
            .addCase(fetchGoods.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});
export const { addGood } = goodsSlice.actions;
export const goodsReducer = goodsSlice.reducer;