import {StyleSheet} from 'react-native'; 
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isIOS } from '../../Util/Commons';



export const Style = StyleSheet.create({
    container:{
        flex:1, 
        width:'100%',
        marginTop: hp(isIOS ? '4%' : '1.5%'),
        alignItems:'center',
    }, 
    date:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center', 
        justifyContent:'space-between',
        padding:hp('1%'), 
        borderBottomColor:'#fff',
        borderTopColor:'#fff',
        borderBottomWidth:0.2,
        borderTopWidth:0.2, 
    },
    cardValue: {
        width:'90%',
        padding:hp('7%'),
        borderBottomColor:'#fff',
        borderBottomWidth:0.3,
        marginBottom:hp('1%')
    },
    flatList:{
        width:'90%',
        marginBottom:100,
        flex:1
    },
    textPriceTitle:{
        fontSize:hp('2%'),
        color:'#40E0D0', 
        fontFamily:'Quicksand-Medium',
        textAlign:'center',
    },
    textPrice:{
        fontSize:hp('3%'),
        color:'#40E0D0', 
        fontFamily:'Quicksand-Medium', 
        textAlign:'center',
    }, 
    textCard: {
       width:'90%',
       marginTop:hp('2%'),
       marginBottom:hp('2%')
    },
    textMonth:{
        fontSize:hp('2%'),
        color:'#fff', 
        fontFamily:'Quicksand-Medium'
    },
    textHistory: {
        fontSize:hp('2%'),
        color:'#fff', 
        fontFamily:'Quicksand-Medium',
        textAlign:'left'
    }

})


