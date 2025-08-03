import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useApp } from '../../Context/AppContext';

const CheckoutScreen = ({ route, navigation }) => {
  const { eventId, event, totalAmount, totalTickets } = route.params;
  const { cart, user, token } = useApp();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Create booking
      const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          eventId,
          tickets: cart.map(item => ({
            categoryId: item.categoryId,
            quantity: item.quantity
          }))
        })
      });

      const bookingData = await bookingResponse.json();

      if (bookingResponse.ok) {
        // Process payment (mock)
        const paymentResponse = await fetch(`http://localhost:5000/api/bookings/${bookingData.booking._id}/payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ paymentMethod })
        });

        const paymentData = await paymentResponse.json();

        if (paymentResponse.ok) {
          Alert.alert(
            'Payment Successful!',
            'Your tickets have been booked successfully.',
            [
              {
                text: 'View Tickets',
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main', params: { screen: 'MyTickets' } }]
                  });
                }
              }
            ]
          );
        } else {
          Alert.alert('Payment Failed', paymentData.message);
        }
      } else {
        Alert.alert('Booking Failed', bookingData.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{event?.title}</Text>
            <Text style={styles.eventDate}>
              {new Date(event?.date).toLocaleDateString()} • {event?.time}
            </Text>
            <Text style={styles.eventVenue}>{event?.venue?.name}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ticket Summary</Text>
          {cart.map((item, index) => (
            <View key={index} style={styles.ticketItem}>
              <View style={styles.ticketDetails}>
                <Text style={styles.ticketName}>{item.category?.name}</Text>
                <Text style={styles.ticketQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.ticketPrice}>${item.totalPrice}</Text>
            </View>
          ))}
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total ({totalTickets} tickets)</Text>
            <Text style={styles.totalAmount}>${totalAmount}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'card' && styles.selectedPayment]}
            onPress={() => setPaymentMethod('card')}
          >
            <Icon name="card-outline" size={24} color="#FF1744" />
            <Text style={styles.paymentText}>Credit/Debit Card</Text>
            {paymentMethod === 'card' && (
              <Icon name="checkmark-circle" size={24} color="#FF1744" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'paypal' && styles.selectedPayment]}
            onPress={() => setPaymentMethod('paypal')}
          >
            <Icon name="logo-paypal" size={24} color="#FF1744" />
            <Text style={styles.paymentText}>PayPal</Text>
            {paymentMethod === 'paypal' && (
              <Icon name="checkmark-circle" size={24} color="#FF1744" />
            )}
          </TouchableOpacity>
        </View>

        {paymentMethod === 'card' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value="4242 4242 4242 4242"
              editable={false}
            />
            <View style={styles.cardRow}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="MM/YY"
                value="12/25"
                editable={false}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="CVV"
                value="123"
                editable={false}
              />
            </View>
            <Text style={styles.mockNote}>
              * This is a demo. No real payment will be processed.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, loading && styles.disabledButton]}
          onPress={handlePayment}
          disabled={loading}
        >
          <Text style={styles.payButtonText}>
            {loading ? 'Processing...' : `Pay ${totalAmount}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  eventCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#FF1744',
    marginBottom: 5,
  },
  eventVenue: {
    fontSize: 14,
    color: '#666',
  },
  ticketItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ticketDetails: {
    flex: 1,
  },
  ticketName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  ticketQuantity: {
    fontSize: 12,
    color: '#666',
  },
  ticketPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#FF1744',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF1744',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPayment: {
    borderColor: '#FF1744',
    backgroundColor: '#fff5f5',
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  mockNote: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  payButton: {
    backgroundColor: '#FF1744',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;