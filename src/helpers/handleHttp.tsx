
const rootUrl = 'http://127.0.0.1:3000/'



export const getData = async (endpoint:string) => {
    const response = await fetch(rootUrl + endpoint);   // e.g. http://mydata.xyz.com/categories
    if(!response.ok) {
        throw new Error('Could not execute getData');
    }
    const data = await response.json();
    return data;
}


// works for POST, PATCH, AND PUT
export const putData = async (endpoint:string, body: any, method:string = 'POST') => {
    const config = {   
        method: method ? method: 'POST', 
        body: body ? JSON.stringify(body): null,
        headers: [
            ['Content-Type', 'application/json'],
            ['Authorization', 'Bearer ' + localStorage.getItem('jwt')]
        ]
    };

    const response = await fetch(rootUrl + endpoint, config);
    
    if(!response.ok) {
        const errorObj = {
            status: response.status,
            message: response.statusText,
            body,
            endpoint,
            method
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