import * as React from 'react';
import { Text } from 'react-native';

export default function AnodinaRegular(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'anodina-regular' }]} />;
}
