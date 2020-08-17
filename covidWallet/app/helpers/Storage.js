import AsyncStorage from '@react-native-community/async-storage';


// change function names
export const savePassCode = async (name, value) => {
          return await AsyncStorage.setItem(name, value)
    }

export const getPassCode = async (name) => {
        try {
            const value = await AsyncStorage.getItem(name)
            return value;
        } catch (e) {
            // error reading value
        }
    }
