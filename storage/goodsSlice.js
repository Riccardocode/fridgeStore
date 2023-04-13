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
        console.log(payload);      
        payload["id"] = goods.goodsArray.length;
        console.log(payload);
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
        // updateQuantity:(state, action) =>{
        //     let sta = state.goodsArray;
        //     console.log(action.payload);

        //     state.goodsArray.map((good)=>{
        //         //console.log(good.id + ' e poi ' + action)
        //         if(good.id == action.payload[0]){
        //             good.quantity = action.payload[1];
        //             console.log(good.quantity);
        //         }
        //     })
            
        // }
      
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
export const { addGood,updateQuantity } = goodsSlice.actions;
export const goodsReducer = goodsSlice.reducer;