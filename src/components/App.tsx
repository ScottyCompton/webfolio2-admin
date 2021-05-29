import {useAppDispatch} from '../hooks/redux-hooks';
import {useEffect} from 'react';
import {loadPortfolioData, loadCategoryData} from '../appData/portfolioActions';
import PortCatList from './PortCatList';


const App:React.FC = () => {
  //const portfolio = useAppSelector(state => state.portfolio);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCategoryData());
    dispatch(loadPortfolioData());
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <div className="heading"></div>
        <PortCatList />
      </header>
    </div>
  );
}

export default App;
