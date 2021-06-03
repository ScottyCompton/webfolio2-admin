import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AdminHeader from '../components/layout/AdminHeader';
import AdminFooter from '../components/layout/AdminFooter';
//import SiteTitle from '../components/UI/SiteTitle';
import {useAppSelector} from '../hooks/redux-hooks';

interface PrivateRouteProps {
    component: any
    rest:any[];
}


export const PrivateRoute:React.FC<PrivateRouteProps> = ({ 
    component,
    ...rest
}) => {
    
    let isAuthenticated = useAppSelector(state => state.ui.isAuthenticated);

    return (
        <></>
        // <Route {...rest} component={(props:any) => (
        //     isAuthenticated ? (
        //         <div className="page">
        //             <AdminHeader />
        //                 <div className="shell">
        //                     <Component {...props} />
        //                 </div>
        //             <AdminFooter />
        //         </div>
        //     ) : (
        //         <div className="page">
        //             <Redirect to="/login" />
        //         </div>
        //     )
        // )} />
    )

};

export default PrivateRoute;