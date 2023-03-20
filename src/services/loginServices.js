import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getUserInfo() {
  return AsyncStorage.getItem('userData');
}

export async function LogoutUser() {
  const tempData = await AsyncStorage.getItem('userData');
  if (tempData != null) {
    AsyncStorage.removeItem('userData');
    return true;
  }
  return false;
}

export async function updateUserInfo(userData) {
  const tempData = JSON.parse(await AsyncStorage.getItem('userData'));
  if (tempData.id != userData.id) {
    return false;
  }
  tempData.descricao_negocio = userData.descricao_negocio;
  tempData.endereco = userData.endereco;
  tempData.horario_funcionamento = userData.horario_funcionamento;
  tempData.nome_negocio = userData.nome_negocio;
  tempData.telefone = userData.telefone;
  tempData.url_facebook = userData.url_facebook;
  tempData.url_instagram = userData.url_instagram;
  tempData.image_bar = userData.image_bar;
  await AsyncStorage.setItem('userData', JSON.stringify(tempData));
  return AsyncStorage.getItem('userData');
}
