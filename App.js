import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Separator = () => <View style={styles.separator}></View>;

export default function App() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);

  const onChange = (value) => {
    setInput(value);
  };

  const submit = () => {
    if (!input) return;
    setTodo([
      ...todo,
      {
        id: todo.length + 1,
        title: input,
        completed: false,
      },
    ]);
    setInput("");
  };

  const removeTodo = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const handleComplete = (id) => {
    const newTodo = todo.map((item) => {
      if (item.id !== id) return { ...item };
      return { ...item, completed: !item.completed };
    });
    setTodo(newTodo);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
        My Todo App
      </Text>
      <Separator />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          onChangeText={onChange}
          value={input}
          onSubmitEditing={submit}
        />
        <Button title="Add" color={"pink"} onPress={submit} />
      </View>

      <Separator />

      <View>
        {todo.map((todo, i) => (
          <View
            key={todo.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 20,
                textDecorationLine: !todo.completed ? "none" : "line-through",
                textDecorationColor: "white",
                textDecorationStyle: "solid",
              }}
            >
              {todo.title}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingHorizontal: 10,
                borderRadius: 8,
              }}
              onPress={() => handleComplete(todo.id)}
            >
              <Text style={{ color: "black", fontSize: 20 }}>
                {todo.completed ? "đã hoàn thành" : "chưa hoàn thành"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeTodo(todo.id)}
              style={{
                backgroundColor: "yellow",
                paddingHorizontal: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "black", fontSize: 20 }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    padding: 20,
    paddingTop: 50,
  },

  separator: {
    height: 2,
    backgroundColor: "white",
    marginVertical: 20,
  },

  inputContainer: {
    flexDirection: "row",
    gap: 20,
  },

  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 18,
  },
});
