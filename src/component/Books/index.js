import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Books (props) {
    function filterDesc(desc){
        if(desc.lenght < 18){
            return desc
        }

    return `${desc.substring(0,15)}...`
    }
    return (
        <TouchableOpacity style = {StyleSheet.container}
            onPress = {props.onClick}>
            <Image
            source={props.img}
            style = {styles.booksImg}
            />
            <Text style = {styles.booksText}>
                {filterDesc(props.children)}
            </Text>
            <View opacity = {0.4}>
                <Text style = {styles.booksText}>
                    {props.const}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
    
const styles = StyleSheet.create({
    container: {
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    booksImg: {
       width: 100,
       height: 130
    },
    booksText:{
        fontSize: 12
    }
});