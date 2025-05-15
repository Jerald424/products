import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"
import { useState } from "react";
import Toast from "react-native-toast-message";
import showToast from "../../../functions/showToast";

const fetchProducts =async ()=>{
    const response = await axios.get('https://fakestoreapi.com/products')
    return response;
};

const deleteProduct = async({id})=>{
    const response = await axios.delete(`https://fakestoreapi.com/products/${id}`)
    return response;
}

export default function useList(){
    const [isSelected, setIsSelected] = useState();

    const {data, isPending,refetch  ,error} = useQuery({queryKey:['get/products'], queryFn:fetchProducts});
    const {mutate:deleteProductMutate, isPending:isLoadingDelete} = useMutation({mutationKey:['delete/product'], mutationFn:deleteProduct})

    const onDelete = ()=>{
        deleteProductMutate({id:isSelected}, {
            onSuccess(){
                showToast({
                    type:"success",
                    text1:"Product deleted successfully"
                })
            },
            onError(){
                  showToast({
                    type:"error",
                    text1:"Something went wrong"
                })
            },
            onSettled(){
                refetch();
                setIsSelected(false)
            }
        })
    }

    return {data, isPending, error, refetch, isSelected, setIsSelected,onDelete, isLoadingDelete }
}