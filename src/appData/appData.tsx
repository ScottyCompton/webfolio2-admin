import {configureStore} from '@reduxjs/toolkit';
import portfolioSliceReducer from './portfolioSlice';
import uiSliceReducer from  './uiSlice';

export const appData = configureStore({
    reducer: {
        portfolio: portfolioSliceReducer,
        ui: uiSliceReducer
    }
})

export type RootState = ReturnType<typeof appData.getState>
export type AppDispatch = typeof appData.dispatch;