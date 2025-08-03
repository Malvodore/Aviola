import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useApp } from '../../Context/AppContext';

const MyTicketScreen = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useApp();

  useEffect(() => {
    fetchMyTickets();
  }, []);

  const fetchMyTickets = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings/my-bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTickets(data.bookings);
      } else {
        console.error('Failed to fetch tickets:', data.message);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      // Add sample data for demo
      setTickets(sampleTickets);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your tickets...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
      </View>

      <ScrollView style={styles.content}>
        {tickets.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="ticket-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No tickets yet</Text>
            <Text style={styles.emptySubtitle}>
              Start exploring events and book your first ticket!
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.browseButtonText}>Browse Events</Text>
            </TouchableOpacity>
          </View>
        ) : (
          tickets.map((ticket) => (
            <View key={ticket._id} style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                <Text style={styles.eventTitle}>{ticket.eventId?.title}</Text>
                <Text style={styles.bookingRef}>#{ticket.bookingReference}</Text>
              </View>
              
              <View style={styles.ticketDetails}>
                <Text style={styles.eventDate}>
                  {new Date(ticket.eventId?.date).toLocaleDateString()} • {ticket.eventId?.time}
                </Text>
                <Text style={styles.venue}>{ticket.eventId?.venue?.name}</Text>
              </View>
              
              <View style={styles.ticketInfo}>
                {ticket.tickets.map((ticketItem, index) => (
                  <View key={index} style={styles.ticketItem}>
                    <Text style={styles.ticketType}>{ticketItem.categoryId?.name}</Text>
                    <Text style={styles.ticketQuantity}>x{ticketItem.quantity}</Text>
                    <Text style={styles.ticketPrice}>${ticketItem.unitPrice * ticketItem.quantity}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.ticketFooter}>
                <Text style={styles.totalAmount}>Total: ${ticket.totalAmount}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: ticket.bookingStatus === 'confirmed' ? '#4CAF50' : '#FF9800' }
                ]}>
                  <Text style={styles.statusText}>
                    {ticket.bookingStatus?.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Sample data for demo
const sampleTickets = [
  {
    _id: '1',
    bookingReference: 'AV123456',
    eventId: {
      title: 'Summer Music Festival',
      date: '2024-08-15',
      time: '18:00',
      venue: { name: 'Central Park Arena' }
    },
    tickets: [
      {
        categoryId: { name: 'VIP' },
        quantity: 2,
        unitPrice: 150
      }
    ],
    totalAmount: 300,
    bookingStatus: 'confirmed'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: '#FF1744',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  bookingRef: {
    fontSize: 12,
    color: '#666',
  },
  ticketDetails: {
    marginBottom: 15,
  },
  eventDate: {
    fontSize: 14,
    color: '#FF1744',
    marginBottom: 5,
  },
  venue: {
    fontSize: 14,
    color: '#666',
  },
  ticketInfo: {
    marginBottom: 15,
  },
  ticketItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  ticketType: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  ticketQuantity: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
  },
  ticketPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MyTicketScreen;