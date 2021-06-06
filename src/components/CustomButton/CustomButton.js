import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={props.onPress}
      disabled={props.disabled}    
      marginTop={props.marginTop}
    >
      <View
        style={{
          ...styles.button,
          backgroundColor: props.disabled ? "grey" : props?.color ?? "blue",
        }}
      >
        <Text
          style={{
            fontSize: props.textSize,
            color: props.textColor,
            padding: props.padding,  
            margin:props.margin      
          }}
        >
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 30,
    padding: 20,
    width: 15,
    backgroundColor: "#00cc99",  
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },

  button: {
    borderRadius: 10,
    justifyContent: "center",
    width: 15,
    height: 15,  
  },
});

export default CustomButton;
