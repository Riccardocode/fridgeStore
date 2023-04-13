import { configureStore } from '@reduxjs/toolkit';
import { goodsReducer } from '../storage/goodsSlice';
import { suppliersReducer } from '../storage/suppliersSlice';


export const store = configureStore({
    reducer: {
        goods: goodsReducer,
        suppliers: suppliersReducer,
    }
});