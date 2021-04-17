import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EditProfileScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text></Text>
            <Button
                title='click here'
                onPress={() => alert('Button Clicked!') }
            />
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
