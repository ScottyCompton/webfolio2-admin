import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import React, {useState, useEffect, useRef} from 'react';
import {getData, putData} from '../helpers/handleHttp';
import AppImage from '../components/UI/AppImage';
import {v4 as uuidv4} from 'uuid';
import ContactItemForm from '../components/UI/ContactItemForm';
import {ContactItem} from '../interfaces'
import { DefaultEditor as Editor } from 'react-simple-wysiwyg';


const SettingsEdit:React.FC = () => {
    
    const sliderImgDataRef = useRef<HTMLInputElement>(null);
    const aboutImgDataRef = useRef<HTMLInputElement>(null);
    const [sliderImgDataVal, setSliderImgDataVal] = useState('');
    const [aboutImgDataVal, setAboutImgDataVal] = useState('');
    const [useEditor, setUseEditor] = useState(true);
    const [sliderImgOrientation, setSliderImgOrientation] = useState('landscape');


    const [sliderImgs, updateSliderImgs ] = useState([{
        _id: '',
        sliderImgUrl: '',
        orientation: '',
        displayOrder: 0,
        isForeground: false
    
    }])

    const [contactItems, updateContactItems] = useState([
        {
            _id: '',
            name: '',
            displayValue: '',
            linkUrl: '',
            faPrefix: '',
            fontAwesomeIcon: ''
        }
    ])

    const [settings, updateSettings] = useState(
        {
            aboutBlurb: '',
            aboutImgUrl: '',
            aboutTitle: '',
            siteTitle: '',
            resumeUrl: ''
        }
    );

    // load the general settings
    useEffect(() => {
        getData('settings').then((retval) => {
            updateSettings(retval)
        })
    }, [])


    // load the slider images
    useEffect(() => {
        getData('sliderimgs').then((retval) => {
            updateSliderImgs(retval)
        });

    }, [])


    useEffect(() => {
        getData('contactitems').then((retval) => {
                updateContactItems(retval);
        })
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


    const handleContactItemMove = (_id:string, direction:number) => {
        const moveIdx = contactItems.findIndex(item => item._id === _id)

        if(moveIdx !== -1) {
            //updateContactItems((prevState) => {
                const aryItems = contactItems.slice();
                const itemToMove = aryItems.splice(moveIdx, 1)
                aryItems.splice(moveIdx + direction, 0, itemToMove[0]);

                
                const putConfig = {
                    method: 'PATCH',
                    body: aryItems
                };  
        
                putData(`contactitems`, putConfig).then((retval) => {
                    updateContactItems(retval);
                }).catch((error) => {
                    console.log(error);
                });
            //})
        }
    }


    const handleDeleteContactItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLButtonElement;
        const elemId = target?.id;
        const _id = elemId.replace('btnDelete_','');

        const putConfig = {
            method: 'DELETE'
        };  

        putData(`contactitems/${_id}`, putConfig).then((retval) => {
            updateContactItems((prevState) => {
                return (prevState.filter((item:ContactItem) => item._id !== retval._id));                
            }) 
        }).catch((error) => {
            console.log(error);
        });


    }




    const handleCreateContactItem = (contactItem:ContactItem) => {
        
        if(contactItem) {
            const putConfig = {
                method: 'POST',
                body: {
                    name: contactItem.name,
                    displayValue: contactItem.displayValue,
                    linkUrl: contactItem.linkUrl,
                    faPrefix: contactItem.faPrefix,
                    fontAwesomeIcon: contactItem.fontAwesomeIcon
                }
            };  
    
            putData(`contactitems`, putConfig).then((retval) => {
                updateContactItems((prevState) => {
                    return (
                        [...prevState, retval]
                    )
                })
            }).catch((error) => {
                console.log(error);
            });
    
        }

      

    }





    const handleUpdateContactItem = (contactItem:ContactItem) => {
        const _id = contactItem._id;

        if(contactItem) {
            const putConfig = {
                method: 'PUT',
                body: {
                    name: contactItem.name,
                    displayValue: contactItem.displayValue,
                    linkUrl: contactItem.linkUrl,
                    faPrefix: contactItem.faPrefix,
                    fontAwesomeIcon: contactItem.fontAwesomeIcon
                }
            };  
    
            putData(`contactitems/${_id}`, putConfig).then((retval) => {
                alert('Contact item updated');
                // updateContactItems((prevState) => {
                //     return (prevState.filter((item:ContactItem) => item._id !== retval._id));                
                // }) 
            }).catch((error) => {
                console.log(error);
            });
    
        }

      

    }



    const toggleEditor = (e:any) => {
        e.preventDefault();
        setUseEditor(!useEditor);
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


    const handleEditorChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const aboutBlurb = e.target.value;
        updateSettings((prevState) => {
            return (
                {...prevState,
                aboutBlurb}
            )
        })
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
                                    <div><a href="#toggle" className="float-right" onClick={toggleEditor}>Toggle Editor</a></div>
                                    {useEditor && <div style={{width: '100%', float: 'left'}}><Editor  value={settings.aboutBlurb} id="aboutBlurb" onChange={handleEditorChange} /></div>}
                                    {!useEditor && <textarea className="form-control" rows={10} onChange={handleTextUpdate} id="aboutBlurb" value={settings.aboutBlurb} />}
                                </div>
                            </div>                            
							
							
                            <div className="form-group">
                                <label htmlFor="resumeUrl" className="col-form-label">Resume Url</label>
                                <div className="col-12-xs">
                                    <input type="text" className="form-control" onChange={handleTextUpdate} id="resumeUrl" value={settings.resumeUrl} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-form-label">Contact Methods:</label>
                            </div>
                            <Container fluid>
                            {(contactItems && contactItems.length !== 0 )&& contactItems.map((item, index) => {

                                    item.linkUrl = item.linkUrl === null ? '' : item.linkUrl;

                                    return (
                                    <ContactItemForm 
                                        key={uuidv4()} 
                                        {...item} 
                                        handleDelete={handleDeleteContactItem}
                                        handleUpdate={handleUpdateContactItem}
                                        handleMove={handleContactItemMove}
                                        showUpArrow={index !== 0}
                                        showDownArrow={index!== contactItems.length-1}
                                        />                                        
                                )
                            })}
                            
                            </Container>
                            <div className="form-group">
                                <label className="col-form-label">Add another contact method below:</label>
                            </div>
                            <Container fluid>                                                          
                                <ContactItemForm 
                                    handleCreate={handleCreateContactItem} />                                        
                            </Container>

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