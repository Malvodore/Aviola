import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Add some sample data for demo
      setEvents(sampleEvents);
    } finally {
      setLoading(false);
    }
  };

  const EventCard = ({ item, index }) => (
    <View style={styles.eventCard}>
      <Image 
        source={{ 
          uri: item.images?.[0] || 'https://via.placeholder.com/400x600/FF1744/FFFFFF?text=Event' 
        }} 
        style={styles.eventImage} 
      />
      
      <View style={styles.gradient}>
        <View style={styles.gradientOverlay} />
      </View>
      
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDate}>
          {new Date(item.date).toLocaleDateString()} • {item.time}
        </Text>
        <Text style={styles.eventVenue}>{item.venue?.name}</Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('EventDetail', { eventId: item._id })}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-outline" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading amazing events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <FlatList
        data={events}
        renderItem={EventCard}
        keyExtractor={(item) => item._id || item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
      />
      
      <View style={styles.header}>
        <Text style={styles.logo}>Aviola</Text>
        <TouchableOpacity>
          <Icon name="search-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Sample data for demo purposes
const sampleEvents = [
  {
    _id: '1',
    title: 'Summer Music Festival',
    description: 'Join us for the biggest music festival of the year featuring top artists from around the world.',
    date: '2024-08-15',
    time: '18:00',
    venue: { name: 'Central Park Arena' },
    images: ['https://via.placeholder.com/400x600/FF1744/FFFFFF?text=Music+Festival']
  },
  {
    _id: '2',
    title: 'Tech Conference 2024',
    description: 'Discover the latest in technology and innovation from industry leaders.',
    date: '2024-09-10',
    time: '09:00',
    venue: { name: 'Convention Center' },
    images: ['https://via.placeholder.com/400x600/2196F3/FFFFFF?text=Tech+Conference']
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  eventCard: {
    width,
    height,
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  gradientOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  eventInfo: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 100,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 16,
    color: '#FF1744',
    marginBottom: 4,
  },
  eventVenue: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 20,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    alignItems: 'center',
  },
  bookButton: {
    backgroundColor: '#FF1744',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 15,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shareButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  favoriteButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;