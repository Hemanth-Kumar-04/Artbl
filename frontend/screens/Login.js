import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log into</Text>
      <Text style={styles.title}>Your account</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}