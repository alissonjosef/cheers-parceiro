import {Alert,Platform} from 'react-native'; 

export const isIOS  = Platform.OS === 'ios';

export const cleanUriIos = (image) => {
    if(Platform.OS === "ios") {
        console.log(image.uri)
        return image.uri.replace('file://','')
    }
    return image.uri
}

export const success = (mensagem) => {
    return Alert.alert(mensagem);
}

export const error = (mensagem) => {
    return Alert.alert(mensagem);
}