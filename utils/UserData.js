import {AsyncStorage} from 'react-native';

export async function saveUserData(newData) {
  try{
    debugger
  let user =  await AsyncStorage.getItem('@MySuperStore:key');
    let userDecoded = {};
  if(user)
    userDecoded = JSON.parse(user) ;
  Object.assign(userDecoded, newData);

   let tempData = await AsyncStorage.setItem('user',JSON.stringify(userDecoded));
  return userDecoded;
  } catch(e){
    console.log(e);// you can get error here
    return {
      error : 'error while saving data'
    }
  }
}

export async function getUserData (){
  try{
    debugger
    let user = await AsyncStorage.getItem('@MySuperStore:key');
    return user ? JSON.parse(user) : {};
  } catch(e){
    console.log(e);// you can get error here
    return {
      error : 'error while getting data'
    }
  }
}
