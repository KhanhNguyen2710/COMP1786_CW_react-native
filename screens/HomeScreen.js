import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Database from "../Database";
import { TextInput } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getTodos();
        setTodos(data);
      } catch (error) {
        console.log("Error fetching todos", error);
      }
    };

    fetchData();
  }, [isFocused]);


  const handleDeleteTodo = async (id) => {
    await Database.deleteTodo(id);
    const data = await Database.getTodos();
    setTodos(data);
  };

    const handleDeleteTodoAll = async () => {
      Database.deleteAllTodo();
      const data = await Database.getTodos();
      setTodos(data);
    };


  const renderTodoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => navigation.navigate("Detail", { todo: item })}
    >
      <Text style={{ fontSize: 20 }}>{item.name}</Text>
      <Text style={{ fontSize: 15 }}>{item.location}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate("Update", { todo: item })}
        >
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTodo(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.deleteAllButton}
        onPress={() => handleDeleteTodoAll()}
      >
        <Text style={styles.deleteButtonText}>Delete All</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20 }}>This is a Hike list:</Text>

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Entry")}
      >
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1, 
    borderColor: "gray", 
    padding: 20, 
    borderRadius: 8, 
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  updateButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },

  updateButtonText: {
    color: "white",
  },

  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },

  deleteButtonText: {
    color: "white",
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  deleteAllButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
    marginLeft: 279,
  },
});

export default HomeScreen;
