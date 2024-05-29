import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomeScreen from './components/HomeScreen';
import ShoppingCart from './components/ShoppingCart';
import MyOrder from './components/MyOrder';
import Login from './components/Login';
import SignupScreen from './components/Signup';
import SplashScreen from './components/SplashScreen';
import { fetchCategories, fetchProductsForCategory } from './api';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs({ loading, selectedCategory, products, selectedProduct, categories, handleCategorySelect, handleBackToHome, setSelectedProduct, userToken }) {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Products') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          } else if (route.name === 'Shopping Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'MyOrder') {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          } else if (route.name === 'Login') {
            iconName = focused ? 'log-in' : 'log-in-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      listeners={({ navigation, route }) => ({
        tabPress: e => {
          if (!userToken && route.name !== 'Login') {
            e.preventDefault();
            Alert.alert("You must login first", "Please login to access this feature.", [
              { text: "OK", onPress: () => navigation.navigate('Login') }
            ]);
          }
        }
      })}
    >
      <Tab.Screen name="Products">
        {props => <HomeScreen
          {...props}
          loading={loading}
          selectedCategory={selectedCategory}
          products={products}
          selectedProduct={selectedProduct}
          categories={categories}
          handleCategorySelect={handleCategorySelect}
          handleBackToHome={handleBackToHome}
          setSelectedProduct={setSelectedProduct}
        />}
      </Tab.Screen>
      <Tab.Screen name="Shopping Cart" component={ShoppingCart} />
      <Tab.Screen name="MyOrder" component={MyOrder} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const userToken = useSelector(state => state.user.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  const handleCategorySelect = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    const fetchedProducts = await fetchProductsForCategory(category);
    setProducts(fetchedProducts);
    setLoading(false);
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    setProducts(null);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs">
          {props => <HomeTabs
            {...props}
            loading={loading}
            selectedCategory={selectedCategory}
            products={products}
            selectedProduct={selectedProduct}
            categories={categories}
            handleCategorySelect={handleCategorySelect}
            handleBackToHome={handleBackToHome}
            setSelectedProduct={setSelectedProduct}
            userToken={userToken}
          />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
