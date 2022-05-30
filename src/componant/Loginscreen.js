import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert, Pressable } from 'react-native'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-community/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage';
function Loginscreen({ navigation }) {
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([])
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email', "profile", "https://www.googleapis.com/auth/spreadsheets"],
            webClientId:
                '833513340165-q2vtem8rho5frm7rk6jcbqkr6j456hp2.apps.googleusercontent.com',
            offlineAccess: true, loginHint: '', forceConsentPrompt: false,
        });
    }, []);

    const GoogleLogin = async () => {
        try {
            // await GoogleSignin.hasPlayServices();
            //  const { accessToken, idToken } = await GoogleSignin.signIn();
            await GoogleSignin.signIn().then((user) => {
                // console.log("======", user)
                AsyncStorage.setItem("token", user.idToken)
                navigation.navigate("Google-Sheet")
            });
            setloggedIn(true);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Sign-in-Cancel', error.toString());
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Signin in progress');

            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');

            } else {
                Alert.alert("Somthing-issue", error.toString())
            }
        }
    }

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setloggedIn(false);
            setuserInfo([]);
        } catch (error) {
            Alert.alert("Sign-in  required")
        }
    };

    return (
        <View >
            <Text style={{
                alignItems: 'center', backgroundColor: 'blue',
                justifyContent: 'center', height: 50, textAlign: 'center',
            }} >Welcome!!</Text>
            <View>
                {/* <Button title='Log-out' onPress={signOut} /> */}
                {!loggedIn && <Text >User!! currently logged out</Text>}
                {loggedIn && (
                    <Button
                        onPress={signOut}
                        title="LogOut"
                        color="blue"></Button>
                )}
            </View>
            {/* <View style={{ alignItems: 'center' }}>
                <Button title='Goole_login!!' color="lightgreen" onPress={GoogleLogin} />
            </View> */}
            <View style={{ padding: 10 }}>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    style={{ width: 200, height: 48, alignItems: 'center' }}
                    onPress={GoogleLogin}
                />
            </View>
        </View>
    )
}

export default Loginscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})