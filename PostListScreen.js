import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, RefreshControl } from 'react-native';

// Extract the API call logic into a separate function
const fetchPostsFromAPI = async (page) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const PostListScreen = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [Error, setError] = useState(false);

  const fetchPosts = async () => {
    try {
      // Fetch posts from the API
      const data = await fetchPostsFromAPI(page);

      // Sort the new data by id in ascending order
      data.sort((a, b) => a.id - b.id);

      // Filter out duplicate posts based on id
      const filteredData = data.filter((newPost) => {
        return !posts.some((existingPost) => existingPost.id === newPost.id);
      });

      // Log the ids to identify duplicates
      const postIds = posts.map((item) => item.id);
      console.log('Post IDs:', postIds);

      // Set the state with the sorted and filtered data
      setPosts((prev) => {
        // Sort the existing posts by id in ascending order
        const sortedPosts = prev.slice().sort((a, b) => a.id - b.id);
        // Combine the sorted existing posts with the new data
        return [...sortedPosts, ...filteredData];
      });
    } catch (error) {
      setError(true);
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setPosts([]);
    fetchPosts();
    setError(false);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <View style={styles.container}>
      <Button title="Refresh" onPress={handleRefresh} disabled={refreshing} data-testid="refresh-button" />
      {Error && <Text>Nothing to show!</Text>}
      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postItem}
            onPress={() => console.log('PostDetail', { post: item })} // You can replace this with your navigation logic
          >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postBody}>{item.body}</Text>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        data-testid="post-list" // Add data-testid to the FlatList
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  postItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postBody: {
    fontSize: 16,
  },
});

export default PostListScreen;
