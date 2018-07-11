import React from 'react';
import { View } from 'react-native';

const lineColor = '#eee';

export function Sline(props) {
  return (
    <View
      style={{
        backgroundColor: props.color ? props.color : lineColor,
        width: `100%`,
        height: props.height
      }}
    ></View>
  )
}
