import {StyleSheet} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



export const style = StyleSheet.create({
    title : {
        fontSize:hp('2.5%'),
        textAlign:'center', 
        color:'#FF0099',
        fontFamily:'Quicksand-Bold',
        padding:hp('2%')
    }
})