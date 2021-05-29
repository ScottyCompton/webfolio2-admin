import {createSlice, PayloadAction} from '@reduxjs/toolkit';
//import {RootState} from './appData'


// interfaces

interface CatSortOrder {
    _id: string,
    sortOrder: number,
    catId: string
}

export interface PortfolioCategory {
    _id: string;
    category: string;
    catId: string;
}

export interface PortfolioItem {
    _id: string;
    published: boolean;
    auxImgs: string[];
    githubUrl: string;
    longDesc: string;
    shortDesc: string;
    projectTitle: string;
    projectUrl: string;
    techSpecs: string;
    previewImg: string;
    auxImgAspectRatio:string;
    cso: CatSortOrder[];
}

export interface SortablePortfolioItem extends PortfolioItem {
    sortOrder: number;
}

interface PortfolioState {
    items: PortfolioItem[];
    categories: PortfolioCategory[]
}



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
    loadPortCats
} = actions;

export default reducer; 