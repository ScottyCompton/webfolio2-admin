import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import {useState, useEffect, useRef} from 'react';
import {getData, putData} from '../helpers/handleHttp';
import AppImage from '../components/UI/AppImage';
import {v4 as uuidv4} from 'uuid';


const SettingsEdit:React.FC = () => {
    
    const sliderImgDataRef = useRef<HTMLInputElement>(null);
    const aboutImgDataRef = useRef<HTMLInputElement>(null);
    const [sliderImgDataVal, setSliderImgDataVal] = useState('');
    const [aboutImgDataVal, setAboutImgDataVal] = useState('');
    const [sliderImgOrientation, setSliderImgOrientation] = useState('landscape');


    const [sliderImgs, updateSliderImgs ] = useState([{
        _id: '',
        sliderImgUrl: '',
        orientation: '',
        displayOrder: 0,
        isForeground: false
    
    }])

    const [settings, updateSettings] = useState(
        {
            aboutBlurb: '',
            aboutImgUrl: '',
            aboutTitle: '',
            contactEmail: '',
            contactPhone: '',
            facebookId: '',
            githubId: '',
            instagramId: '',
            linkedinUsername: '',
            resumeUrl: '',
            skypeId: '',
            siteTitle: '',
            twitterHandle: '',
            youTubeId: ''
        }
    );

    // load the general settings
    useEffect(() => {
        getData('settings').then((retval) => {
            updateSettings(retval)
        });

    }, [])


    // load the slider images
    useEffect(() => {
        getData('sliderimgs').then((retval) => {
            updateSliderImgs(retval)
        });

    }, [])


    const handleSetIsForeground = (e:React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLButtonElement;
        const btnId = target.id!;
        const imgId = btnId.replace('isForeground_','');

        const putConfig = {
            method: 'PATCH'                    
        }
        
        putData(`sliderimgs/${imgId}`, putConfig).then((retval) => {
            updateSliderImgs(retval)
        });

    }

    const handlePreviewImgClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLButtonElement;
        const btnId = target.id!;
        const imgId = btnId.replace('btn-preview_','');

        const imgSrc = document.getElementById(imgId)!.getAttribute('src')!;
        window.open(imgSrc);

    }

    const handleDeleteSliderImgClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLButtonElement;
        const btnId = target.id!;
        const imgId = btnId.replace('btn-delete_','');

        const c = window.confirm('You are about to delete this slider image.\n\nAre you sure?');

        if(c) {
            const putConfig = {
                method: 'DELETE'                    
            }
            
            putData(`sliderimgs/${imgId}`, putConfig).then((retval) => {
                updateSliderImgs(retval)
            });
        }

    }


    const  handleMoveSliderImg = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLButtonElement;
        const btnId = target.id!;
        const aryParams = btnId.split('_');

        const putConfig = {
            method: 'PUT'                    
        }
        
        putData(`sliderimgs/${aryParams[1]}/${aryParams[0]}`, putConfig).then(async (retval) => {
            await updateSliderImgs((prevState) => {
                return retval
            })
        });
    }


    const handleUploadSliderImgClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        sliderImgDataRef?.current?.click();        
    }

    const handleSliderImgUploadChange = (e:any) => {
        const formData = new FormData();
        const imgData = e.target?.files[0]

        // const reloadSliderImgs = (retval: PortfolioSliderImg[]) => {
        //     updateSliderImgs((prevState) => {
        //         return ()
        //     })
        // }

        if(imgData !== '') {
            formData.append( 
              "sliderImgData", 
              imgData
            ); 
         
            const putConfig = {
                method: 'POST',
                contentType: 'none',
                body: formData
            }

            putData(`sliderimgs/${sliderImgOrientation}`, putConfig).then((retval) => {
                updateSliderImgs(retval);
            })
            .catch((error) => {
                console.log(error);
            });
            setSliderImgDataVal('');
        }
        

    }


    const handleUploadAboutImgClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        aboutImgDataRef?.current?.click();        
    }

    const handleAboutImgUploadChange = (e:any) => {
        const formData = new FormData();
        const imgData = e.target?.files[0]

        const updateAboutImgUrl = (retval: string) => {
            updateSettings((prevState) => {
                return ({
                    ...prevState,
                    aboutImgUrl: retval
                })
            })
        }
    
        if(imgData !== '') {
            formData.append( 
              "aboutImgData", 
              imgData
            ); 

            const putConfig = {
                method: 'POST',
                body: formData,
                contentType: 'none'
            };                

            putData('settings/aboutimg', putConfig).then((retval) => {
                updateAboutImgUrl(retval.aboutImgUrl)
            }).catch((error) => {
                console.log(error);
            });

            setAboutImgDataVal('')
        }
    }

    const handleToggleOrientation = () => {
        setSliderImgOrientation((currVal) => {
            return currVal === 'portrait'? 'landscape' : 'portrait';
        })
    }



    const handleSaveSettings = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const putConfig = {
            method: 'POST',
            body: settings
        };

        putData('settings', putConfig).then(() => {
            alert('Settings Updated!')
        })
    }


    const sliderImages = () => {
         //const limit = filteredImgs.length-1;
        const filteredImgs = sliderImgs.filter(x => x.orientation === sliderImgOrientation);

        const sorted = filteredImgs.sort((a, b) => {
            if(a.displayOrder < b.displayOrder) {
                return -1;
            }
            if(a.displayOrder > b.displayOrder) {
                return 1;
            }
            return 0;
        })

        return (
            sorted.map((img, index) => {
                return (
                    <Row className="settings-sliderimgs__row" key={uuidv4()}>
                        <Col xs="1">
                            <input type="radio" className="settings-sliderimgs__radio" name="rdoForegroundImage" id={`isForeground_${img._id}`} onChange={handleSetIsForeground} checked={img.isForeground} />
                        </Col>
                        <Col xs="3">
                            <AppImage 
                            src={img.sliderImgUrl}
                            id={img._id}
                            className={`settings-sliderimgs__img--${sliderImgOrientation}`} />
                        </Col>
   
                        <Col xs="3">
                            {index !== filteredImgs.length-1 && <div className="settings-sliderimgs__sort-arrow-container"><button  className="text-primary settings-sliderimgs__sort-arrow-button" type="button" title="Move Down" onClick={handleMoveSliderImg} id={`${img._id}_movedown`} >6</button></div>}
                            {index !== 0 && <div className="settings-sliderimgs__sort-arrow-container"><button  className="text-primary settings-sliderimgs__sort-arrow-button" type="button" title="Move Up" onClick={handleMoveSliderImg} id={`${img._id}_moveup`} >5</button></div>}
                        </Col>
                        <Col xs="2"><button type="button" id={`btn-preview_${img._id}`} className="btn btn-primary btn-sm settings-sliderimgs__btn" onClick={handlePreviewImgClick}>Preview</button></Col>
                        <Col xs="2"><button type="button" id={`btn-delete_${img._id}`} className="btn btn-danger btn-sm settings-sliderimgs__btn" onClick={handleDeleteSliderImgClick}>Delete</button></Col>
                    </Row>
                )
            })
        )                                            

    }




    const handleTextUpdate = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        const elem = e.target.id;
        updateSettings((prevState) => {
            return (
                {
                    ...prevState,
                    [elem] : val
                }
            )
        })
    }


    return (
        <Container>
            <form id="frmSettings" onSubmit={handleSaveSettings}>
            <Row>
                <Col xs="8">
                    
                    <div className="card bg-secondary mb-3">
                        <div className="card-header text-white">
                            <h4>Edit General Settings</h4>
                        </div>
                        <div className="card-body text-white">
                        <div className="form-group">
                                <label htmlFor="siteTitle" className="col-form-label">Site Title</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="siteTitle" value={settings.siteTitle} />
                                </div>
                            </div>

    
                            <div className="form-group">
                                <label htmlFor="aboutTitle" className="col-form-label">About Title</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="aboutTitle" value={settings.aboutTitle} />
                                </div>
                            </div>


                            <div className="form-group">
                                <label htmlFor="aboutBlurb" className="col-form-label">Homepage "About" Blurb</label>
                                <div className="col-12-xs">
                                    <textarea className="form-control" rows={10} onChange={handleTextUpdate} id="aboutBlurb" value={settings.aboutBlurb} />
                                </div>
                            </div>                            

                            <div className="form-group">
                                <label htmlFor="contactEmail" className="col-form-label">Contact Email</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="contactEmail" value={settings.contactEmail} />
                                </div>
                            </div>



                            <div className="form-group">
                                <label htmlFor="contactPhone" className="col-form-label">Contact Phone</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="contactPhone" value={settings.contactPhone} />
                                </div>
                            </div>




                            <div className="form-group">
                                <label htmlFor="resumeUrl" className="col-form-label">Resume Url</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="resumeUrl" value={settings.resumeUrl} />
                                </div>
                            </div>


                            <div className="form-group">
                                <label htmlFor="githubId" className="col-form-label">Github Url</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="githubId" value={settings.githubId} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="facebookId" className="col-form-label">Facebook Id</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="facebookId" value={settings.facebookId} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="linkedinUsername" className="col-form-label">LinkedIn Username</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="linkedinUsername" value={settings.linkedinUsername} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="instagramId" className="col-form-label">Instagram Id</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="instagramId" value={settings.instagramId} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="skypeId" className="col-form-label">Skype Id</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="skypeId" value={settings.skypeId} />
                                </div>
                            </div>


                            <div className="form-group">
                                <label htmlFor="twitterHandle" className="col-form-label">Twitter Handle</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="twitterHandle" value={settings.twitterHandle} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="youTubeId" className="col-form-label">YouTube Id</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="youTubeId" value={settings.youTubeId} />
                                </div>
                            </div>

                        </div>
                    </div>
                </Col>
                <Col xs="4">
                    <Tabs defaultActiveKey="aboutImg" id="settingImages"> 
                        <Tab key={uuidv4()} eventKey="aboutImg" title="About Image">
                        <div className="card bg-secondary mb-3">
                                <div className="card-body">
                                    { <AppImage  
                                        id="aboutImg"
                                        src={settings.aboutImgUrl}
                                        style={{width: '100%', height: 'auto'}} /> }
                                </div>
                            </div>
                            <div className="settings-aboutimg__btn--addedit-container"><button type="button" id="addEditAboutImg" onClick={handleUploadAboutImgClick} className="float-right settings-aboutimg__btn  settings-aboutimg__btn--addedit btn btn-success btn-sm ">Replace About Image</button></div>
                        
                        </Tab>
                        <Tab key={uuidv4()} eventKey="heroSlider" title="Hero Slider">
                            <div className="card bg-dark mb-3">
                                <div className="card-header text-white">
                                    <div className="settings-sliderimgs__btn-orientation-container"><span className={`settings-sliderimgs__btn-orientation-text--${sliderImgOrientation}`}>Orientation:</span> <div onClick={handleToggleOrientation} className={`btn btn-primary settings-sliderimgs__btn-orientation settings-sliderimgs__btn-orientation--${sliderImgOrientation}`}>&nbsp;</div></div>
                                </div>
                                <div className="card-body text-white settings-sliderimgs__card-body">
                                    <Container className="settings-sliderimgs__container">
                                        {
                                           sliderImages()
                                        }
                                        </Container>
                                </div>
                            </div>
                            <div className="settings-sliderimgs__btn--addedit-container"><button type="button" id="uploadSliderImg" onClick={handleUploadSliderImgClick} className="float-right settings-sliderimgs__btn  settings-sliderimgs__btn--addnew btn btn-success btn-sm ">Upload Hero Image</button></div>

                        </Tab>
                    </Tabs>


                    <div className="form-group">
                        <button type="submit" id="btnSaveSettings" className="btn btn-success form-control">Save Settings</button>
                    </div>

                </Col>
            </Row>
            </form>
            <form encType="multipart/form-data" id="frmImgUpload">
            <input type="file" id="sliderImgData" ref={sliderImgDataRef} value={sliderImgDataVal} onChange={handleSliderImgUploadChange} style={{display:'none'}}/>
            <input type="file" id="aboutImgData" ref={aboutImgDataRef} value={aboutImgDataVal} onChange={handleAboutImgUploadChange} style={{display:'none'}}/>
            </form>

        </Container>
    )
}

export default SettingsEdit;