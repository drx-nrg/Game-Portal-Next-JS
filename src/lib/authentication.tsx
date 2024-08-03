import Swal from "sweetalert2";
import Api from "./axios"
import { useRouter } from "next/navigation";

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

export const handleUnauthorizedUser = (router: any) => {
    Swal.fire({
        title: "Error!",
        text: "Session token has expired",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: true
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem("portalToken");
            router.push('/auth/signin');
        }
    });
}