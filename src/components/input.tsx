import { TextInput, TextInputProps, View } from "react-native";
import { Para, SubHeading } from "./typography";
import { COLORS } from "../utils/colors";

export interface InputBoxProps extends TextInputProps {
    label?:String;
    isReadOnly?:boolean
}
export default function InputBox(props:InputBoxProps){
    return <View >
        {props?.label &&<Para>{props?.label}</Para>}
        {
            props?.isReadOnly ? <SubHeading>{props?.value}</SubHeading>
            :
        <TextInput  {...props} style={[{borderWidth:1, borderColor:COLORS.BORDER, borderRadius:5}, props?.style]} />
        }
    </View>
}