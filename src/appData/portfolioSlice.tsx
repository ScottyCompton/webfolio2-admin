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
            // saves changes to the portfoli item
            
        },

        deletePortItem(state, action) {
            // delete a portfolio item
            
        },
        

        createPortfolioItem(state, action) {
          // insert a new portfolio item

        },

        togglePublished(state, action) {
            // toggles the published state of a portflio item
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
    updatePortfolioDisplayOrder
} = actions;

export default reducer; 