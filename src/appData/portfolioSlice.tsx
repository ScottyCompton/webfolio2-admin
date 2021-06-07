import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PortfolioCategory, PortfolioState, PortfolioItem} from '../interfaces';


const initialState: PortfolioState = {
    items: [],
    categories: []
}



const portSlice = createSlice({
    name: 'portfolio',
    initialState: initialState,

    reducers: { 
        
        loadPortCats(state, action: PayloadAction<PortfolioCategory[]>) {
            state.categories = action.payload;
        },

        loadPortfolio(state, action: PayloadAction<PortfolioItem[]>) {
            state.items = action.payload;
        },

        updatePortfolioDisplayOrder(state, action: PayloadAction<PortfolioItem[]>) {
            // update the cso arrays for the items in the array
            state.items = action.payload;
        },

        updatePortItem(state, action) {
            // saves changes to the portfolio item            
            const itemIdx = state.items.findIndex(item => item._id === action.payload._id)
            if(itemIdx !== -1) {
                state.items[itemIdx] = action.payload;
            }
        },

        updatePreviewImage(state, action) {
            const itemIdx =  state.items.findIndex(item => item._id === action.payload._id)
            if(itemIdx !== -1) {
                state.items[itemIdx].previewImgUrl = action.payload.previewImgUrl;
            }
        },


        uploadAuxImage(state, action) {
            const itemIdx =  state.items.findIndex(item => item._id === action.payload._id)
            if(itemIdx !== -1) {
                state.items[itemIdx].auxImgs = action.payload.auxImgs;
            }
        },

        deleteAuxImage(state, action) {
            const itemIdx =  state.items.findIndex(item => item._id === action.payload._id)
            if(itemIdx !== -1) {
                state.items[itemIdx].auxImgs = action.payload.auxImgs;
            }
        },

        deletePortItem(state, action) {
            const itemIdx =  state.items.findIndex(item => item._id === action.payload._id)
            if(itemIdx !== -1) {
                state.items.splice(itemIdx, 1);
            }
            
        },
        

        createPortfolioItem(state, action) {
          // insert a new portfolio item

        },

        togglePublished(state, action) {
            const itemIdx = state.items.findIndex(item => item._id === action.payload._id)
            if(itemIdx !== -1) {
                state.items[itemIdx].published = action.payload.published;
            }
            

        }

    }
})

const {actions, reducer} = portSlice;





export const {
    loadPortfolio, 
    updatePortItem, 
    deletePortItem, 
    createPortfolioItem,
    togglePublished,
    loadPortCats,
    updatePortfolioDisplayOrder,
    deleteAuxImage,
    uploadAuxImage,
    updatePreviewImage
} = actions;

export default reducer; 