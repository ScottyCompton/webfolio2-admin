import {createSlice, PayloadAction} from '@reduxjs/toolkit';
//import {RootState} from './appData'


interface LoginPayloadAction {
    isAuthenticated: boolean;
    jwt: string|null;
}


interface uiState {
    isAuthenticated: boolean;
    notification: string|null;
    jwt: string|null;
}



const initialState: uiState = {
    isAuthenticated: false,
    notification: null,
    jwt: null

}


const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        loginUser(state, action: PayloadAction<LoginPayloadAction>) {
            state.isAuthenticated = action.payload.jwt !== null;
            state.jwt = action.payload.jwt;
        },

        logoutUser(state) {
            state.isAuthenticated = false;
            state.jwt = null;
        }

    } 
    
})


const {actions, reducer} = uiSlice;
export const {loginUser, logoutUser} = actions;
export default reducer;