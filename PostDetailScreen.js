// PostDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostDetailScreen = ({ route }) => {
  const { post } = route.params;

  return (
      <View testID="post-detail" style={styles.container}>
          <Text style={styles.id}>Post Id:{post.id}</Text>
          <Text style={styles.id}>User Id:{post.userId}</Text>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  body: {
    fontSize: 18,
    },
    id: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 20,
  }
});

export default PostDetailScreen;
