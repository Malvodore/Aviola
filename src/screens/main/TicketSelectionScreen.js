import React, { useState } from 'react';
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

const TicketSelectionScreen = ({ route, navigation }) => {
  const { eventId, event, ticketCategories } = route.params;
  const [selectedTickets, setSelectedTickets] = useState({});
  const { dispatch } = useApp();

  const updateTicketQuantity = (categoryId, change) => {
    setSelectedTickets(prev => {
      const currentQuantity = prev[categoryId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        const { [categoryId]: removed, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [categoryId]: newQuantity };
    });
  };

  const getTotalAmount = () => {
    return Object.entries(selectedTickets).reduce((total, [categoryId, quantity]) => {
      const category = ticketCategories.find(cat => cat._id === categoryId || cat.id === categoryId);
      return total + (category ? category.price * quantity : 0);
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
  };

  const handleProceedToCheckout = () => {
    if (getTotalTickets() === 0) {
      Alert.alert('No Tickets Selected', 'Please select at least one ticket to proceed.');
      return;
    }

    const cartItems = Object.entries(selectedTickets).map(([categoryId, quantity]) => {
      const category = ticketCategories.find(cat => cat._id === categoryId || cat.id === categoryId);
      return {
        categoryId,
        category,
        quantity,
        unitPrice: category.price,
        totalPrice: category.price * quantity
      };
    });

    // Add to cart in context
    dispatch({ type: 'CLEAR_CART' });
    cartItems.forEach(item => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: item
      });
    });

    navigation.navigate('Checkout', { 
      eventId,
      event,
      totalAmount: getTotalAmount(),
      totalTickets: getTotalTickets()
    });
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
        <Text style={styles.headerTitle}>Select Tickets</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event?.title}</Text>
          <Text style={styles.eventDate}>
            {new Date(event?.date).toLocaleDateString()} • {event?.time}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Choose Your Tickets</Text>

        {ticketCategories.map((category) => (
          <View key={category._id || category.id} style={styles.ticketCard}>
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketName}>{category.name}</Text>
              <Text style={styles.ticketPrice}>${category.price}</Text>
              <Text style={styles.ticketDescription}>{category.description}</Text>
              <Text style={styles.availableSeats}>
                {category.availableSeats} seats available
              </Text>
            </View>

            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  (!selectedTickets[category._id || category.id] || selectedTickets[category._id || category.id] === 0) && styles.disabledButton
                ]}
                onPress={() => updateTicketQuantity(category._id || category.id, -1)}
                disabled={!selectedTickets[category._id || category.id] || selectedTickets[category._id || category.id] === 0}
              >
                <Icon name="remove" size={20} color="white" />
              </TouchableOpacity>

              <Text style={styles.quantityText}>
                {selectedTickets[category._id || category.id] || 0}
              </Text>

              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  (selectedTickets[category._id || category.id] >= category.availableSeats) && styles.disabledButton
                ]}
                onPress={() => updateTicketQuantity(category._id || category.id, 1)}
                disabled={selectedTickets[category._id || category.id] >= category.availableSeats}
              >
                <Icon name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {getTotalTickets() > 0 && (
        <View style={styles.summary}>
          <View style={styles.summaryInfo}>
            <Text style={styles.totalTickets}>{getTotalTickets()} tickets selected</Text>
            <Text style={styles.totalAmount}>${getTotalAmount()}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleProceedToCheckout}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
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
  eventInfo: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#FF1744',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  ticketCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketInfo: {
    flex: 1,
  },
  ticketName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ticketPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF1744',
    marginBottom: 5,
  },
  ticketDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  availableSeats: {
    fontSize: 12,
    color: '#999',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#FF1744',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  summary: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalTickets: {
    fontSize: 14,
    color: '#666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF1744',
  },
  checkoutButton: {
    backgroundColor: '#FF1744',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketSelectionScreen;