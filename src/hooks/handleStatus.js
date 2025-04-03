//Handle Response
export function responseStatus(response,data=null){

    let result = { success : false, message : 'No Response'};

    if(!response) return result;

    switch (response.status) {
        case 200:   //HttpStatus.OK
        case 201:   //HttpStatus.CREATED
        case 202:   //HttpStatus.ACCEPTED
            result = { 
                status: 299,
                success : true, 
                message : response.data?.stateMessage || 'Succesful'
            };  
            break; 
        case 204:   //HttpStatus.NO_CONTENT
            result = { 
                status: 204,
                success : true, 
                message : response.data?.stateMessage || 'No Data'
            };  
            break; 
        case 209:   //HttpStatus.CREATED
            result = { 
                status: 209,
                success : true, 
                message : response.data?.stateMessage || 'Created'
            };  
            break; 
        default:
            result = { 
                status: 999,
                success : false, 
                message : response.data?.error || `Unexpected Error: ${response.status}`
            };
            break; 
    }
    return addData(result,data);
}

//Handle Response Error Status
export function errorStatus(error){

    let result = { success : false, message : 'Internal Server Error. Please try again later'};
    if(!error || !error.response) return result;

    switch(error.response.status){
        case 400:   //HttpStatus.BAD_REQUEST
            result = { 
                status: 400,
                success : false, 
                message : error.response.data?.error || 'Bad Request'
            };
            break; 
        case 401:   //HttpStatus.UNAUTHORIZED
            result = { 
                status: 401,
                success : false, 
                message : error.response.data?.error || 'Unauthorized'
            };
            break; 
        case 403:   //HttpStatus.FORBIDDEN
            result = { 
                status: 403,
                success : false, 
                message : error.response.data?.error || 'Forbidden. You do not have access'
            };
            break; 
        case 404:   //HttpStatus.NOT_FOUND
            result =  { 
                status: 404,
                success : false, 
                message : error.response.data?.error || 'Not Found.'
            }; 
            break; 
        case 409:   //HttpStatus.CONFLICT
            result =  { 
                status: 409,
                success : false, 
                message : error.response.data?.error || 'Already Exists.'
            }; 
            break; 
        case 500:   //HttpStatus.INTERNAL_SERVER_ERROR
            result =  { 
                status: 500,
                success : false, 
                message : error.response.data?.error || 'Internal Server Error. Please try again later'
            }; 
            break; 
        default:   
            result =  { 
                status: 999,
                success : false, 
                message : error.response.data?.error || `An unexpected error occurred. ${error.response.data.error}`
            }; 
            break; 
    }

    return result;
}

//Add to result if data exists
function addData(result,data) {
    return data ? result = { ...result, 'data': data } : result;
}