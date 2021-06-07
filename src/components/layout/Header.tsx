
import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import {withRouter, useHistory } from "react-router-dom";
import {executeLogout} from '../../appData/uiActions';


const Header:React.FC = () => {
    const isAuthenticated = useAppSelector(state => state.ui.isAuthenticated)
    const dispatch = useAppDispatch();
    const history = useHistory();

    const doLogout = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(executeLogout()).then(() => {
            history.push('/login')
        });
    }

    return (
        <header className="main-header text-white bg-light">
            <nav>
                <ul>
                    {isAuthenticated && <li><Link to="/">Portfolio</Link></li>}
                    {isAuthenticated && <li><Link to="/settings">Settings</Link></li>}
                    {isAuthenticated && <li><Link to="#" onClick={doLogout}>Logout</Link></li>}
                </ul>
            </nav>
        </header>
    );
}

export default withRouter(Header);