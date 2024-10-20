import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { baseUrl } from "../utils/constants";
import axios from "axios";
import { RepositoryDTO } from "../types/Repository";
import Card from "../components/Card";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [list, setList] = useState<RepositoryDTO[]>([]);

  const handleSearchUser = async () => {
    if (userInput !== "") {
      const url = `${baseUrl}/${userInput}/repos`;
      try {
        const response = await axios.get<RepositoryDTO[]>(url);
        setList(response.data);
        setUserInput("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Buscador de Github</Text>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Escreva o nome de um usuário do Github"
        placeholderTextColor="#fff"
      />
      <TouchableOpacity style={styles.button} onPress={handleSearchUser}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {list.length > 0 ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.avatar}
              source={{ uri: list[0].owner.avatar_url }}
            />
            <Text style={styles.text}>{list[0].owner.login}</Text>
          </View>
          <FlatList
            data={list}
            renderItem={({ item }) => <Card repository={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : (
        <Text style={styles.text}>Sem informações</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#252525",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    marginVertical: 20,
    fontSize: 26,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    height: 50,
    width: "95%",
    backgroundColor: "#514e4e",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    height: 60,
    marginVertical: 20,
    width: "95%",
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    fontSize: 20,
    paddingLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
});

export default Home;
