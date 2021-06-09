
import {useAppSelector, useAppDispatch} from './redux-hooks';
import {useState, useCallback} from 'react';
import {portfolioActions_loadPortfolioData, portfolioActions_loadCategoryData} from '../appData/portfolioActions';
//import {appIsLoading, appIsLoaded} from '../appData/uiSlice'

export const useAppData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const portCats = useAppSelector(state => state.portfolio.categories);
    const portfolio = useAppSelector(state => state.portfolio.items);

    const dispatch = useAppDispatch();


    const loadData = useCallback(async () => {

        setIsLoading(true);
        await dispatch(portfolioActions_loadCategoryData(null))
        //await dispatch(portfolioActions_loadPortfolioData());


    }, [dispatch])



    return {loadData, isLoading}

}
