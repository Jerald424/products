import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

const getProduct = async({id})=>{
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
    return response;
};

const createUpdateProduct =async ({data})=>{
    let method = data?.id ? 'put' : 'post';
    let url = data?.id? `https://fakestoreapi.com/products/${data?.id}` : "https://fakestoreapi.com/products"
    const response = await axios[method](url, data)
    return response
}

export default function useProductDetail(){
    const {control, handleSubmit, reset} = useForm();
    const navigation = useNavigation();
    
    const {mutate:getProductMutate, isPending, data} = useMutation({mutationKey:['get/product'], mutationFn:getProduct})
    const {mutate:createUpdateProductMutate, isPending:isLoadingUpdate} = useMutation({mutationFn:createUpdateProduct, mutationKey:['create/update-product']})

    const params = useRoute().params;

    const pData = useMemo(()=>{
        try {
        if(params?.data) return JSON.parse(params?.data)
            } catch (error) {
                console.error(error)
        }
    },[]);

    const formData = [
        {
            name:"title",
            label:"Title",
            rules:{
                required:{
                    value:true,
                    message:"Title is required"
                }
            },
            placeholder:"Enter Title"
        },
        {
            name:"price",
            label:"Price",
            keyboardType:"number-pad",
              rules:{
                required:{
                    value:true,
                    message:"Price is required"
                }
            },
            placeholder:"Enter Price"

        },
        {
            name:"description",
            label:"Description",
            multiline:true,
            style:{
                height:100,
                textAlignVertical:"top"
            },
            placeholder:"Enter Description"

        },
    ];

    const formOnSubmit = (data)=>{
       createUpdateProductMutate({data}, {
        onSuccess(){
 Toast.show({
                type:"success",
                text1:`Product ${pData?.type == 'update' ? "updated" : "created" } successfully`
            });
            navigation.goBack();
        },
        onError(){
            Toast.show({
                type:"error",
                text1:"Something went wrong"
            })
        }
       })
    };    

    useEffect(()=>{
        if(pData?.id) getProductMutate({id:pData?.id}, {
            onSuccess(data){
               reset({
                ...data?.data,
                price:String(data?.data?.price)
               })
            }
        })
    },[pData])


    return {
        formData,
        control,
        handleSubmit:handleSubmit(formOnSubmit),
        pData,
        isPending,
        data
    }
}