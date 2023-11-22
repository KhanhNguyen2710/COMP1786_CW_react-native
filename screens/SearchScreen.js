import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import Database from "../Database";
import { useState } from "react";

const SearchScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    try {
      const data = await Database.searchTodos(searchText);
      setTodos(data);
    } catch (error) {
      console.log("Error searching todos", error);
    }
  };

  const renderTodoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => navigation.navigate("Detail", { todo: item })}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search todos..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate("")} //?
      >
        <Text style={styles.searchButtonText}>search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default SearchScreen;
