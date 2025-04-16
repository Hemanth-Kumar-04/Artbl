import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ image, price, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.price}>$ {price}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  title: {
    fontSize: 14,
    color: '#444',
  },
});
