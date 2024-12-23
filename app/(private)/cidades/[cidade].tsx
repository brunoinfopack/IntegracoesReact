import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { Text, Card, Button, IconButton } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import env from '@/constants/env.ts';
import Cidade from '@/models/Cidade.tsx';

export default function CidadePage() {
    const { cidade: id } = useLocalSearchParams<{ cidade?: string }>();

    const [cidade, setCidade] = useState<Cidade | null>(null);
    const [isLoading, setLoading] = useState(false);

    const getCityApi = async () => {
        setLoading(true);
        try {
            const response = await fetch(env.API_GQL_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `query {
                        city(id: "${id}", nome: "") {
                            id, nome, pais, atualizado
                        }
                    }`,
                }),
            });
            const { data } = await response.json();
            setCidade(data.city);
        } catch {
            Alert.alert('Erro', 'Não foi possível carregar os dados.');
        } finally {
            setLoading(false);
        }
    };

    const deleteCityApi = async () => {
        Alert.alert(
            'Exclusão',
            'Você tem certeza de que quer excluir esta cidade? Essa ação não pode ser desfeita.',
            [
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await fetch(env.API_GQL_URL, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    query: `mutation {
                                        ExcluirCity(id: "${id}") { id }
                                    }`,
                                }),
                            });
                            Alert.alert('Cidade Deleta com Sucesso');
                            router.push('/(private)');
                        } catch {

                            Alert.alert('Erro', 'Não foi possível excluir a cidade.');
                        } finally {
                            
                            setLoading(false);
                        }
                    },
                },
                { text: 'Cancelar', style: 'cancel' },
            ],
        );
    };

    useEffect(() => {
        getCityApi();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingWrapper}>
                <ActivityIndicator size="large" color="#4caf50" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (!cidade) {
        return (
            <View style={styles.loadingWrapper}>
                <Text style={styles.errorText}>Cidade não encontrada.</Text>
            </View>
        );
    }

    const atualizadoFormat = new Date(Number(cidade.atualizado) * 1000).toLocaleDateString('pt-BR');

    return (
        <View style={styles.pageWrapper}>
            <View style={styles.actionButtons}>
                <Button
                    mode="contained"
                    buttonColor="#2196f3"
                    icon="pencil"
                    labelStyle={styles.buttonLabel}
                    onPress={() => router.push(`/(private)/formCity?id=${id}`)}
                >
                    Editar
                </Button>
                <Button
                    mode="contained"
                    buttonColor="#f44336"
                    icon="delete"
                    labelStyle={styles.buttonLabel}
                    onPress={deleteCityApi}
                >
                    Excluir
                </Button>
            </View>

            <Card style={styles.cityCard}>
                <View style={styles.cardContent}>
                    <IconButton icon="city" size={80} color="#6200ea" />
                    <Text style={styles.cityName}>{cidade.nome}</Text>
                    <Text style={styles.cityCountry}>{cidade.pais}</Text>
                    <Text style={styles.cityUpdated}>
                        Última atualização: <Text style={styles.highlightText}>{atualizadoFormat}</Text>
                    </Text>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    pageWrapper: {
        flex: 1,
        backgroundColor: '#f1f5f9',
        padding: 16,
    },
    loadingWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    errorText: {
        fontSize: 18,
        color: '#f44336',
        fontWeight: 'bold',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    cityCard: {
        borderRadius: 12,
        elevation: 6,
        backgroundColor: '#ffffff',
        padding: 24,
        alignItems: 'center',
    },
    cardContent: {
        alignItems: 'center',
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 8,
    },
    cityCountry: {
        fontSize: 18,
        color: '#777',
    },
    cityUpdated: {
        fontSize: 16,
        color: '#555',
        marginTop: 16,
    },
    highlightText: {
        fontWeight: 'bold',
        color: '#6200ea',
    },
    buttonLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
});