import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const fetchProducts =async ()=>{
    const response = await axios.get('https://fakestoreapi.com/products')
    return response;
}

export default function useList(){
    const {data, isPending,refetch  ,error} = useQuery({queryKey:['get/products'], queryFn:fetchProducts});

    return {data, isPending, error, refetch}
}