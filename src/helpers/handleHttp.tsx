
const rootUrl = process.env.REACT_APP_API_ROOT;

export interface PutDataConfiguration {
    method?: string;
    contentType?: string;
    body?:any;
}

export const getData = async (endpoint:string) => {
    const response = await fetch(rootUrl + endpoint);   // e.g. http://mydata.xyz.com/categories
    if(!response.ok) {
        console.log({status: response.status, message: 'Could not execute getData', url: rootUrl});
        throw new Error('Could not execute getData');
    }
    const data = await response.json();
    return data;
}


// works for POST, PATCH, DELETE AND PUT
export const putData = async (endpoint:string, cfg:PutDataConfiguration) => {

    const configData = {   
        method: cfg.method ? cfg.method: 'POST', 
        body: cfg.body ? JSON.stringify(cfg.body) : null,
        headers: [
            ['Authorization', 'Bearer ' + localStorage.getItem('jwt')]
        ]
    };

    // taking into account the differences between an image upload and a regular POST or whatever...
    if (cfg.contentType !== 'none') {
        configData.headers.push(
            ['content-type', cfg.contentType ? cfg.contentType : 'application/json'],
        )
    } else {
        configData.body = cfg.body;
    }


    const response = await fetch(rootUrl + endpoint, configData);
    
    if(!response.ok) {
        const errorObj = {
            status: response.status,
            message: response.statusText,
            putConfig: cfg
        }
        console.log(errorObj)
        throw new Error('Could not execute postData');
    }

    const data = await response.json();
    return data;    
}



export const deleteData = async (endpoint:string) => {
    const response = await fetch(rootUrl + endpoint, { // e.g. http://mydata.xyz.com/deletecat/123456
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });   

    if(!response.ok) {
        const errorObj = {
            status: response.status,
            message: response.statusText,
            endpoint,
        }
        console.log(errorObj);
        throw new Error('Could not execute deleteData');
    }
    const data = await response.json();
    return data;
}