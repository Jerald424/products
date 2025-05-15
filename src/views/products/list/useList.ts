import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"
import { useMemo, useState } from "react";
import Toast from 'react-native-simple-toast';
import { checkValueAreIncludes } from "../../../functions/dataHandle";


const fetchProducts =async ()=>{
    const response = await axios.get('https://fakestoreapi.com/products')
    return response;
};

const deleteProduct = async({id})=>{
    const response = await axios.delete(`https://fakestoreapi.com/products/${id}`)
    return response;
}

export default function useList(){
    const [search, setSearch] = useState('');
    const [isSelected, setIsSelected] = useState();

    const {data, isPending,refetch  ,error} = useQuery({queryKey:['get/products'], queryFn:fetchProducts});
    const {mutate:deleteProductMutate, isPending:isLoadingDelete} = useMutation({mutationKey:['delete/product'], mutationFn:deleteProduct})

    const onDelete = ()=>{
        deleteProductMutate({id:isSelected}, {
            onSuccess(){
                Toast.show("Product deleted successfully", 10)
                
            },
            onError(){
                Toast.show("Something went wrong", 10, )
                  
            },
            onSettled(){
                refetch();
                setIsSelected(false)
            }
        })
    }

    const filteredValue = useMemo(()=>{
        try {
            if(!search) return data?.data;
            else return data?.data?.filter((res)=>checkValueAreIncludes({searched:search, txt:res?.title})|| checkValueAreIncludes({searched:search, txt:res?.price}) || checkValueAreIncludes({searched:search, txt:res?.category}))
        } catch (error) {
            console.error(error)
        }
    },[search, data]);

    return {filteredValue, isPending, error, refetch, isSelected, setIsSelected,onDelete, isLoadingDelete, search, setSearch }
}