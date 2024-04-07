import DropdownListItem from "./DropdownListItem";
import {useSharedValue} from "react-native-reanimated";

export type DropdownItemType = {
  label: string;
  iconName: string;
};

type DropdownProps = {
  header: DropdownItemType;
  options: DropdownItemType[];
};


const Dropdown = ({header, options}: DropdownProps) => {
  const dropdownItems = [header, ...options];
  const isExpanded = useSharedValue(false)

  return (
   <>
     {
       dropdownItems.map((item, index) => {
         return <DropdownListItem
          key={item.label}
          item={item}
          index={index}
          dropdownItemsCount={dropdownItems.length}
          isExpanded={isExpanded}
         />
       })
     }
   </>
  );
};

export default Dropdown;
