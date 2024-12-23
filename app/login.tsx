import { Image, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import TextField from '@/components/input/TextField';
import { useState, useContext } from 'react';
import { router } from 'expo-router';
import { UserActionType, UserContext, UserDispatchContext } from '@/store/UserStore';
import { ColorsConstants, FontConstans } from '@/styles/Global.style';
import env from '@/constants/env.ts';
import { styles } from '@/styles/Login.style';

export default function LoginScreen() {

    const userAuth = useContext(UserContext);
    const userAuthDispatch = useContext(UserDispatchContext);

    const [inputUser, setInputUser] = useState<string>(userAuth?.email ?? "");
    const [inputPassword, setInputPassword] = useState<string>(userAuth?.password ?? "");
    const [inputUserFeedback, setInputUserFeedback] = useState<string>("");
    const [inputPasswordFeedback, setInputPasswordFeedback] = useState<string>("");
    const [isLoading, setLoading] = useState(false);

    const loginSubmit = async () => {
        setLoading(true);
        try {
            setInputUserFeedback("");
            setInputPasswordFeedback("");
            if (inputUser && inputPassword) {
                const apiKey = env.API_KEY;
                const apiUrl = env.API_URL;
                const response = await fetch(`${apiUrl}/v1/accounts:signInWithPassword?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: inputUser,
                        password: inputPassword,
                        returnSecureToken: true,
                    })
                });
                const { status } = response;
                if (status == 200) {
                    const body = await response.json();

                    userAuthDispatch({
                        type: UserActionType.LOGAR,
                        user: {
                            email: body.email,
                            password: inputPassword,
                            token: body.idToken,
                        }
                    });
                    router.push('/(private)');
                } else if (status == 400) {
                    const body = await response.json(); 7

                    if (body.error.message == "INVALID_LOGIN_CREDENTIALS") {

                        Alert.alert(`Email ou Senha Invalidos!`);
                    } else {

                        Alert.alert(`${body.error.message}`);
                    }
                } else {
                    Alert.alert(`Status ${status}`);
                }
            } else {
                if (!inputUser) setInputUserFeedback("Preencha campo usuario.");
                if (!inputPassword) setInputPasswordFeedback("Preencha campo senha.");
            }
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>
                <TextField
                    placeholder="Usuário"
                    value={inputUser}
                    onChangeText={setInputUser}
                    feedback={inputUserFeedback}
                />
                <TextField
                    placeholder="Senha"
                    value={inputPassword}
                    onChangeText={setInputPassword}
                    feedback={inputPasswordFeedback}
                    isPassword
                />
                <Pressable style={styles.button} onPress={loginSubmit}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>
            </View>
        </View>
    );
}
