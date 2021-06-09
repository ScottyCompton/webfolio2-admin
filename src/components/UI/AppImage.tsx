import {AppImageProps} from '../../interfaces';

const AppImage:React.FC<AppImageProps> = (props) => {
    const {src, id, altText = "", style={}, className="", defaultImg="../dist/images/blank_img.jpg"} = props;
        let imgSrc = src;

        if(src) {
            if(!src.match(/^(http|https):\/\//))  {
                // match means this is legacy data 
                imgSrc = process.env.REACT_APP_API_ROOT + src;
            }    
        } else {
            imgSrc = defaultImg;
        }

        return (
            <img src={`${imgSrc}`} id={id} alt={altText} style={style} className={className} />
        )

}

export default AppImage;