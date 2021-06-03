import AppRouter from '../routes/AppRouter';
import {loginUser} from '../appData/uiSlice';
import {useAppDispatch} from '../hooks/redux-hooks';


const App:React.FC = () => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem('jwt');

  if(jwt && jwt.length !== 0) {
    let loginPayload = {
      isAuthenticated: true,
      jwt
  }
  
    dispatch(loginUser(loginPayload));
  }




  return (
    <AppRouter />
  );
}

export default App
