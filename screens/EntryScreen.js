import React, { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Database from "../Database";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const EntryScreen = ({ navigation }) => {
  const handleScreenPress = () => {
    // Đóng bàn 
    Keyboard.dismiss();
  };
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isHikeYes, setIsHikeYes] = useState(false);
  const [length, setLength] = useState("");
  const [level, setLevel] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [des, setDes] = useState("");


  const [date, setDate] = React.useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };
// picker
const handlePickerChange = (itemValue) => {
  setLevel(itemValue);
  setShowPicker(false);
};

  const dateString = date.toISOString();
  const formattedDate = dateString.substring(0, 10); //format
  
//data
  const handleAddTodo = async () => {
    const parking = isHikeYes ? "yes" : "no";
    // Check if any required field is missing
    if (!name || !location || !date || !parking || !length || !level || !des) {
      Alert.alert("Error", "Please enter all required information");
      return;
    }
    // Create a message
    const message = `Name: ${name}\n
    Location: ${location}\n
    Date: ${date}\n
    Parking: ${parking}\n
    Length of the hike: ${length}\n
    Difficulty level: ${level}\n
    Description: ${des}`;
    // Display 
    Alert.alert("Confirm Information", message, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: async () => {
          await Database.addTodo(
            name,
            location,
            formattedDate,
            parking,
            length,
            level,
            des
          );
          navigation.goBack();
        },
      },
    ]);
  };
  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <Text style={styles.label}>Name of the hike:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          autoFocus={false}
        />
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter Location"
        />
        <Text style={styles.label}>Date of the hike:</Text>
        <View style={styles.buttonDate}>
          <Button
            title={date.toLocaleDateString()}
            onPress={showDatePicker}
            color={"#000000"}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            value={date}
          />
        </View>
        <Text style={styles.label}>Parking available ?</Text>
        <View style={styles.radioButtonsContainer}>
          <RadioButton
            value="yes"
            status={isHikeYes ? "checked" : "unchecked"}
            onPress={() => setIsHikeYes(true)}
          />
          <Text>Yes</Text>
          <RadioButton
            value="no"
            status={!isHikeYes ? "checked" : "unchecked"}
            onPress={() => setIsHikeYes(false)}
          />
          <Text>No</Text>
        </View>
        <View style={styles.lengthContainer}>
          <Text style={styles.label}>Length of the hike:</Text>
          <TextInput
            style={styles.input}
            value={length}
            onChangeText={setLength}
            placeholder="Enter Length"
            keyboardType="numeric"
            maxLength={5}
          />
        </View>
        {/* picker */}
        <View>
          <Text style={styles.label}>Level:</Text>
          <Text
            onPress={() => setShowPicker(!showPicker)}
            style={styles.selectedValue}
          >
            Selected Level: {level}
          </Text>
          {showPicker && (
            <Picker selectedValue={level} onValueChange={handlePickerChange}>
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Low" value="Low" />
            </Picker>
          )}
        </View>
        {/* des */}
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={des}
          onChangeText={setDes}
          placeholder="Enter description"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  buttonDate: {
    fontSize: 20,
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
    padding: 5,
    borderRadius: 16,
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

  buttonDate: {
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 16,
  },
  radioButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  lengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // picker: {
  //   height: 10,
  //   width: "100%",
  // },

  selectedValue: {
    // marginTop: 10,
    fontSize: 16,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default EntryScreen;
