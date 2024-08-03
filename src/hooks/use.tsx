import Api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

interface FetchConfig{
    uri: string,
    contentType?: string,
    authToken?: string,
}

interface SubmitConfig extends FetchConfig{
    method: string,
    body: any
}

interface FetchAlternate{
    method: string,
    uri: string,
    id: number,
    key?: string,
    callback: React.Dispatch<React.SetStateAction<any>>,
    onUnauthorized: () => void
    onError: (error: any) => void
}

export const useSubmit = ({ onSuccess, onError }: any) => useMutation({
    mutationFn: async ({ uri, method, contentType, authToken, body }: SubmitConfig) => {
        const formData = new FormData();
        for(const key in body){
            formData.append(key, body[key]);
        }
        if(method === "POST"){
            return await Api.post(uri, formData, {
                headers: {
                    "Content-Type": contentType ? contentType : "application/json",
                    "Authorization": `Bearer ${authToken}`
                }
            });
        }else if(method === "PUT"){
            return await Api.put(uri, formData, {
                headers: {
                    "Content-Type": contentType ? contentType : "application/json",
                    "Authorization": `Bearer ${authToken}`
                }
            });
        }
    },
    onSuccess,
    onError
});

export const useFetchData = ({ queryKey, uri, contentType, authToken }: any) => useQuery({
    queryFn: async () => {
        const response = await Api.get(uri, {
            headers: {
                "Content-Type": contentType ? contentType : "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });
        return response.data
    },
    queryKey: ['data', queryKey],
});

export const useFetch = async ({ method, uri, id, key, callback, onUnauthorized, onError } : FetchAlternate) => {
    try{
        const response = await Api.get(method === "index" ? `${uri}` : `${uri}/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage["portalToken"]}`
            }
        });
        console.log(uri)
        callback(() => {
            if(!key){
                return response.data;
            }
            return response.data[key];
        });
    }catch(error: any){
        if(error.response.status === 401){
            onUnauthorized();
        }else{
            onError(error);
        }

    }
}