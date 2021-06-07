export interface PortfolioImageProps {
    src: string;
    id: string;
    altText?: string;
    style?: any;
    className?: string;
}


const PortfolioImage:React.FC<PortfolioImageProps> = (props) => {
    const {src, id, altText = "", style={}, className=""} = props;
        let imgSrc = src;

        if(!src.match(/^(http|https):\/\//))  {
            // match means this is legacy data 
            imgSrc = process.env.REACT_APP_API_ROOT + src;
        }

        return (
            <img src={`${imgSrc}`} id={id} alt={altText} style={style} className={className} />
        )

}

export default PortfolioImage;