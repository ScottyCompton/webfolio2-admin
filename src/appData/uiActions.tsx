import {putData} from '../helpers/handleHttp';
import {loginUser, logoutUser} from './uiSlice';
import {AuthResultData} from '../interfaces';


export const executeLogout = () => {

    return async (dispatch: any) => {
        const putConfig = {};

        await putData('users/logout',putConfig).then(() => {
            localStorage.removeItem('jwt');
            dispatch(logoutUser())
        });
    }
}


export const executeLogin = (email:string, password: string) => {
    return async (dispatch: any) => {
        try {

            const putConfig = {
                body: {
                    email,
                    password
                }
            }

           const authResult: AuthResultData = await putData('users/login',putConfig);

            let loginPayload = {
                isAuthenticated: (authResult.token && authResult.token.length !== 0) ? true : false,
                jwt: (authResult.token && authResult.token.length !== 0) ? authResult.token : null
            }

            dispatch(loginUser(loginPayload));

            if(loginPayload.jwt) {
                localStorage.setItem('jwt',loginPayload.jwt);
            }

            return loginPayload.isAuthenticated || false;

        } catch (error) {
            console.log(error);
            // dispatch(uiActions.showNotification({
            //     status: 'Error',
            //     title: 'Error',
            //     message: 'Could not fetch cart data'
            //   }))


        }
    }
}