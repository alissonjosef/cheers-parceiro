import {isIOS} from '../Util/Commons'

export const styleNavigation = {      
    tabBarActiveTintColor:'#FF0099',
    tabBarInactiveTintColor:'#40E0D0',
    tabBarStyle: { 
      height: isIOS ? 70 : 50 ,
      paddingHorizontal: isIOS ? 15 : 10,
      paddingTop: isIOS ? 15 : 5,
      backgroundColor: 'rgba(34,36,40,0.5)',
      position: 'absolute',
      borderTopWidth: 0,
    }
}