import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EventDetailScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
      const data = await response.json();
      setEvent(data.event);
      setTicketCategories(data.ticketCategories);
    } catch (error) {
      console.error('Error fetching event details:', error);
      // Sample data for demo
      setEvent(sampleEvent);
      setTicketCategories(sampleTicketCategories);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading event details...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Event not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image 
            source={{ 
              uri: event.images?.[0] || 'https://via.placeholder.com/400x300/FF1744/FFFFFF?text=Event' 
            }} 
            style={styles.eventImage} 
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.date}>
            {new Date(event.date).toLocaleDateString()} • {event.time}
          </Text>
          <Text style={styles.venue}>{event.venue?.name}</Text>
          <Text style={styles.address}>{event.venue?.address}</Text>
          
          <Text style={styles.sectionTitle}>About Event</Text>
          <Text style={styles.description}>{event.description}</Text>
          
          <Text style={styles.sectionTitle}>Ticket Categories</Text>
          {ticketCategories.map((category) => (
            <View key={category._id || category.id} style={styles.ticketCategory}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryPrice}>${category.price}</Text>
              </View>
              <Text style={styles.availableSeats}>
                {category.availableSeats} seats available
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <TouchableOpacity
        style={styles.selectTicketsButton}
        onPress={() => navigation.navigate('TicketSelection', { 
          eventId, 
          event,
          ticketCategories 
        })}
      >
        <Text style={styles.selectTicketsText}>Select Tickets</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Sample data for demo
const sampleEvent = {
  _id: '1',
  title: 'Summer Music Festival',
  description: 'Join us for the biggest music festival of the year featuring top artists from around the world. Experience incredible performances, amazing food, and unforgettable memories.',
  date: '2024-08-15',
  time: '18:00',
  venue: {
    name: 'Central Park Arena',
    address: '123 Park Avenue, New York, NY 10001'
  },
  images: ['https://via.placeholder.com/400x300/FF1744/FFFFFF?text=Event']
};

const sampleTicketCategories = [
  {
    _id: '1',
    name: 'VIP',
    price: 150,
    availableSeats: 50,
    description: 'Premium experience with backstage access'
  },
  {
    _id: '2',
    name: 'General',
    price: 75,
    availableSeats: 200,
    description: 'Standard admission'
  },
  {
    _id: '3',
    name: 'Economy',
    price: 35,
    availableSeats: 500,
    description: 'Budget-friendly option'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  imageContainer: {
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#FF1744',
    marginBottom: 4,
  },
  venue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  ticketCategory: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categoryPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF1744',
  },
  availableSeats: {
    fontSize: 12,
    color: '#666',
  },
  selectTicketsButton: {
    backgroundColor: '#FF1744',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectTicketsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventDetailScreen;