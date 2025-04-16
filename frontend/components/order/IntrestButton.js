import React from "react";
import {Text,StyleSheet,TouchableOpacity,Image} from "react-native";


const InterestButton = ({title,image,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={{uri:image}} style={styles.image}/>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default InterestButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        paddingHorizontal: 14,
        margin: 10,
        maxWidth:170,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderColor: "#000000",
        borderWidth: 1,
        flexDirection: 'row',
    },
    buttonText: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "regular",
    },
    image:{
        width:20,
        height:20,
        marginRight:5,
        borderRadius:100,
    }
});