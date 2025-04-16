import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const WhiteButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default WhiteButton;

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#fff",
      paddingVertical: 12,
      paddingHorizontal: 10,
      margin: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#000",
    },
    buttonText:{
        color: "#000",
        fontSize: 16,
        fontWeight: "regular", 
    }
});