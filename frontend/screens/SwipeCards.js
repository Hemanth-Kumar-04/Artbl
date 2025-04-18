import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import InstaStory from 'react-native-insta-story';

const { width, height } = Dimensions.get('window');

const CARD_WIDTH  = width * 0.80;
const CARD_HEIGHT = height * 0.72;

const STORY_HEIGHT = 100;

const App = () => {
  const stories = [
    {
      user_id: 1,
      user_image: 'https://randomuser.me/api/portraits/men/1.jpg',
      user_name: 'john_doe',
      stories: [
        { story_id: 's1', story_image: 'https://picsum.photos/400/700?random=1' },
        { story_id: 's2', story_image: 'https://picsum.photos/400/700?random=2' },
      ],
    },
    {
      user_id: 2,
      user_image: 'https://randomuser.me/api/portraits/women/2.jpg',
      user_name: 'jane_doe',
      stories: [
        { story_id: 's3', story_image: 'https://picsum.photos/400/700?random=3' },
      ],
    },
  ];

  const cards = [
    {
      id: 1,
      image: 'https://picsum.photos/300/500?random=4',
      name: 'maximullian',
      price: 43.00,
    },
    {
      id: 2,
      image: 'https://picsum.photos/300/500?random=5',
      name: 'bella_style',
      price: 55.99,
    },
    {
      id: 3,
      image: 'https://picsum.photos/300/500?random=6',
      name: 'trend_setter',
      price: 37.50,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.overlayStories}>
        <InstaStory
          data={stories}
          duration={8}
          onStorySeen={item => console.log('seen', item.story_id)}
          onClose={() => console.log('closed')}
        />
      </View>

      <View style={styles.swiperWrapper}>
        <Swiper
          disableTopSwipe={true}
          disableBottomSwipe={true}
          cards={cards}
          containerStyle={styles.swiperFullScreen}
          renderCard={card => (
            <View style={styles.card}>
              <Image source={{ uri: card.image }} style={styles.image} />

              <View style={styles.overlayUsername}>
                <Text style={styles.username}>{card.name}</Text>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>VIEW SAVEDITEMS</Text>
                <Text style={styles.price}>$ {card.price}</Text>
              </View>
            </View>
          )}
          infinite
          backgroundColor="transparent"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  overlayStories: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STORY_HEIGHT,
    backgroundColor: '#fff',
    marginTop:25,
    zIndex: 10,
    justifyContent: 'center',
  },

  swiperWrapper: {
    flex: 1,
    paddingTop: STORY_HEIGHT,
    marginTop:90,
  },

  swiperFullScreen: {
    flex: 1,
    backgroundColor: 'transparent',
  
  },

  card: {
  
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#000',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlayUsername: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#00000070',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },

  footerText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 5,
    opacity: 0.85,
  },

  price: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default App;
