import React, {useState} from 'react';
import {executeLogin} from '../appData/uiActions';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import { useHistory, withRouter } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';


const Login:React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginAttempt, setLoginAttempt] = useState(false);
    const isAuthenticated = useAppSelector(state => state.ui.isAuthenticated);
    const dispatch = useAppDispatch();
    const history = useHistory();
 

  
    const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(executeLogin(username,password)).then((isAuthenticated) => {
            if(isAuthenticated) {
                history.push('/'); 
              } else {
                setLoginAttempt(true);
              }
        }
        
        )
    }

    const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    return (
        <Container>
        <Row>
            <Col xs="12" className="align-center">
                <div className="card text-white bg-secondary mb-3" style={{maxWidth: '30rem', margin: '5rem auto 0'}}>
                <div className="card-header">Login</div>
                <div className="card-body">
                    <h4 className="card-title">WebFolio 2.0</h4>
                    <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username:</label><input className="form-control" id="username" onChange={handleUsernameChange} type="text" value={username} />
                            <label htmlFor="password">Password:</label><input className="form-control" id="password" onChange={handlePasswordChange} type="password" value={password} />
                            <br />
                            <button type="submit" className="btn btn-primary float-right">Login</button>
                        </form>
                </div>
                </div>
                {loginAttempt && !isAuthenticated && <div className="text-center"><p className="text-danger" style={{margin: '0 auto'}}>Login incorrect - you shall not pass!</p></div>}

            </Col>
        </Row>
        </Container>
    )
}


export default withRouter(Login);