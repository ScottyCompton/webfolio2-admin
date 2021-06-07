//import {uiActions} from '../ui-slice';
import {loadPortfolio, 
    loadPortCats, 
    updatePortfolioDisplayOrder, 
    togglePublished, 
    updatePortItem, 
    deleteAuxImage, 
    uploadAuxImage,
    updatePreviewImage,
    deletePortItem} from './portfolioSlice';
import {PortfolioItem, PortfolioCategory} from '../interfaces';
import {getData, putData} from '../helpers/handleHttp';


export const portfolioActions_loadCategoryData = (cb:any) => {
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

export const portfolioActions_moveCso = (portfolioId: string, adjacentId: string, categoryId: string, direction: string = 'moveup') => {

    return async (dispatch: any) => {
        try {

         
            const putConfig = {
                body: {
                    categoryId,
                    portfolioId,
                    adjacentId
                }
            }

            const payload = await putData(`portfolio/${direction}`, putConfig);   
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




export const portfolioActions_loadPortfolioData = () => {
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


export const portfolioActions_togglePublished = (portfolioId: string|null, cb: any ) => {

    return async (dispatch: any) => { 
        try {

            const putConfig = {
                method: 'PATCH',
                body: {}
            }

            const payload = await putData(`portfolio/publish/${portfolioId}`,putConfig);
            dispatch(togglePublished(payload));
            
            if(cb) {
                await cb(payload)
            }

        } catch (error) {
            console.log(error)
        }
    }

}


export const portfolioActions_updatePortItem = (portfolioData: PortfolioItem, cb: any) => {
    return async (dispatch: any) => { 
        try {

            const putConfig = {
                body: portfolioData,
                method: 'PATCH'
            };

            const payload = await putData(`portfolio/${portfolioData._id}`,putConfig);
            dispatch(updatePortItem(payload));
            
            if(cb) {
                await cb(payload)
            }

        } catch (error) {
            console.log(error)
        }
    }    
}



export const portfolioActions_deleteAuxImage = (portfolioId: string, auxImgId: string, cb: any) => {
    return async (dispatch: any) => {
        try {

            const putConfig = {
                method: 'DELETE'
            };

            const auxImgs = await putData(`portfolio/${portfolioId}/auximg/${auxImgId}`, putConfig);
            const payload = {
                _id: portfolioId,
                auxImgs            
            }
            dispatch(deleteAuxImage(payload));
            
            if(cb) {
                await cb(auxImgs)
            }

        } catch (error) {
            console.log(error)
        }

    }
}


export const portfolioActions_uploadAuxImage =  (portfolioId: string, formData: any, cb?: any) => {


    return async (dispatch: any) => {
        try {

            const putConfig = {
                body: formData,
                contentType: 'none'
            }
            

            const auxImgs = await putData(`portfolio/${portfolioId}/auximg`, putConfig)
            const payload = {
                _id: portfolioId,
                auxImgs
            }
            dispatch(uploadAuxImage(payload));
            
            if(cb) {
                await cb(auxImgs)
            }            


        } catch (error) {
            console.log(error);
        }
    }
}



export const portfolioActions_uploadPreviewImage = (portfolioId: string, formData: any, cb: any) => {
    return async (dispatch:any) => {
        try {
            const putConfig = {
                body: formData,
                contentType: 'none'
            }

            const response = await putData(`portfolio/${portfolioId}/previewimg`, putConfig)
            const payload = {
                _id: portfolioId,
                previewImgUrl: response.previewImgUrl
            }
            dispatch(updatePreviewImage(payload));
            
            if(cb) {
                await cb(payload.previewImgUrl)
            }            

        } catch (error) {
            console.log(error)
        }
    }
}


export const portfolioActions_deletePortItem = (portfolioId: string) => {
    return async (dispatch:any) => {
        try {
            const putConfig = {
                body: {},
                method: 'DELETE'
            }

            const response = await putData(`portfolio/${portfolioId}`, putConfig)
            const payload = {
                _id: response._id
            }
            dispatch(deletePortItem(payload));
                 

        } catch (error) {
            console.log(error)
        }        
    }
}