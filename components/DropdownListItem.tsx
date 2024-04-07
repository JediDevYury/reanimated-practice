import {StyleSheet, useWindowDimensions, View, Text} from 'react-native';
import {DropdownItemType} from "./Dropdown";
import Color from "color";
import Animated, {useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";

type DropdownListItemProps = {
  item: DropdownItemType;
  index: number;
  dropdownItemsCount: number;
  isExpanded: {
    value: boolean;
  }
};

const dropdownHeight = 85;
const margin = 10;

const DropdownListItem = ({index, dropdownItemsCount, isExpanded, item}: DropdownListItemProps) => {
  const {width: windowWidth} = useWindowDimensions()
  const fullDropdownHeight = dropdownItemsCount * (dropdownHeight + margin);
  const collapsedTop = fullDropdownHeight / 2 - dropdownHeight;
  const expandedTop = (dropdownHeight + margin) * index;

  const expandedScale = 1;
  const collapsedScale = 1 - index * 0.05;

  const expandedBackground = '#1B1B1B';

  const collapsedBackground = Color(expandedBackground)
   .lighten(index * 0.1)
   .hex();

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isExpanded.value ? expandedBackground : collapsedBackground),
      top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
      transform: [
        {
          scale: withSpring(isExpanded.value ? expandedScale : collapsedScale),
        },
        {
          translateY: fullDropdownHeight / 2,
        },
      ]
    };
  });

  const rHeaderArrowIconStyle = useAnimatedStyle(() => {
    const animation = isExpanded.value ? '90deg' : '0deg'
    return {
      transform: [
        {
          rotate: withTiming(animation)
        }
      ]
    };
  });

  const rLeftIconOpacityStyle = useAnimatedStyle(() => {
    const animation = isExpanded.value ? 1 : 0;
    return {
      opacity: withTiming(animation),
    };
  });

  const isHeader = index === 0;

  return (
   <Animated.View
    onTouchEnd={() => {
      if (!isHeader) return;
      isExpanded.value = !isExpanded.value;
    }}
    style={[styles.container, {
     width: windowWidth * 0.95,
     height: dropdownHeight,
     borderRadius: 10,
      zIndex: dropdownItemsCount - index,
   }, rStyle]}>
     <View style={styles.content}>
       <Animated.View style={[
         styles.iconContainer,
         {
           left: 15,
         },
         !isHeader && rLeftIconOpacityStyle
       ]}>
         <AntDesign name={item.iconName as any} size={25} color={"#D4D4D4"} />
       </Animated.View>
       <Text style={styles.label}>{item.label}</Text>
       <Animated.View style={[
         styles.iconContainer,
         {
           right: 15,
           backgroundColor: 'transparent',
         },
         isHeader && rHeaderArrowIconStyle
       ]}>
         <MaterialIcons
          name={
           isHeader ? 'arrow-forward' : 'arrow-back'
          }
          size={25}
          color={"#D4D4D4"} />
       </Animated.View>
     </View>
   </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#D4D4D4',
    fontSize: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.2
  },
  iconContainer: {
    position: 'absolute',
    width: 45,
    aspectRatio: 1,
    backgroundColor: '#111',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default DropdownListItem;
