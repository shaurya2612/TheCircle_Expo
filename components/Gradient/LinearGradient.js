import React from 'react';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export const LinearVerticalGradient = () =>  <LinearGradient
colors={[Colors.gradient,Colors.primary]}
style={{
  position: "absolute",
  left: 0,
  right: 1,
  top: 1,
  height:300
}}
/>

export const LinearHorizontalGradient = (props) => <LinearGradient
colors={[Colors.gradient,Colors.primary]}
style={{
  position: "absolute",
  left: 0,
  right: 1,
  top: 1,
  height: props.height
}}
start={{ x: 0, y: 1 }}
end={{ x: 1, y: 1 }}
/>
