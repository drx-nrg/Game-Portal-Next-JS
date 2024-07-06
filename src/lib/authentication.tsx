import Api from "./axios"

interface Callback{
    onSuccess: (response: any) => void,
    onError: (err: any) => void,
}

export const handleLogout = async ({ onSuccess, onError } : Callback) => {
    try{
        const response = await Api.post('/auth/signout', { username: null }, {
            headers: {
                "Authorization": `Bearer ${localStorage["portalToken"]}`
            }
        });
        if(response.status === 200){    
            onSuccess(response);
        }
    }catch(err){
        onError(err);
    }
}