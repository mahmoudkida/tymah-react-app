import * as React from 'react';
import { Text } from 'react-native';

export default function AnodinaBold(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'anodina-bold' }]} />;
}
