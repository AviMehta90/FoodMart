import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    monsterReg: require('../assets/fonts/Montserrat-Regular.ttf'),
    monsterBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    monsterSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    monsterMed: require('../assets/fonts/Montserrat-Medium.ttf'),
  });