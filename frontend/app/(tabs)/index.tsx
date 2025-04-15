import React from 'react';
import { StyleSheet, View } from 'react-native';
import OrderCard  from '@/components/order/OrderCard';
import SavedItemCard from '@/components/order/SavedItemCard';
import LikedItemCard from '@/components/order/LikedItemCard';
export default function HomeScreen() {
  return (
    <>
    <View style={styles.container}>
      <OrderCard
        image="https://example.com/dress.jpg"
        title="Forever New bow back mini dresses in ivory"
        price={158.00}
        status="ORDER PLACED"
        onTrack={() => console.log('Tracking...')}
        onCancel={() => console.log('Cancelling...')}
        onRate={() => console.log('Rating...')}
        cancelDisabled={true}
        />
      </View>
      <View>

      <SavedItemCard
          image="https://example.com/dress.jpg"
          title="Forever New bow back mini dresses in ivory"
          price={158.00}
          description="A beautiful dress for any occasion."
          onEdit={() => console.log('Editing...')}
          onMove={() => console.log('Moving...')}
          onDelete={() => console.log('Deleting...')}
          />
          <LikedItemCard 
              image="https://example.com/dress.jpg"
              title="Forever New bow back mini dresses in ivory"
              price={158.00}
              description="A beautiful dress for any occasion."
              onEdit={() => console.log('Editing...')}
              onMove={() => console.log('Moving...')}
              onDelete={() => console.log('Deleting...')}          
          />
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});
