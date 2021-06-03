
import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import {executeLogout} from '../../appData/uiActions';
import { useHistory, withRouter } from "react-router-dom";

const AdminHeader:React.FC = () => {
    const isAuthenticated = useAppSelector(state => state.ui.isAuthenticated)
    const dispatch = useAppDispatch();
    const history = useHistory();

    const doLogout = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(executeLogout()).then(() => {
            history.push('/')
        });
    }

    return (
        <nav>
            <ul>
                {isAuthenticated && <li><Link to="/">Portfolio</Link></li>}
                {isAuthenticated && <li><Link to="/settings">Settings</Link></li>}
                {isAuthenticated && <li><Link to="#" onClick={doLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default withRouter(AdminHeader);