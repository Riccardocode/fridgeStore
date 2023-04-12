import { configureStore } from '@reduxjs/toolkit';
import { goodsReducer } from '../storage/goodsSlice';


export const store = configureStore({
    reducer: {
        goods: goodsReducer,
    }
});