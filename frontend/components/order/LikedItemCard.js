import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Or use any other icon library

const LikedItemCard = ({
  image,
  title,
  price,
  description,
  onEdit,
  onMove,
  onDelete,
  moveDisabled = false,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>$ {price}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onEdit} style={styles.editBtn}>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onMove}
            style={[styles.moveBtn, moveDisabled && styles.disabledMove]}
            disabled={moveDisabled}
          >
            <Text style={styles.moveText}>MOVE TO LIKED</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <MaterialCommunityIcons name="trash-can-outline" size={24} color="#000" />   
      </TouchableOpacity>
    </View>
  );
};

export default LikedItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    paddingRight: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  editBtn: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    borderRadius: 4,
  },
  moveBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  disabledMove: {
    backgroundColor: '#e0e0e0',
  },
  editText: {
    color: '#000',
    fontWeight: '500',
  },
  moveText: {
    color: '#888',
    fontWeight: '500',
  },
});
