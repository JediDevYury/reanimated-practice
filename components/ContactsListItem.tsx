import {Text, View, StyleSheet} from "react-native";
import {ContactInfo} from "../App";
import {Skeleton} from "moti/skeleton";
import Animated, {Layout, FadeIn} from "react-native-reanimated";

type ContactsListItemProps = {
  contact: ContactInfo | null;
}

const SkeletonCommonProps = {
  colorMode: 'light',
  transition: {
    type: 'timing',
    duration: 2000,
  },
  backgroundColor: '#D4D4D4',
} as const;

const ContactsListItem = ({contact}: ContactsListItemProps) => {

  return (
   <View style={styles.container}>
     <Skeleton.Group show={contact == null}>
       <Skeleton
        height={70}
        width={70}
        radius="round"
        {...SkeletonCommonProps}
       >
         <Animated.View
          layout={Layout}
          style={styles.profile}
          entering={FadeIn.duration(2000)}
         >
           {contact && <Text style={styles.profileText}>{contact.name[0]}</Text>}
         </Animated.View>
       </Skeleton>
       <View style={styles.contact}>
         <Skeleton
          height={30}
          width={'80%'}
          {...SkeletonCommonProps}
         >
           {contact && <Animated.Text
               style={styles.label}
               layout={Layout}
               entering={FadeIn.duration(2000)}
           >{contact.name}</Animated.Text>}
         </Skeleton>
         <View style={styles.any}/>
         <Skeleton
          height={25}
          width={'70%'}
          {...SkeletonCommonProps}
         >
           {contact && <Animated.Text
               style={styles.email}
               layout={Layout}
               entering={FadeIn.duration(2000)}
           >{contact.email}</Animated.Text>}
         </Skeleton>
       </View>
     </Skeleton.Group>
   </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profile: {
    height: 70,
    aspectRatio: 1,
    backgroundColor: '#3498db',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {fontSize: 25, color: 'white', textAlign: 'center', lineHeight: 70},
  contact: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
  },
  email: {
    fontSize: 20,
  },
  any: {
    height: 5,
  }
})

export default ContactsListItem;
