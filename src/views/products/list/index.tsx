import Container, { Button } from "../../../components/container";
import React from 'react';
import useList from "./useList";
import { Para, SubHeading } from "../../../components/typography";
import { FlatList, RefreshControl, View } from "react-native";
import NoData from "../../../components/noData";
import { COLORS, SCREEN_HEIGHT } from "../../../utils/colors";
import { amountFormat } from "../../../functions/dataHandle";
import { useNavigation } from "@react-navigation/native";
import { ConfirmationModal } from "../../../components/model";
import showToast from "../../../functions/showToast";
import Toast from "react-native-toast-message";

export default function ProductList(){
    const {data, error, isPending, refetch, isLoadingDelete, isSelected, onDelete, setIsSelected} =  useList();
    const navigation = useNavigation();
    
    return <Container>
      <FlatList
      refreshControl={<RefreshControl onRefresh={refetch} refreshing={isPending} />}
        data={data?.data}
        ListEmptyComponent={isPending ? <View></View> : <NoData {...error && {msg:JSON.stringify(error)}} style={{height:SCREEN_HEIGHT / 2}} />}
        renderItem={({item})=>{
            return <View style={{backgroundColor:COLORS.CARD, padding:10, marginBottom:10}}>
                <SubHeading style={{borderBottomWidth:1, borderColor:COLORS.BACKGROUND, paddingBottom:5}}>{item?.title}</SubHeading>
                <Para style={{marginVertical:5}}>Price: {amountFormat(item?.price)}</Para>
                <Para >Category: {item?.category}</Para>
                <View style={{flexDirection:"row", marginTop:10}}>
                    <Button style={{flex:1,backgroundColor:COLORS.BLUE}} onPress={()=>navigation.navigate('product/detail', {data:JSON.stringify({id:item?.id, type:"update"})})}>Update</Button>
                    <Button style={{flex:1,marginHorizontal:5}}  onPress={()=>navigation.navigate('product/detail', {data:JSON.stringify({id:item?.id, type:"view"})})}>View</Button>
                    <Button onPress={()=>setIsSelected(item?.id)} style={{flex:1, backgroundColor:COLORS.DANGER}}>Delete</Button>
                </View>
            </View>
        }}
      />
      <Button style={{margin:10}} onPress={()=>navigation.navigate('product/detail', {data:JSON.stringify({type:"create"})})}>+ Create</Button>
      <ConfirmationModal isVisible={!!isSelected} description="Do you want to delete product." yesButtonProps={{
        onPress:onDelete
      }} noButtonProps={{onPress:()=>setIsSelected(false)}} />
    
    </Container>
}