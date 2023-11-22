import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DetailScreen = ({ route }) => {
  const { todo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name: {todo.name}</Text>
      <Text style={styles.detail}>Location: {todo.location}</Text>
      <Text style={styles.detail}>Date of the hike: {todo.date}</Text>
      <Text style={styles.detail}>Parking available: {todo.parking}</Text>
      <Text style={styles.detail}>Length of the hike: {todo.length}</Text>
      <Text style={styles.detail}>Difficlty level: {todo.level}</Text>
      <Text style={styles.detail}>Description: {todo.des}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  detail: {
    fontSize: 20,
  },
});

export default DetailScreen;
