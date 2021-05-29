//import {uiActions} from '../ui-slice';
import {loadPortfolio, loadPortCats, PortfolioItem, PortfolioCategory} from './portfolioSlice';



export const loadCategoryData = () => {
    return async (dispatch: any) => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:3000/categories');
            if(!response.ok) {
                throw new Error('Could not load category data');
            }
            const data = await response.json();
            return data;
        }

        try {
            const portCats: PortfolioCategory[] = await fetchData();
            dispatch(loadPortCats(portCats));

        } catch (error) {


        }
    }
}



export const loadPortfolioData = () => {
    return async (dispatch: any) => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:3000/portfolio');
            if(!response.ok) {
                throw new Error('Could not load portfolio data');
            }
            const data = await response.json();
            return data;
        }

        try {
            const portData:PortfolioItem[] = await fetchData();
            dispatch(loadPortfolio(portData));

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



// export const sendCartData = (cart) => {
//     return async (dispatch) => {
//         dispatch(uiActions.showNotification({
//             status: 'Pending',
//             title: 'Sending...',
//             message: 'Sending cart data'
//           }))


//         const sendRequest = async () => {
//             const response = await fetch('https://react-http-7e6e2-default-rtdb.firebaseio.com/cart.json', 
//             {method: 'PUT', body: JSON.stringify({
//                 items: cart.items,
//                 totalQuantity: cart.totalQuantity
//             })})

//             if(!response.ok) {
//                 throw new Error('Problem sending cart data');
//             }
//         }

//         try {
//             await sendRequest();

//             dispatch(uiActions.showNotification({
//                 status: 'Success',
//                 title: 'Success',
//                 message: 'Sent cart data successfully'
//               }))        
//         } catch (error) {
//             dispatch(uiActions.showNotification({
//                 status: 'Error',
//                 title: 'Error',
//                 message: 'Could not send cart data'
//               }))
//         }
//     }
// }



