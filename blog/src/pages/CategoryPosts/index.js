import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import PostItem from "../../components/PostItem";

export default function CategoryPosts() {
  const navigation = useNavigation();
  const route = useRoute();
  const [posts, setPosts] = useState([]);

  function handleBack() {
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title === "" ? "Categoria" : route.params?.title,
    });
  }, [navigation]);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get(
        `api/categories/${route.params?.id}?fields=name&populate=posts,posts.cover`
      );
      setPosts(response.data?.data?.attributes?.posts?.data);
    }

    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      {posts.length === 0 && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Essa categoria não possui nenhum post.
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.textButton}>Encontrar posts</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PostItem data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#FFF",
  },
  warningContainer: {
    alignItems: "center",
  },
  warningText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#162133",
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 12,
    borderRadius: 4,
  },
  textButton: {
    color: "#FFF",
  },
});
