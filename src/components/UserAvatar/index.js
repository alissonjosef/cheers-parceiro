import React, { useEffect, useState } from 'react';
import {View,Text} from 'react-native';
import { Avatar } from 'react-native-paper';
import { isIOS } from '../../Util/Commons';

function AvatarUser(props) {
  const { userData } = props
  const [firstLetters,setFirstLetters] = useState('')
  const [userName,setUserName] = useState('')
  useEffect(()=>{
    capitalize(userData.nome)
  },[])
  return (
    <View style={{flex:1,paddingTop:isIOS ? 25 :0}}>
      <View style={{flexDirection:'row',padding:20}}>
        <View style={{flex:1}}>
              <UserImage/>
          </View>
          <View style={{flex:3,justifyContent:'center',paddingLeft:20}}>
              <Text style={{color:'#fff'}}>{userName + `\n Id - ${userData.id}`}</Text>
          </View>
      </View>
  
    </View>
  )
  function UserImage(){
    if(userData.image == null){
      return <Avatar.Text size={80} label={firstLetters}/>
    }
    return <Avatar.Image size={80} source={require('../../assets/img/robert.jpeg')} />
  }
  function capitalize(str){
    let firstLetter,firstName,secondLetter,secondName = ''
    if(str.includes(' ')){
      str = str.split(' ')
      firstLetter = str[0].charAt(0).toUpperCase()
      firstName = str[0].slice(1).toLowerCase()
      secondLetter = str[1].charAt(0).toUpperCase()
      secondName = str[1].slice(1).toLowerCase()
      setFirstLetters(firstLetter,secondLetter)
      setUserName(firstLetter + firstName + " " + secondLetter + secondName)
    }else{
      firstLetter = str.charAt(0).toUpperCase()
      firstName = str.slice(1).toLowerCase()
      setFirstLetters(firstLetter)
      setUserName(`${firstLetter}${firstName}`)
    }


  }
}

export default AvatarUser
