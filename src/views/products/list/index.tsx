import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { FlatList, RefreshControl, View } from "react-native";
import Container, { Button } from "../../../components/container";
import { ConfirmationModal } from "../../../components/model";
import NoData from "../../../components/noData";
import { Para, SubHeading } from "../../../components/typography";
import { amountFormat } from "../../../functions/dataHandle";
import { COLORS, SCREEN_HEIGHT } from "../../../utils/colors";
import useList from "./useList";
import InputBox from "../../../components/input";

export default function ProductList(){
    const {filteredValue, error, isPending, refetch, isLoadingDelete, isSelected, onDelete, setIsSelected, search, setSearch} =  useList();
    const navigation = useNavigation();
    
    return <Container>
      <InputBox style={{margin:10}} onChangeText={setSearch} value={search} placeholder="Search by Title, Price, Category" />
      <FlatList
      refreshControl={<RefreshControl onRefresh={refetch} refreshing={isPending || isLoadingDelete} />}
        data={filteredValue}
        ListEmptyComponent={isPending ? <View></View> : <NoData {...error && {msg:"Something went wrong!. Refresh.."}} style={{height:SCREEN_HEIGHT / 2}} />}
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