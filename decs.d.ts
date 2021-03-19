declare module 'react-native-user-avatar' {
    import { StyleProp, ImageStyle, ViewStyle } from 'react-native'
  
    const component:React.ComponentType<{
      name: string;
      src?: string;
      bgColor?: string;
      bgColors?: string[];
      textColor?: string;
      size?: number;
      imageStyle?: StyleProp<ImageStyle>;
      style?: StyleProp<ViewStyle>;
      borderRadius?: number;
      component?: React.ComponentType;
    }>;
  
    export default component;
  }