import * as React from 'react';
import { Text } from 'react-native';

export default function BubbleText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'bubblegum-sans' }]} />;
}
