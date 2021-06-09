export interface PortCatListProps {
    category: PortfolioCategory;
}

export interface PortCatCheckboxProps {
    //csoArray: CatSortOrder[];
    checked: boolean;
    id: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    category: string;
}

export interface CatSortOrder {
    _id?: string,
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

export interface PortfolioEditorProps {
    portfolioId: string;
    location: any;
}

export interface PortfolioAuxImg {
    _id?: string | null | undefined;
    auxImgUrl?: string;
}


export interface NewPortfolioItem {
    projectTitle: string;
    published: boolean;
    cso: CatSortOrder[];

}


export interface PortfolioItem {
    _id: string | null | undefined;
    published: boolean;
    auxImgs: PortfolioAuxImg[];
    githubUrl: string;
    longDesc: string;
    shortDesc: string;
    projectTitle: string;
    projectUrl: string;
    techSpecs: string;
    previewImgUrl: string;
    cso: CatSortOrder[];
    auxImgAspectRatio: string | null;
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

export interface PortfolioImageProps {
    src: string;
    id: string;
    altText?: string;
    style?: any;
    className?: string;
    defaultImg?: string;
}

export interface AppImageProps {
    src: string;
    id: string;
    altText?: string;
    style?: any;
    className?: string;
    defaultImg?: string;
}



export interface SliderImage {
    _id: string;
    src: string;
    orientation: string;
    displayOrder: number;
    isForeground: boolean;

}
