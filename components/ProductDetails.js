// components/ProductDetails.js
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import styles from './styles';
import { addToCart } from '../redux/actions';  // Update the path if necessary

const ProductDetails = ({ product, onBack }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <View style={styles.productDetailsContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: product.image }} style={styles.productDetailImage} />
        <Text style={styles.productDetailTitle}>{product.title}</Text>
        <Text style={styles.productDetailPrice}>Price: ${product.price}</Text>
        <Text style={styles.productDetailDescription}>{product.description}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity onPress={onBack} style={styles.fixedBackButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;