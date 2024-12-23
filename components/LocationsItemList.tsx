import { View, Text, StyleSheet } from "react-native";
import Pontos from "@/models/Pontos";
import { styles } from "@/styles/LocationsItem.style";

export default function LocationsItemList({ item }: any) {
    const { nome, latitude, longitude } = item as Pontos;
    return (
        <View style={styles.itemListContainer}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>{nome}</Text>
                </View>
                <View style={styles.cardContent}>
                    <View style={styles.coordinatesRow}>
                        <Text style={styles.coordinatesLabel}>Latitude:</Text>
                        <Text style={styles.coordinatesValue}>{latitude}</Text>
                    </View>
                    <View style={styles.coordinatesRow}>
                        <Text style={styles.coordinatesLabel}>Longitude:</Text>
                        <Text style={styles.coordinatesValue}>{longitude}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

