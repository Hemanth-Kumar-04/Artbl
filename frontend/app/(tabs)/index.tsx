import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import InstaStory from 'react-native-insta-story';

const { width, height } = Dimensions.get('window');

const App = () => {
  const stories = [
    {
      user_id: 1,
      user_image: 'https://randomuser.me/api/portraits/men/1.jpg',
      user_name: 'john_doe',
      stories: [
        {
          story_id: 'story1',
          story_image: 'https://picsum.photos/400/700?random=1',
        },
        {
          story_id: 'story2',
          story_image: 'https://picsum.photos/400/700?random=2',
        },
      ],
    },
    {
      user_id: 2,
      user_image: 'https://randomuser.me/api/portraits/women/2.jpg',
      user_name: 'jane_doe',
      stories: [
        {
          story_id: 'story3',
          story_image: 'https://picsum.photos/400/700?random=3',
        },
      ],
    },
  ];

  const cards = [
    {
      id: 1,
      image: 'https://picsum.photos/300/500?random=4',
      name: 'Card 1',
    },
    {
      id: 2,
      image: 'https://picsum.photos/300/500?random=5',
      name: 'Card 2',
    },
    {
      id: 3,
      image: 'https://picsum.photos/300/500?random=6',
      name: 'Card 3',
    },
  ];

  const handleStorySeen = (story_id) => {
    console.log('Story seen:', story_id);
  };

  const handleStoryClose = () => {
    console.log('Story closed');
  };

  return (
    <View style={styles.container}>
      {/* Stories Section */}
      <View style={styles.storyContainer}>
        <InstaStory
          data={stories}
          duration={10}
          onStorySeen={(item) => handleStorySeen(item.story_id)}
          onClose={handleStoryClose}
        />
      </View>

      {/* Swipable Cards Section */}
      <View style={styles.swiperContainer}>
        <Swiper
          cards={cards}
          renderCard={(card) => (
            <View style={styles.card}>
              <Image source={{ uri: card.image }} style={styles.image} />
              <Text style={styles.cardText}>{card.name}</Text>
            </View>
          )}
          onSwipedLeft={(index) => console.log('Swiped left', index)}
          onSwipedRight={(index) => console.log('Swiped right', index)}
          infinite
          backgroundColor={'transparent'}  // keep background color transparent
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Entire screen: white background
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // Story container: top portion
  storyContainer: {
    flex: 0.2,        // Adjust for how tall you want the stories section
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',

  },
  // Swiper container: remaining portion
  swiperContainer: {
    marginTop: -20,
    flex: 0.8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  // Card styling
  card: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-60,
  },
  image: {
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default App;
