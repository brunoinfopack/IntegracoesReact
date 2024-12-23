import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, NativeModules, useWindowDimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cidade from "@/models/Cidade";
import CitiesList from '@/components/CitiesList';
import CityInfo from '@/components/CityInfo';
import { router } from 'expo-router';
import env from "@/constants/env.ts";
import { UserContext } from "@/store/UserStore";
import { ActivityIndicator, Text, Appbar, Menu } from "react-native-paper";
import { ColorsConstants } from '@/styles/Global.style';

export default function PrivateScreen() {
    const userAuth = useContext(UserContext);
    const [cidades, setCidades] = useState<Array<Cidade> | null>(null);
    const [cidade, setCidade] = useState<Cidade | null>(null);
    const { width, height } = useWindowDimensions();
    const isPortrait = width < height;
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<String | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);

    const getCitiesApi = async () => {
        setLoading(true);
        try {
            const response = await fetch(env.API_GQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `query {
                        cities {
                          id
                          nome
                          pais
                          atualizado
                        }
                      }`,
                }),
            });
            const { data } = await response.json();
            setCidades(data.cities);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const Logout = () => {
        const { DevSettings } = NativeModules;
        DevSettings.reload();
    };

    useEffect(() => {
        getCitiesApi();
    }, []);

    const selecionarCidade = (cidade: Cidade) => {
        if (isPortrait)
            router.push(`/cidades/${cidade.id}`);
        else
            setCidade(cidade);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Minhas Cidades" />
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <Appbar.Action
                            icon="menu"
                            color="#fff"
                            onPress={() => setMenuVisible(true)}
                        />
                    }>
                    <Menu.Item
                        title={`Usuário: ${userAuth?.email || "Desconhecido"}`}
                        onPress={() => {}}
                    />
                    <Menu.Item
                        title={`Status: ${userAuth?.status ? "Ativo" : "Inativo"}`}
                        onPress={() => {}}
                    />
                    <Menu.Item
                        title="Logout"
                        onPress={Logout}
                    />
                </Menu>
            </Appbar.Header>

            {/* Content */}
            <View style={isPortrait ? styles.listContainerPortrait : styles.listContainerLandscape}>

                {isLoading && <ActivityIndicator size={100} />}

                {message && <Text variant="titleSmall">{message}</Text>}

                {!isLoading && cidades && (
                    <CitiesList
                        cidades={cidades}
                        onSelected={selecionarCidade}
                        refreshingAction={getCitiesApi}
                    />
                )}

                <View style={styles.actionButtons}>
                    <Pressable
                        style={[styles.button, styles.buttonForm]}
                        onPress={() => router.push('/(private)/formCity')}>
                        <Text style={styles.buttonLabel}>Formulario</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonLocation]}
                        onPress={() => router.push('/(private)/location')}>
                        <Text style={styles.buttonLabel}>Mapa</Text>
                    </Pressable>
                </View>
            </View>

            {!isPortrait && cidade && (
                <View style={styles.cityInfoContainer}>
                    <CityInfo cidade={cidade} />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ColorsConstants.backgroundColor,
    },
    container: {
        flex: 1,
        backgroundColor: '#f4f4f6',
        padding: 16,
    },
    header: {
        backgroundColor: '#6200EE',
        width: '100%',
    },
    listContainerPortrait: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    listContainerLandscape: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    actionButtons: {
        marginTop: 20,
        width: '100%',
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        elevation: 4,
    },
    buttonLocation: {
        backgroundColor: '#0000FF',
    },
    buttonForm: {
        backgroundColor: '#778899',
    },
    buttonLabel: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    cityInfoContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 4,
    },
});
