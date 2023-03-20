import React, {useEffect, useState} from 'react';
import {View,ScrollView,Platform} from 'react-native';


import {BackgroundImage} from '../../global/style';

import PerTextInput from '../../components/TextInput/';
import ButtonContainer from '../../components/Button/';
import ImageCard from '../../components/imageSelect/';
import Loading from '../../components/Loading/';

import RNFetchBlob from 'rn-fetch-blob';
import {styles,Container} from './style'; 
import api from '../../services/api'; 
import { getUserInfo, updateUserInfo } from '../../services/loginServices';
import { HelperText } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import { BASE_URL } from '../../Util/Constants';


const Business = (props) => {

    const [name,setName] = useState(null);
    const [description,setDescription] = useState('');
    const [address,setAddress] = useState('');
    const [schedule,setSchedule] = useState('');
    const [phone,setPhone] = useState('');
    const [instagram,setInstagram] = useState('');
    const [facebook,setFacebook] = useState('');
    const [image,setImage] = useState('');

    const [isLoading,setIsLoading] = useState(true);
    const [userData,setUserData] = useState({}); 
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('ERRO ao se comunicar com o servidor.')
    const [withError,setWithError] = useState([])

    	
    const updateData = async (data) => {
        const newData = JSON.parse(await updateUserInfo(data))
        setUserData(newData)
        setName(newData.nome_negocio?? '')
        setDescription(newData.descricao_negocio?? '')
        setAddress(newData.endereco?? '')
        setSchedule(newData.horario_funcionamento?? '')
        setPhone(newData.telefone?? '')
        setInstagram(newData.url_instagram?? '')
        setFacebook(newData.url_facebook?? '')
        setImage(newData.image_bar??'')
        setIsLoading(false)
        //setImage(newData.image_bar)
    }

    const getDataPathern = async () => {
        setIsLoading(true)
        setError(false)
     
        const tempData = JSON.parse(await getUserInfo()) 
        console.log(tempData);
        api.get('/partner',
        {headers:{
            Authorization : `bearer ${tempData.token} `
        }}).then(res => {
            const { status, data} = res
            if(status == 200 && data != null){
                updateData(data[0])
            }
            
        }).catch(error => {
            setError(true)
            setWithError(['server'])
            setIsLoading(false)
        })
    }
    
    const cleanUriIos = () => {
        if(Platform.OS === "ios") {
            console.log(image.uri)
            return image.uri.replace('file://','')
        }
        return image.uri
    }
    
    const updatePartern = async () => {
        setIsLoading(true)
        try {
            console.log( `bearer ${userData.token} `)
            
            if(checkData()){
                await RNFetchBlob.fetch(
                    'POST',
                    BASE_URL + `/editPartner`,
                    {
                        'Content-Type': 'multipart/form-data;boundary=WebKit193844043-h',
                        Authorization : `bearer ${userData.token} `
                    },
                    [
                        {
                            name: 'foto',
                            filename: Date.now() + '.png',
                            type: 'image/png',
                            data: image.uri ? RNFetchBlob.wrap(cleanUriIos()) : undefined,
                        },
                        { name : 'nome_negocio', data : name},
                        { name : 'descricao_negocio', data : description},
                        { name : 'endereco', data : address},
                        { name : 'horario_funcionamento', data : schedule},
                        { name : 'telefone', data : phone},
                        { name : 'url_facebook', data : facebook.toLowerCase()},
                        { name : 'url_instagram', data : instagram.toLowerCase()},
                    ],
                ).then(res => {
                    console.log(res)
                    if(res.respInfo.status === 204) {
                        setSuccess(true); 
                        console.log('sucesso:', success); 
                        getDataPathern()
                    }

                }) 
               
            }
        }catch(e){
            console.log('erro',e)
            setError(true)
            setErrorMessage('ERRO ao se comunicar com o servidor.')
            setWithError(['server'])
            
        }finally{
            setIsLoading(false)
        }
        
        


    }

    useEffect(()=>{
        getDataPathern(); 
    },[props]);

    const checkData = () => {
        const errors = []
        if (name.length === 0 || 
            description.length === 0 || 
            address.length === 0 || 
            schedule.length === 0 ||
            phone.length === 0) {
            setErrorMessage('Verifique os campos obrigatórios')
        }
        if (name.length === 0) 
            errors.push('name')
        if (description.length === 0) 
            errors.push('description')
        if (address.length === 0) 
            errors.push('address')
        if (schedule.length === 0) 
            errors.push('schedule')
        if (phone.length === 0) 
            errors.push('phone')
        if  (image.length === 0){
            errors.push('image')
            setErrorMessage('Você precisa adicionar uma foto ao seu negócio!')
        }
        if(instagram.length > 0 && !/^(https:|http:)\/\/(www\.)?instagram.com\/[a-zA-Z-0-9-_\-@#.]+(\/)?$/.test(instagram.toLowerCase())){
            errors.push('instagram')
            setErrorMessage('URL do instagram invalida. Tente: https://instagram.com/seu-usuario')
        }

        if(facebook.length > 0 && !/^(https:|http:)\/\/(www\.)?facebook.com\/[a-zA-Z-0-9-_\-@#.]+(\/)?$/.test(facebook.toLowerCase())){
            errors.push('facebook')
            setErrorMessage('URL do facebook invalida. Tente: https://facebook.com/seu-usuario')
        }

        setWithError(errors)
        setError(errors.length > 0)
        return errors.length == 0
    }


    return (
        <BackgroundImage>
        {isLoading ? <Loading/> :
            <Container>                       
                        
            <ImageCard img={image} stateImg={setImage} title={'Configurar meu Negócio'}/>
            <HelperText type="error" visible={error}>
                {errorMessage}
            </HelperText>
            <HelperText
                type="error"
                style={{color: 'green'}}
                visible={success}
            >
                Negócio atualizado com sucesso!!
            </HelperText>
            <Container.scrool>
                <ScrollView   keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' style={{flex:1,height:'10%'}}>                
                    <View style={styles.container}> 
                        <View style={styles.inputBox}>
                            <PerTextInput 
                            error={withError.includes('name')}
                            multiline={true} value={name} placeholder={'Nome do seu negócio'} onChangeText={(value) => setName(value)}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PerTextInput 
                                large={true}
                                error={withError.includes('description')}
                                multiline={true} 
                                value={description} 
                                placeholder={'Fale sobre seu negócio para que outras pessoas conheçam melhor!'} 
                                onChangeText={(value) => setDescription(value)}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <PerTextInput 
                            error={withError.includes('address')}
                            multiline={true} value={address} placeholder={'Endereço Completo'} onChangeText={(value) => setAddress(value)}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PerTextInput 
                            error={withError.includes('schedule')}
                            multiline={true} value={schedule} placeholder={'Horário de funcionamento'} onChangeText={(value) => setSchedule(value)}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PerTextInput 
                            keyboardType={'numeric'}
                            render={props =>
                                <TextInputMask
                                  {...props}
                                  type={'cel-phone'}
                                  options={{
                                      maskType: 'BRL',
                                      withDDD: true,
                                      dddMask: '(99) '
                                  }}
                                />
                              }
                            error={withError.includes('phone')}
                            multiline={true} value={phone} placeholder={'Telefone com (DDD)'} onChangeText={(value) => setPhone(value)}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PerTextInput
                            error={withError.includes('instagram')}
                            multiline={true} value={instagram} placeholder={'Url do seu Instagram'} onChangeText={(value) => setInstagram(value)}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PerTextInput 
                            error={withError.includes('facebook')}
                            multiline={true} value={facebook} placeholder={'Url do seu Facebook'} onChangeText={(value) => setFacebook(value)}/>
                        </View>

                        <View>

                        </View>
                    </View> 
                </ScrollView>
            </Container.scrool >
            <Container.button >
                <ButtonContainer press={updatePartern} fullSize={'100%'} title={'Salvar'}/>
            </Container.button >   
            </Container>}   
        </BackgroundImage>
    )
}


export default Business;