import React from 'react';
import { View, Button, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart, addNewOrder } from '../redux/actions'; // 确保正确导入 addNewOrder

const ShoppingCart = ({ setView }) => {
  const cartItems = useSelector(state => state.cart.items); 
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (!token) {
      Alert.alert('You must be logged in to checkout');
      return;
    }

    console.log("Sending checkout request with items:", cartItems);
    console.log("Using authorization token:", token);
    try {
      const response = await fetch('http://10.0.2.2:3000/orders/neworder', {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: cartItems })
      });
      const result = await response.json();
      if (result.status === 'OK') {
        dispatch(addNewOrder(result.orderDetails)); // 分发 addNewOrder 动作
        dispatch(clearCart()); // 清空购物车
        Alert.alert('Checkout successful!');
      } else {
        Alert.alert(`Checkout failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      Alert.alert('Checkout error: Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.title} - ${item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.id))} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => {
          item.quantity > 1 ? dispatch(decreaseQuantity(item.id)) : dispatch(removeFromCart(item.id));
        }} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your shopping cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total Items: {totalQuantity}</Text>
      <Text style={styles.header}>Total Price: ${totalPrice.toFixed(2)}</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button onPress={handleCheckout} title="Checkout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    emptyText: {
      fontSize: 18,
    }
  }
});

export default ShoppingCart;
