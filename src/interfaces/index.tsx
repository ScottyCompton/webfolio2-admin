export interface PortCatListProps {
    category: PortfolioCategory;
}

export interface CatSortOrder {
    _id: string,
    displayOrder: number,
    category_id: string
}

export interface PortfolioCategory {
    _id: string;
    category: string;
    displayOrder: number;
}

export interface PortfolioCatItemProps {
    portfolioItem: PortfolioItem;
    handleMoveUpClick: (displayOrder: number) => void;
    handleMoveDownClick: (displayOrder: number) => void;
    handleEditClick: (_id: string) => void;
    firstRow: boolean;
    lastRow: boolean;
    displayOrder: number;
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
    previewImgUrl: string;
    cso: CatSortOrder[];
}

export interface SortablePortfolioItem extends PortfolioItem {
    displayOrder: number;
}

export interface PortfolioState {
    items: PortfolioItem[];
    categories: PortfolioCategory[]
}

export interface CatSelectProps {
    onChangeHandler: (_id: string) => void;
    catId: string;
}




export interface AuthResultData {
    user: {
        _id: string;
        email: string;
        name: string;
    };
    token: string;
}
