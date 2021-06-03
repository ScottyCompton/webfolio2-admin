//import {uiActions} from '../ui-slice';
import {loadPortfolio, loadPortCats, updatePortfolioDisplayOrder} from './portfolioSlice';
import {PortfolioItem, PortfolioCategory} from '../interfaces';
import {getData, putData} from '../helpers/handleHttp';


export const loadCategoryData = (cb:any) => {
    return async (dispatch: any) => {   
        try {
            const portCats: PortfolioCategory[] = await getData('categories');
            dispatch(loadPortCats(portCats));
            if(cb) {
                await cb(portCats);
            }
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

export const moveCso = (portfolioId: string, adjacentId: string, categoryId: string, direction: string = 'moveup') => {

    return async (dispatch: any) => {
        try {

            const body = {
                    categoryId,
                    portfolioId,
                    adjacentId
                }

            const payload = await putData(`portfolio/${direction}`, body);   
            dispatch(updatePortfolioDisplayOrder(payload));

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

export const moveDownCso = (_id: string) => {

}






export const loadPortfolioData = () => {
    return async (dispatch: any) => { 
        try {
            const portData:PortfolioItem[] = await getData('portfolio');
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



