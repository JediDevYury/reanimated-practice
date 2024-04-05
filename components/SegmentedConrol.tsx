import {Text, View, StyleSheet, useWindowDimensions, TouchableOpacity} from 'react-native';
import {memo} from "react";
import {Palette} from "../constants";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onSelect?: (option: string) => void;
};

const SegmentedControl = memo((
 {
  options,
  selectedOption,
  onSelect
 }: SegmentedControlProps) => {
  const {width: windowWidth} = useWindowDimensions()
  const internalPadding = windowWidth * 0.05;
  const segmentedControlWidth = windowWidth - internalPadding;

  const controlWidth = (segmentedControlWidth - internalPadding) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
       controlWidth * options.indexOf(selectedOption) + internalPadding / 2,
      ),
      right: withTiming(controlWidth * (options.length - options.indexOf(selectedOption) - 1) + internalPadding / 2),
    };
  }, [selectedOption, options, controlWidth]);


  return (
   <View style={[
     styles.container,
     {
       width: segmentedControlWidth,
       borderRadius: 20,
       paddingHorizontal: internalPadding / 4,
     }
   ]}>
     <Animated.View style={[{
        width: controlWidth,
     }, rStyle, styles.activeBox]}/>
     {options.map((option) => {
       return (
        <TouchableOpacity key={option}
          onPress={() => onSelect?.(option)} style={[
          {
            width: controlWidth
          },
          styles.labelContainer
        ]}>
          <Text key={option} style={{
            ...styles.label,
          }}>
            {option}
          </Text>
        </TouchableOpacity>
       )
     })}
   </View>)
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: Palette.baseGray05,
    justifyContent: 'space-between',
  },
  activeBox: {
    position: 'absolute',
    top: '10%',
    height: '80%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 3,
    backgroundColor: 'white',
  },
  labelContainer: { justifyContent: 'center', alignItems: 'center' },
  label: {
    fontFamily: 'SF-Compact-Rounded-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SegmentedControl;
