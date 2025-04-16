import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const BlackButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BlackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
