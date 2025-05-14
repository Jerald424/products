import { Image, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from "react-native";
import { COLORS } from "../utils/colors";
import { Para } from "./typography";

export default function Container(props:ViewProps){
    return <View {...props} style={[{flex:1, backgroundColor:COLORS.BACKGROUND}, props.style]} ></View>
}

export const Button = (props:TouchableOpacityProps)=>{
    return <TouchableOpacity {...props} style={[{padding:15, backgroundColor:COLORS.PRIMARY, borderRadius:5}, props.style]}>
        <Para style={{color:COLORS.CARD, textTransform:"uppercase", textAlign:"center", fontWeight:"bold"}}>{props?.children}</Para>
    </TouchableOpacity>
};