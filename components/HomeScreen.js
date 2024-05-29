// components/HomeScreen.js
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import Header from './Header';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import SplashScreen from './SplashScreen';

const HomeScreen = ({ 
  loading, 
  selectedCategory, 
  products, 
  selectedProduct, 
  categories, 
  handleCategorySelect,
  handleBackToHome,
  setSelectedProduct 
}) => {
  
  console.log("Loading:", loading, "Selected Category:", selectedCategory, "Products:", products, "Selected Product:", selectedProduct, "Categories:", categories);

  const renderContent = () => {
    if (loading) {
      return <SplashScreen />;
    } else if (selectedProduct) {
      return <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
    } else if (selectedCategory && products) {
      return <ProductList products={products} onProductSelect={setSelectedProduct} onBack={handleBackToHome} />;
    } else if (categories) {
      return <CategoryList categories={categories} onCategorySelect={handleCategorySelect} />;
    } else {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={selectedCategory || 'Fake Store'} isLoading={loading} />
      {renderContent()}
    </View>
  //   <View>
  //     <Text>This is a test</Text>
  //   </View>
  );
};

  

export default HomeScreen;