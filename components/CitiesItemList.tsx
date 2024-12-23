import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Cidade from "@/models/Cidade";
import { styles } from "@/styles/CitiesItem.style";

export default function CitiesItemList(props: {
    item: Cidade | null,
    onSelected: (cidade: Cidade) => void;
}) {
    const { item, onSelected } = props;
    const { nome, pais, atualizado } = item as Cidade;
    const atualizadoFormat = new Date(atualizado).toLocaleDateString("pt-BR");

    return (
        <Pressable style={styles.card} onPress={() => onSelected(item as Cidade)}>
            <View style={styles.cardHeader}>
                <View style={styles.cityInfo}>
                    <Text style={styles.cityName}>{nome}</Text>
                    <Text style={styles.countryName}>{pais}</Text>
                </View>
                <Pressable style={styles.iconButton} onPress={() => onSelected(item as Cidade)}>
                    <MaterialIcons name="arrow-forward" size={24} color="#6200EE" />
                </Pressable>
            </View>
            <View style={styles.cardFooter}>
                <Text style={styles.updatedText}>Atualizado em: {atualizadoFormat}</Text>
            </View>
        </Pressable>
    );
}

