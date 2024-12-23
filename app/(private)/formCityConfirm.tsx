import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import env from '@/constants/env.ts';

export default function FormCityConfirmScreen() {

    const { id, nome, pais, data, passaporte } = useLocalSearchParams();

    function handleData(data: string | string[]): string {
        if (Array.isArray(data)) {

            return data[0];
        }
        return data;
    }

    function parseBrazilianDateToTimestamp(dateString: string): number {

        const [date1] = dateString.split(' ');
        const [date2] = date1.split(',');

        const [day, month, year] = date2.split('/').map(Number);

        const dateObj = new Date(year, month - 1, day);

        return dateObj.getTime();
    }

    const rawData: string | string[] = data;

    const validData = handleData(rawData);

    const dataTimestamp = parseBrazilianDateToTimestamp(validData);

    const query = `mutation($newCity: addCityInput) { 
        addCity(newCity: $newCity) { 
            id 
        }
    }`;

    const queryUpdate = `mutation UpdateCity($city: updateCityInput) {
        updateCity(city: $city) {
            id, pais
        } 
     }`;

    const variables = {
        newCity: { nome, pais },
    };

    const onConfirmar = async () => {

        try {
            if (id !== "undefined" && id !== undefined) {
                console.log("AQUI 1");
                const response2 = await fetch(env.API_GQL_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: queryUpdate,
                        variables: {
                            city: { id, nome, pais },
                        }
                    }),
                });

                const { data } = await response2.json();

                if (data) {

                    Alert.alert(`Cidade Alterada com Sucesso!`);
                    router.push('/(private)');
                } else {

                    Alert.alert(`Não foi possivel executar ação!`);
                }
            } else {
                
                const response = await fetch(env.API_GQL_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ query, variables }),
                });
                
                const { data } = await response.json();

                if (data) {

                    Alert.alert(`Cidade Salvar com Sucesso!`);
                    router.push('/(private)');
                } else {

                    Alert.alert(`Não foi possivel salvar cidade!`);
                }
            }
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(err.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Confirmar Dados</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.value}>{nome}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>País:</Text>
                <Text style={styles.value}>{pais}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Data:</Text>
                <Text style={styles.value}>{data}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Passaporte:</Text>
                <Text style={styles.value}>{passaporte}</Text>
            </View>
            <Pressable style={styles.button} onPress={onConfirmar}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        padding: 8,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
    },
    button: {
        marginTop: 24,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#4caf50',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});