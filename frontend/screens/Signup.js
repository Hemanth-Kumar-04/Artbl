import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create</Text>
      <Text style={styles.title}>New account</Text>      
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>Already have an account? Login</Text>
        </TouchableOpacity>
    </View>
  );
}

export default Signup;