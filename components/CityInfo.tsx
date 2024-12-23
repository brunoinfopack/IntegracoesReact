import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Cidade from "@/models/Cidade";
import LocationsList from './LocationsList';
import { styles } from '@/styles/CityInfo.style copy';

export default function CityInfo(props: { cidade: Cidade }) {
    const { cidade } = props;
    const { nome, pais, pontos } = cidade;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Imagem de destaque */}

                {/* Informações da cidade */}
                <View style={styles.cityDetails}>
                    <Text style={styles.cityName}>{nome}</Text>
                    <Text style={styles.cityCountry}>
                        <FontAwesome name="globe" size={16} color="#777" /> {pais}
                    </Text>
                </View>
            </View>

            {/* Lista de pontos */}
            {pontos && (
                <View style={styles.locationsContainer}>
                    <Text style={styles.locationsTitle}>Pontos Turísticos:</Text>
                    <LocationsList pontos={pontos} />
                </View>
            )}
        </View>
    );
}


