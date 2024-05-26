import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MyOrder = () => {
  // 订单状态数据
  const orders = [
    { id: '1', title: 'New Order' },
    { id: '2', title: 'Paid Order' },
    { id: '3', title: 'Delivered Order' }
  ];

  // 渲染每个订单状态的函数
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// 添加一些样式
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
