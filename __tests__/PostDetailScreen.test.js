import React from 'react';
import { render } from '@testing-library/react-native';
import PostDetailScreen from '../PostDetailScreen';

describe('PostDetailScreen', () => {
  const post = {
    id: 1,
    userId: 1,
    title: 'Example Title',
    body: 'Example Body',
  };

  it('renders the PostDetailScreen component', () => {
    const { getByText, getByTestId } = render(<PostDetailScreen route={{ params: { post } }} />);

    // Assert the presence of specific elements and their content
    expect(getByTestId('post-detail')).toBeTruthy();
    expect(getByText(`Post Id:${post.id}`)).toBeTruthy();
    expect(getByText(`User Id:${post.userId}`)).toBeTruthy();
    expect(getByText(post.title)).toBeTruthy();
    expect(getByText(post.body)).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { toJSON } = render(<PostDetailScreen route={{ params: { post } }} />);

    // Use snapshots to compare the rendered component with a saved snapshot
    expect(toJSON()).toMatchSnapshot();
  });
});
