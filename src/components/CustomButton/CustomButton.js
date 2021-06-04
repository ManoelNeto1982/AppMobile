import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";


const CustomButton = (props) => {
    if (props.disabled)
        var btnColor = 'grey';
    else
        // @ts-ignore
        var btnColor = props.color != undefined ? props.color : 'blue';
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={props.onPressEvent}
            disabled={props.disabled}
        >
            <View
                style={{ ...styles.button, backgroundColor: btnColor }}
            >
                <Text
                    style={{
                        fontSize: props.textSize,
                        color: props.textColor,
                        padding: props.padding
                    }}>
                    {props.text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 30,
        padding: 15,        
        width: 50,
        backgroundColor: '#00cc99', 
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
  
      button: {
    
        borderRadius: 5,
        justifyContent: 'center',
        width: 50,
        height: 50,   
      },
})

export default CustomButton;