import {configureStore} from '@reduxjs/toolkit';
//import uiSlice from './ui-slice';
import portfolioSliceReducer from './portfolioSlice';

export const appData = configureStore({
    reducer: {
        portfolio: portfolioSliceReducer
    }
})

export type RootState = ReturnType<typeof appData.getState>
export type AppDispatch = typeof appData.dispatch;