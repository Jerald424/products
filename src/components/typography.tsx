import { Text, TextProps } from "react-native";
import { COLORS } from "../utils/colors";

export const Para = (props:TextProps)=>{
    return <Text {...props} style={[{color:COLORS.TEXT}, props?.style]}></Text>
}


export const Heading = (props:TextProps)=>{
    return <Text {...props} style={[{color:COLORS.HEADING, fontWeight:"bold", fontSize:20}, props?.style]}></Text>
}


export const SubHeading = (props:TextProps)=>{
    return <Text {...props} style={[{color:COLORS.HEADING, fontWeight:"bold"}, props?.style]}></Text>
}