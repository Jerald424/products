import React from 'react';
import useProductDetail from './useDetail';
import { Image, ScrollView, View } from 'react-native';
import { Controller } from 'react-hook-form';
import InputBox from '../../../components/input';
import { Para, SubHeading } from '../../../components/typography';
import { COLORS } from '../../../utils/colors';
import Container, { Button } from '../../../components/container';
import { LoaderWithChildren } from '../../../components/loader';

export default function ProductDetail(){
    const {control, formData, handleSubmit, pData, isPending, data} = useProductDetail();

    let update = ['update', 'create'].includes( pData?.type) 

    return<Container>
        <LoaderWithChildren isLoading={isPending} style={{flex:1}}>
         <ScrollView style={{flex:1}}>
            {data?.data?.image ?  <Image source={{uri:data?.data?.image}} style={{height:200, resizeMode:"contain", alignSelf:"center"}} /> : <View style={{height:200, alignItems:"center", justifyContent:"center", backgroundColor:COLORS.CARD}}>
                <SubHeading>No Image</SubHeading>
                </View>}
        <View style={{padding:15}}>
        {
            formData?.map((fieldVal)=><Controller
            key={fieldVal?.name}
            rules={fieldVal?.rules}
            control={control}
                name={fieldVal?.name}
                render={({field, fieldState:{error}})=>{
                    let err_msg = error?.message;
                    return <View style={{marginBottom:10}}>
                    <InputBox isReadOnly={!update} {...field} {...fieldVal} onChangeText={field.onChange} />
                    {
                        err_msg && <Para style={{color:COLORS.DANGER}}>{err_msg}</Para>
                    }
                    </View> 
                }}
            />)
        }
        </View>
    </ScrollView>
    {update&&<Button onPress={handleSubmit} style={{margin:10}}>{pData?.type}</Button>}
    </LoaderWithChildren>
    </Container>
}