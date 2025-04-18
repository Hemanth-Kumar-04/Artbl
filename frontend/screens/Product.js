import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Picker, ScrollView } from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';

export default function Product() {
  const [selectedColor, setSelectedColor] = useState('Choose');
  const [selectedSize, setSelectedSize] = useState('Choose');

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('./assets/product.jpg')} // Replace with your image
        style={styles.image}
      />
      
      <View style={styles.iconRow}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Entypo name="share" size={24} color="black" />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>Nike Football Academy dry short</Text>
        <Text style={styles.price}>$65.00</Text>
        
        <View style={styles.ratingRow}>
          {[...Array(5)].map((_, i) => (
            <AntDesign
              key={i}
              name="staro"
              size={16}
              color="black"
              style={{ marginRight: 2 }}
            />
          ))}
          <Text style={styles.ratingText}>3.0 (4)</Text>
        </View>

        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Color</Text>
          <Text style={styles.selectorLabel}>Size</Text>
        </View>

        <TouchableOpacity style={styles.addToBag}>
          <Text style={styles.addToBagText}>ADD TO BAG</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.heartIcon}>
          <AntDesign name="hearto" size={20} color="black" />
        </TouchableOpacity>

        <View style={styles.deliveryBox}>
          <Entypo name="truck" size={20} color="black" />
          <View style={{ marginLeft: 10 }}>
            <Text>Free Delivery</Text>
            <Text style={{ fontSize: 10 }}>T&Cs apply. Learn more</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>PRODUCT DETAILS</Text>
        <Text style={styles.sectionTitle}>REVIEWS</Text>

        <View style={styles.reviewSummary}>
          {[...Array(3)].map((_, i) => (
            <FontAwesome key={i} name="star" size={14} color="black" />
          ))}
          {[...Array(2)].map((_, i) => (
            <FontAwesome key={i} name="star-o" size={14} color="black" />
          ))}
          <Text style={styles.reviewText}>3.0 (4)</Text>
        </View>
        <Text style={styles.reviewStat}>33% of customers recommend this product</Text>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>FIT</Text>
          <View style={styles.sliderLine}>
            <Text>Runs Small</Text>
            <View style={styles.indicatorDot} />
            <Text>Runs Large</Text>
          </View>
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>QUALITY</Text>
          <View style={styles.sliderLine}>
            <Text>Poor</Text>
            <View style={styles.indicatorDot} />
            <Text>Great</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>VIEW ALL REVIEWS</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 300, resizeMode: 'cover' },
  iconRow: {
    position: 'absolute',
    top: 40,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoContainer: { padding: 20 },
  title: { fontSize: 18, fontWeight: '600' },
  price: { fontSize: 16, marginVertical: 5 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  ratingText: { marginLeft: 10 },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  selectorLabel: { fontSize: 14, color: 'gray' },
  addToBag: {
    backgroundColor: '#1DB954',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10
  },
  addToBagText: { color: 'white', fontWeight: 'bold' },
  heartIcon: { position: 'absolute', right: 30, top: 275 },
  deliveryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5
  },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginTop: 20 },
  reviewSummary: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  reviewText: { marginLeft: 10 },
  reviewStat: { color: 'gray', fontSize: 12, marginVertical: 5 },
  sliderContainer: { marginVertical: 10 },
  sliderLabel: { fontWeight: 'bold' },
  sliderLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  indicatorDot: {
    height: 8,
    width: 8,
    backgroundColor: '#000',
    borderRadius: 4
  },
  viewAllButton: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5
  },
  viewAllText: { fontWeight: 'bold' }
});
