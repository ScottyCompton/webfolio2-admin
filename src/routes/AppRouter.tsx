
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {useAppSelector} from '../hooks/redux-hooks';
import Portfolio from '../pages/Portfolio';
import PortfolioEdit from '../pages/PortfolioEdit';
import SettingsEdit from '../pages/SettingsEdit'
import Login from '../pages/Login';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {createBrowserHistory} from 'history';




export const history = createBrowserHistory();


const AppRouter:React.FC = (props) => {
    const isAuthenticated = useAppSelector(state => state.ui.isAuthenticated)
    

    return (
        <Router history={history} >
        <Route render={({location}) => {
            return (
              <TransitionGroup className="RTG">
              <CSSTransition 
                  key={location.key}
                  timeout={1000}
                  classNames="fade"
              >
            <main>
                <div className="page">
                <Header />
                <Switch location={location}>
                    <Route path="/" exact={true}>
                        {!isAuthenticated ? <Redirect to="/login" /> : <Portfolio />}
                    </Route>
                    <Route path="/portfolio/:id" component={PortfolioEdit} />
                    <Route path="/settings" exact={true} component={SettingsEdit} />                                    
                    <Route path="/login" exact={true} component={Login} />                                    
                </Switch>
                <Footer />
                </div>
            </main>
              </CSSTransition>
            </TransitionGroup>
            );
          }} /> 
        </Router>)    


}

export default AppRouter;







  