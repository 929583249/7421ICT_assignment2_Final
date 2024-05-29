import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const MyOrder = () => {
  // 更新这里的路径
  const orders = useSelector(state => state.order.orders);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Order ID: {item.id}</Text>
      <Text style={styles.title}>Order Tta: ${item.total}</Text>
      {/* 展示更多订单细节如果需要 */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
});

export default MyOrder;
