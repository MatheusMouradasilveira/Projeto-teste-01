import { View, Text, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RepositoryDTO } from "../types/Repository";

interface Props {
  repository: RepositoryDTO;
}

const Card = ({ repository }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{repository.name}</Text>
      <Text style={styles.text}>{repository.description}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather name="star" size={24} color="white" />
        <Text style={styles.text}>{repository.stargazers_count}</Text>
        <Feather name="eye" size={24} color="white" />
        <Text style={styles.text}>{repository.watchers_count}</Text>
        <View style={{ marginLeft: 10 }}>
          <Feather name="code" size={24} color="white" />
          <Text style={styles.text}>{repository.language}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 22,
  },
  container: {
    backgroundColor: "#3b3a3a",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Card;
