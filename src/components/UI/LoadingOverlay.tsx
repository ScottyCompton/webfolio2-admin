import {useAppSelector} from '../../hooks/redux-hooks';

const LoadingOverlay:React.FC = (props) => {

    const loading = useAppSelector(state => state.ui.isLoading);
    let loadingOverlayClassName = ''

    if (loading) {
        loadingOverlayClassName = 'loading-overlay  loading-overlay--loading'
    } else {
        loadingOverlayClassName = 'loading-overlay'
    }

    return (
        <div className={loadingOverlayClassName}>
            <div className="loading-overlay__inner">
                <img src="../dist/images/spinner.gif" className="loading-overlay__spinner" alt=""/>
            </div>            
        </div>
    )
}

export default LoadingOverlay;