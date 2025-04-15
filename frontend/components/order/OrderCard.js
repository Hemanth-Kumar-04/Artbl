import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const OrderCard = ({
  image,
  title,
  price,
  status,
  onTrack,
  onCancel,
  onRate,
  cancelDisabled,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>$ {price}</Text>
        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onRate} style={styles.rateBtn}>
            <Text style={styles.btnText}>RATE</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity onPress={onTrack} style={styles.trackBtn}>
            <Text style={styles.trackText}>TRACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onCancel}
            style={[styles.cancelBtn, cancelDisabled && styles.disabledCancel]}
            disabled={cancelDisabled}
          >
            <Text style={styles.cancelText}>CANCEL ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    elevation: 3,    
  },
  image: {
    width: 90,
    height: 120,
    borderRadius: 6,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  status: {
    color: 'limegreen',
    fontWeight: '500',
    marginTop:5
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rateBtn: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 3,
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
  },
  bottomButtons: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  trackBtn: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    borderRadius: 4,
  },
  trackText: {
    color: '#000',
    fontWeight: '500',
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  disabledCancel: {
    backgroundColor: '#e0e0e0',
  },
  cancelText: {
    color: '#888',
    fontWeight: '500',
  },
});
