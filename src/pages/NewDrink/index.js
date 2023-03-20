import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { BackgroundImage } from '../../global/style';

import PerTextInput from '../../components/TextInput/';
import ButtonContainer from '../../components/Button/';
import ImageCard from '../../components/imageSelect/';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RNFetchBlob from 'rn-fetch-blob';

import { styles, Container, InputSwitch, SwitchHor, ContainerHor } from './style';
import { HelperText, Switch } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import Loading from '../../components/Loading';
import { BASE_URL } from '../../Util/Constants';
import { cleanUriIos } from '../../Util/Commons';
import { useForm, Controller } from "react-hook-form";

const DrinkNew = props => {
  const { handleSubmit, control, reset, setValue } = useForm({});

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');
  const [drinkValue, setDrinkValue] = useState(0.0);
  const [userData, seUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [withError, setWithError] = useState([]);
 
  useEffect(() => {
    getData();
  }, [props]);


  function check() {
    setError(false);
    const errors = [];
    if (image.length === 0) {
      setError(true);
      errors.push('image');
    }
    if (name.length === 0) {
      setError(true);
      errors.push('name');
    }
    if (ingredients.length === 0) {
      setError(true);
      errors.push('ingredients');
    }
    if (drinkValue === 0) {
      setError(true);
      errors.push('drinkValue');
    }
    setWithError(errors);
    return errors.length <= 0;
  }

  const getData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem('userData');

      const parseData = JSON.parse(userDataJson);

      seUserData(parseData);
      setIsLoading(false);
    } catch (e) {
      true;
    }
  };

  const cleanUriIos = () => {
    if (Platform.OS === "ios") {
      console.log(image.uri)
      return image.uri.replace('file://', '')
    }
    return image.uri
  }


  const saveDrink = async () => {
 
    if (check()) {
      cleanUriIos(image?.uri)
      setIsLoading(true);
      const endpoint = `${BASE_URL}/createDrink`;
      RNFetchBlob.fetch(
        'POST',
        endpoint,
        {/*  */
          'Content-Type': 'multipart/form-data;boundary=WebKit193844043-h',
          Authorization: `bearer ${userData.token} `,
        },
        [
          {
            name: 'foto',
            filename: Date.now() + '.png',
            type: 'image/png',
            data: image.uri ? RNFetchBlob.wrap(cleanUriIos(image?.uri)) : 'false',
          },
          { name: 'name', data: name },
          { name: 'ingredients', data: ingredients },
          { name: 'value', data: `${drinkValue}` },
        ],
      )
        .then(res => {
          reset()
          console.log('drink', res.respInfo.status);

          if (res.respInfo.status !== 200) {
            setError(true);
            setWithError('save');
          } else {
            setSuccess(true);
            clearFields();
          }
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          console.log('error drink', err)
        }
        );
    }
  };
  function clearFields() {
    setName('');
    setDrinkValue('');
    setImage('');
    setIngredients('');
  }
  return (
    <BackgroundImage>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <View style={{ flex: 2 }}>
            <ImageCard
              img={image}
              stateImg={setImage}
              title={'Detalhes do Drink'}
            />
          </View>
          <Container.scrool>
            <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' style={{ flex: 1, height: '10%' }}>
              <View style={styles.container}>
                <View style={styles.containerInput}>
                  <View style={styles.nameBox}>
                    <PerTextInput
                      error={withError.includes('name')}
                      value={name}
                      placeholder={'Nome do Drink'}
                      onChangeText={value => setName(value)}
                    />
                  </View>
                  <View style={styles.valueBox}>
                    <PerTextInput
                      placeholder={'Valor'}
                      error={withError.includes('drinkValue')}
                      keyboardType="numeric"
                      render={props => (
                        <TextInputMask
                          includeRawValueInChangeText
                          {...props}
                          type={'money'}
                          options={{
                            maskType: 'BRL',
                          }}
                          onChangeText={(text, rawText) => {
                            setDrinkValue(rawText);
                          }}
                        />
                      )}
                      disableLabelAnimation
                      value={drinkValue}
                    />
                  </View>

                </View>

               {/*  <View style={{marginBottom: 20}}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                    <Controller
                      control={control}
                      name="sunday_active"
                      render={({ field: { onChange, value } }) => (
                        <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between'}}>
                          <Text style={{ color: 'white',marginRight: 10 }}>Domingo</Text>
                          <Switch value={value} onValueChange={onChange} />
                        </View>
                      )}
                    />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                        <Controller
                          name='sunday_from'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>
                      <View style={{ width: 100 }}>
                        <Controller
                          name='sunday_to'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Final'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                      <Controller
                        control={control}
                        name="monday_active"
                        render={({ field: { onChange, value } }) => (
                          <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between'}}>
                            <Text style={{ color: 'white', marginRight: 10 }}>Segunda</Text>
                            <Switch value={value} onValueChange={onChange} />
                          </View>
                        )}
                      />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>

                      <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                        <Controller
                          name='monday_from'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>

                      <View style={{ width: 100 }}>
                        <Controller
                          name='monday_to'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                    <Controller
                      control={control}
                      name="tuesday_active"
                      render={({ field: { onChange, value } }) => (
                        <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between'}}>
                          <Text style={{ color: 'white', marginRight: 10 }}>Terça</Text>
                          <Switch value={value} onValueChange={onChange} />
                        </View>
                      )}
                    />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>

                      <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                        <Controller
                          name='tuesday_from'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>

                      <View style={{ width: 100 }}>
                        <Controller
                          name='tuesday_to'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>

                      <Controller
                        control={control}
                        name="wednesday_active"
                        render={({ field: { onChange, value } }) => (
                          <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between'}}>
                            <Text style={{ color: 'white', marginRight: 10 }}>Quarta</Text>
                            <Switch value={value} onValueChange={onChange} />
                          </View>
                        )}
                      />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>

                      <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                        <Controller
                          name='wednesday_from'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>

                      <View style={{ width: 100 }}>
                        <Controller
                          name='wednesday_to'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>

                      <Controller
                        control={control}
                        name="thursday_active"
                        render={({ field: { onChange, value } }) => (
                          <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between'}}>
                            <Text style={{ color: 'white', marginRight: 10 }}>Quinta</Text>
                            <Switch value={value} onValueChange={onChange} />
                          </View>
                        )}
                      />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>

                      <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                        <Controller
                          name='thursday_from'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>

                      <View style={{ width: 100 }}>
                        <Controller
                          name='thursday_to'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                      <Controller
                        control={control}
                        name="friday_active"
                        render={({ field: { onChange, value } }) => (
                          <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between'}}>
                            <Text style={{ color: 'white', marginRight: 10 }}>Sexta</Text>
                            <Switch value={value} onValueChange={onChange} />
                          </View>
                        )}
                      />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>

                      <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                        <Controller
                          name='friday_from'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>

                      <View style={{ width: 100 }}>
                        <Controller
                          name='friday_to'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                      <Controller
                        control={control}
                        name="saturday_active"
                        render={({ field: { onChange, value } }) => (
                          <View style={{ width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between'}}>
                            <Text style={{ color: 'white', marginRight: 10 }}>Sabado</Text>
                            <Switch value={value} onValueChange={onChange} />
                          </View>
                        )}
                      />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>

                      <View style={{ width: 100, marginLeft: 20, marginRight: 20 }}>
                        <Controller
                          name='saturday_from'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>

                      <View style={{ width: 100 }}>
                        <Controller
                          name='saturday_to'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <PerTextInput
                              maxLength={2}
                              keyboardType="numeric"
                              value={value}
                              placeholder={'Hora Inicio'}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </View>
                    </View>
                  </View>
                </View> */}

                <View style={styles.inputBox}>
                  <PerTextInput
                    error={withError.includes('ingredients')}
                    value={ingredients}
                    onChangeText={value => setIngredients(value)}
                    placeholder={'Ingredientes do Drink'}
                    multi={true}
                  />
                </View>
              </View>
              <View style={{ alignItems: 'center', width: '100%' }}>
                {error ? (
                  <HelperText type="error" visible={error}>
                    {withError.includes('save')
                      ? 'Erro ao salvar Drink'
                      : 'Necessário preencher todos os campos!'}
                  </HelperText>
                ) : success ? (
                  <HelperText
                    type="error"
                    style={{ color: 'green' }}
                    visible={success}>
                    Drink inserido com sucesso!
                  </HelperText>
                ) : (
                  <></>
                )}
              </View>
            </ScrollView>
          </Container.scrool>
          <Container.button>
            <ButtonContainer
              press={handleSubmit(saveDrink)}
              fullSize={'100%'}
              title={'Adicionar Drink'}
            />
          </Container.button>
        </Container>
      )}
    </BackgroundImage>
  );
};


export default DrinkNew;
