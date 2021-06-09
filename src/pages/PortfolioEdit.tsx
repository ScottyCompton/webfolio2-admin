import {Row, Col, Container, Tabs, Tab} from 'react-bootstrap';
import {useAppSelector, useAppDispatch} from '../hooks/redux-hooks';
import React, {useState, useRef, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory, withRouter } from "react-router-dom";
import PortCatCheckbox from '../components/UI/PortCatCheckbox';
import {appIsLoading} from '../appData/uiSlice';
import {
    portfolioActions_togglePublished, 
    portfolioActions_updatePortItem, 
    portfolioActions_deletePortItem,
    portfolioActions_deleteAuxImage,
    portfolioActions_uploadAuxImage,
    portfolioActions_uploadPreviewImage,
    portfolioActions_loadCategoryData,
    portfolioActions_loadPortfolioData
    } from '../appData/portfolioActions';
import { PortfolioItem, PortfolioAuxImg, PortfolioEditorProps } from '../interfaces';
import AppImage from '../components/UI/AppImage';





const PortfolioEdit:React.FC<PortfolioEditorProps|any> = (props) => {
    const {location} = props;
    const portfolioId = location.pathname.split('/')[2];

    const portItem = useAppSelector(state => state.portfolio.items.find(item => item._id === portfolioId));
    const portCats = useAppSelector(state => state.portfolio.categories);

    const dispatch = useAppDispatch();
    const auxImgDataRef = useRef<HTMLInputElement>(null);

    const [auxImgDataVal, setAuxImgDataVal] = useState('');
    const previewImgDataRef = useRef<HTMLInputElement>(null);
    
    const [previewImgDataVal, setPreviewImgDataVal] = useState('');
    const history = useHistory();

    const getPortItemObj = () => {
        return (
            {
                _id: portItem ? portItem._id : null,
                projectTitle: portItem ? portItem.projectTitle : '',
                shortDesc: portItem ? portItem.shortDesc: '',
                longDesc: portItem ? portItem.longDesc : '',
                techSpecs : portItem ? portItem.techSpecs : '',
                cso: portItem ? portItem.cso : [],
                projectUrl: portItem ? portItem.projectUrl : '',
                githubUrl: portItem ? portItem.githubUrl : '',
                previewImgUrl: portItem ? portItem.previewImgUrl : 'dist/images/blank_img.jpg',
                published: portItem ? portItem.published : false,
                auxImgAspectRatio: portItem ? portItem.auxImgAspectRatio : null,
                auxImgs: portItem ?  portItem.auxImgs : []
            }
        )
    }


    const [portItemState, setPortItemState] = useState(getPortItemObj());

    
    // if the page refresheds the portfolo needs to be reloaded for some reason...
    useEffect(() => {

        if (!portCats || portCats.length === 0) {
            dispatch(portfolioActions_loadCategoryData(null))
            .then(() => {
                dispatch(portfolioActions_loadPortfolioData())
            }).then(() => {
//                dispatch(appIsLoaded());
            })          
        }
    }, [dispatch, portCats])     



    useEffect(() => {
        const reloadPortfolioItem = async () => {
            setPortItemState(getPortItemObj())
        }

        if(portItem === undefined && portItemState._id === null) {
            dispatch(appIsLoading())
        }

        if (portItem !== undefined && portItemState._id === null) {
            reloadPortfolioItem();

        }

    })



    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(portItem) {

            dispatch(portfolioActions_updatePortItem(portItemState, setPortItemState));
            alert('Portfolio Item saved!')
        }        

    }

    const handleSetAuxImgUploadData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        auxImgDataRef?.current?.click();        
    }



    const handleAuxImgUploadChange = (e: any) => {
        const formData = new FormData();
        const imgData = e.target?.files[0]
        const updateAuxImages = (retval: PortfolioAuxImg[]) => {
            setPortItemState((prevState) => {
                return ({
                    ...prevState,
                    auxImgs: retval
                })
            })
        }

        if(imgData !== '') {
            formData.append( 
              "auxImgData", 
              imgData
            ); 

            dispatch(portfolioActions_uploadAuxImage(portfolioId, formData, updateAuxImages)).then(() => {

            }).catch((error) => {
                console.log(error);
            });
            setAuxImgDataVal('');
        }
    }   


    const handleTextUpdate = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        const elem = e.target.id;
        setPortItemState((prevState) => {
            return (
                {
                    ...prevState,
                    [elem] : val
                }
            )
        })
    }

    const togglePublished = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(portItem) {

            const updatePublishedState = (retval:PortfolioItem) => {
                setPortItemState((prevState) => {
                    return ({
                        ...prevState,
                        published: retval.published
                    })
                })
            }

            dispatch(portfolioActions_togglePublished(portItemState._id!, updatePublishedState));
        }
    }

    const portCatSelects = () => {
        return (
            portCats && portCats.map((cat) => {
                const checked = portItemState.cso.findIndex((cso) => cso.category_id === cat._id) !== -1
                return (
                    <div className="form-check form-switch" key={uuidv4()}>
                        <PortCatCheckbox onChange={togglePortCat} id={cat._id} checked={checked} category={cat.category} />
                    </div>
                )
            })
        )
    }

    
    const togglePortCat = (e: React.ChangeEvent<HTMLInputElement>) => {
        const category_id = e.target.id;


        const updatedState = portItemState;
        const csoArray = updatedState.cso.slice();
        let csoIdx = csoArray.findIndex(csoItem => csoItem.category_id === category_id)

        if(csoIdx === -1) {
            // doesn't exist - add it
            const displayOrder = 0
            csoArray.push({
                category_id,
                displayOrder
            })

        } else {
            if(csoArray.length === 1)  {
                alert('You must have at least one category selected');
                e.target.checked = true
            } else {
                // exists - remove it
                csoArray.splice(csoIdx,1);
            }
        }
        setPortItemState((prevState) => {
            return (
                {
                    ...prevState,
                    cso: csoArray
                }
            )
        });

    }


    const handlePreviewAuxImgClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLButtonElement;
        const btnId = target.id!;
        const auxImgId = btnId.replace('auximg_preview_','');

        const imgSrc = document.getElementById(`auximg_${auxImgId}`)!.getAttribute('src')!;
        window.open(imgSrc);

    }


    const handleDeleteAuxImgClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLButtonElement;
        const btnId = target.id!;
        const auxImgId = btnId.replace('auximg_delete_','');
        const c = window.confirm('Are you sure you want to delete this image?');

        const updateAuxImages = (retval: PortfolioAuxImg[]) => {
            setPortItemState((prevState) => {
                return ({
                    ...prevState,
                    auxImgs: retval
                })
            })
        }


        if(c) {
            dispatch(portfolioActions_deleteAuxImage(portItemState._id!, auxImgId, updateAuxImages));
        }
        return false;
    }




    const handleSetPreviewImgUploadData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        previewImgDataRef?.current?.click();
    }

    const handlePreviewImgUploadChange = (e:any) => {
        const formData = new FormData();
        const imgData = e.target?.files[0]
        const updatePreviewImgUrl = (retval: string) => {
            setPortItemState((prevState) => {
                return ({
                    ...prevState,
                    previewImgUrl: retval
                })
            })
        }

        if(imgData !== '') {
            formData.append( 
              "previewImgData", 
              imgData
            ); 

            dispatch(portfolioActions_uploadPreviewImage(portfolioId, formData, updatePreviewImgUrl))
            .catch((error) => {
                console.log(error);
            });
            setPreviewImgDataVal('');
        }

    }


    const handleDeletePortfolioClick = () => {
        const c = window.confirm('WARNING! You are about to permanantly delete this portfolio item.\n\n Are you sure?');

        if(c) {
            dispatch(portfolioActions_deletePortItem(portfolioId)).then(() => {
                alert('Portfolio item deleted.')
                history.push('/');
            })
        }
    }


    return (
        <Container>
            <form id="frmPortfolio" onSubmit={handleSubmit}>
            <Row>
                <Col xs="8">
                <div className="card bg-secondary mb-3">
                    <div className="card-header text-white">
                        {portItem && <h4 className="float-left">Edit Portfolio Item</h4>}
                        <div className="form-group float-right text-white">
                            {(!portItem || !portItemState.published) && <><span>This Item Is Unpublished</span> <button type="button" onClick={togglePublished} className="btn btn-success btn-sm">Publish</button></>}
                            {(portItem && portItemState.published) && <><span>This Item Is Published</span> <button type="button" onClick={togglePublished} className="btn btn-danger btn-sm">Unublish</button></>}
                        </div>

                    </div>

                    <div className="card-body text-white">

                        <div className="form-group">
                                <label htmlFor="projectTitle" className="col-form-label">Project Title</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="projectTitle" value={portItemState.projectTitle} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="shortDesc" className="col-form-label">Project Summary</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="shortDesc" value={portItemState.shortDesc} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="longDesc" className="col-form-label">Long Description</label>
                                <div className="col-12-xs">
                                    <textarea className="form-control" rows={10} onChange={handleTextUpdate}  id="longDesc" value={portItemState.longDesc} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="techSpecs" className="col-form-label">Technologies Used</label>
                                <div className="col-12-xs">
                                    <textarea  className="form-control" rows={4} onChange={handleTextUpdate} id="techSpecs" value={portItemState.techSpecs} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="projectUrl" className="col-form-label">Project URL</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="projectUrl" value={portItemState.projectUrl} />
                                </div>
                            </div>


                            <div className="form-group">
                                <label htmlFor="githubUrl" className="col-form-label">GitHub URL</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="githubUrl" value={portItemState.githubUrl} />
                                </div>
                            </div>


                    </div>
                </div>                    
                </Col>
                <Col xs="4">
                    <Tabs defaultActiveKey="mainImg" id="portItemSidebar"> 
                        <Tab key={uuidv4()} eventKey="mainImg" title="Main Image">
                            <div className="card bg-dark mb-3">
                                <div className="card-header text-white">
                                    <div className="portfolio-edit-mainimg__btn--addedit-container"><button type="button" id="addEditMainImg" onClick={handleSetPreviewImgUploadData} className="float-right portfolio-edit-mainimg__btn portfolio-edit-mainimg__btn--addedit btn btn-success btn-sm ">Replace Main Image</button></div>
                                </div>
                                <div className="card-body">
                                    { <AppImage  
                                        id={`previewimg_${portItemState._id}`}
                                        src={portItemState.previewImgUrl}
                                        style={{width: '100%', height: 'auto'}} /> }
                                </div>
                            </div>

                        </Tab>
                        <Tab key={uuidv4()} eventKey="auxImgs" title="Aux Images">
                            <div className="card bg-dark mb-3">
                                <div className="card-header text-white">
                                    <button type="button" id="addAuxImg" onClick={handleSetAuxImgUploadData} className="float-right portfolio-edit-auximg__btn portfolio-edit-auximg__btn--addnew btn btn-success btn-sm ">Upload Aux Image</button>
                                </div>

                                <div className="card-body portfolio-edit-auximg__card-body">

                                    <Container className="portfolio-edit-auximg__container">
                                    {portItemState.auxImgs.map((img, index) => {
                                        return (
                                        <Row key={uuidv4()} className={`portfolio-edit-auximg__row`}>
                                            <Col xs="8">
                                            {(img._id && img.auxImgUrl) && <AppImage
                                                    id={`auximg_${img._id}`}
                                                    src={img.auxImgUrl}
                                                    className="portfolio-edit-auximg__img"
                                                    />}
                                            </Col>
                                            <Col xs="2"><button type="button" id={`auximg_preview_${img._id}`} onClick={handlePreviewAuxImgClick} className="portfolio-edit-auximg__btn btn btn-primary btn-sm ">Preview</button></Col>
                                            <Col xs="2"><button type="button" id={`auximg_delete_${img._id}`} onClick={handleDeleteAuxImgClick} className="portfolio-edit-auximg__btn btn btn-danger btn-sm">Delete</button></Col>
                                        </Row>
                                        )
                                    })}
                                    </Container>
                                    <Container>
                                    <Row>
                                            <Col xs="12">
                                                <div  className="float-right"><label className="text-white" htmlFor="auxImgAspectRatio">Aspect Ratio:</label><input type="text" id="auxImgAspectRatio" className="portfolio-edit-auximg__aspect-ratio" value={portItemState.auxImgAspectRatio?.toString()} onChange={handleTextUpdate} /></div>
                                            </Col>
                                        </Row>

                                    </Container>
                                </div>
                            </div>
                        </Tab>

                        <Tab key={uuidv4()} eventKey="portCats" title="Categories">
                            <div className="card bg-dark mb-3">
                                <div className="card-header text-white">
                                    Portfolio Categories
                                </div>
                                <div className="card-body text-white">
                                    <fieldset>
                                            {portCatSelects()}
                                    </fieldset>
                                </div>
                            </div>

                        </Tab>
                    </Tabs>


                    <div className="form-group">
                        <div className="col-12-xs">
                            {portItem && <button type="submit" className="btn btn-success form-control">Update Portfolio Item</button>}
                            {!portItem && <button  type="submit" className="btn btn-success form-control">Create Portfolio Item</button>}
                        </div>
                        <div className="col-12-xs">
                            <label>&nbsp;</label>
                            {portItem && <button className="btn btn-danger form-control" type="button" onClick={handleDeletePortfolioClick}>Delete Portfolio Item</button>}
                        </div>
                    </div>

                </Col>                
            </Row>
            </form>
            <form encType="multipart/form-data" id="frmImgUpload">
            <input type="file" id="auxImgData" ref={auxImgDataRef} value={auxImgDataVal} onChange={handleAuxImgUploadChange} style={{display:'none'}}/>
            <input type="file" id="previewImgData" ref={previewImgDataRef} value={previewImgDataVal} onChange={handlePreviewImgUploadChange} style={{display:'none'}}/>
            </form>
        </Container>
        
    );
}

export default withRouter(PortfolioEdit);