import React from 'react';
import { StyleSheet, View ,ScrollView} from 'react-native';
import OrderCard  from '@/components/order/OrderCard';
import SavedItemCard from '@/components/order/SavedItemCard';
import LikedItemCard from '@/components/order/LikedItemCard';
import ProductCard from '@/components/order/ProductCard';
import BlackButton from '@/components/order/BlackButton';
import IntrestButton from '@/components/order/IntrestButton';
import WhiteButton from  '@/components/order/WhiteButton';

export default function HomeScreen() {
  return (
    <>
    <ScrollView>

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

              <IntrestButton
              title="Trousers"
              image={"https://example.com/heart-icon.png"}
              onPress={() => console.log('Adding to wishlist...')}
              />
          <WhiteButton
              title="Add to Wishlist"
              onPress={() => console.log('Adding to wishlist...')}          
          />

          <BlackButton
              title="Add to Cart"
              onPress={() => console.log('Adding to cart...')}
          />
          
          <ProductCard
              image="https://example.com/dress.jpg"
              title="Forever New bow back mini dresses in ivory"
              price={158.00}          
              />
    </View>
  </ScrollView>
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
