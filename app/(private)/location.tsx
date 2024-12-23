import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, FlatList } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, MapPressEvent, LatLng, Region } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker"; // Importando o Picker correto

interface MarkerData extends LatLng {
    description: string;
    mapColor: string;
}

export default function LocationScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [markers, setMarkers] = useState<Array<MarkerData>>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [region, setRegion] = useState<Region | undefined>(undefined);
    const [description, setDescription] = useState<string>("");
    const [mapColor, setMapColor] = useState<string>("#fff");
    const [showCoordinates, setShowCoordinates] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setMessage("A permissão foi negada!");
            } else {
                let location = await Location.getCurrentPositionAsync();
                setLocation(location);
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const markersStorage = await AsyncStorage.getItem("markers");
            if (markersStorage) {
                setMarkers(JSON.parse(markersStorage));
            }
        })();
    }, []);

    const handleMapPress = async (mapPress: MapPressEvent) => {
        if (!description || mapColor === "#fff") {
            Alert.alert("Atenção", "Por favor, preencha o nome e selecione uma cor antes de salvar o marcador.");
            return;
        }

        const { coordinate } = mapPress.nativeEvent;
        const newMarker: MarkerData = { ...coordinate, description, mapColor };

        const markersStorage = await AsyncStorage.getItem("markers");
        let markersList: Array<MarkerData> = markersStorage ? JSON.parse(markersStorage) : [];
        markersList.push(newMarker);
        await AsyncStorage.setItem("markers", JSON.stringify(markersList));
        setMarkers(markersList);
        setDescription("");
    };

    const clearMarkers = async () => {
        await AsyncStorage.removeItem("markers");
        setMarkers([]);
    };

    const viewSavedCoordinates = () => {
        if (markers.length === 0) {
            Alert.alert("Nenhuma coordenada salva", "Não há coordenadas salvas.");
        } else {
            setShowCoordinates(true);
        }
    };

    const renderCoordinateItem = ({ item, index }: { item: MarkerData, index: number }) => (
        <View style={styles.coordinateItem}>
            <Text style={styles.coordinateText}>
                {index + 1}: Descrição: {item.description || "N/A"}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Localização</Text>
                {location && (
                    <Text style={styles.coordinatesText}>
                        Lat: {location.coords.latitude.toFixed(2)}, Long: {location.coords.longitude.toFixed(2)}
                    </Text>
                )}
            </View>
            {message && <Text style={styles.messageText}>{message}</Text>}

            <MapView
                style={styles.locationMapView}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation
                onPress={handleMapPress}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        draggable
                        coordinate={marker}
                        title={`Descrição: ${marker.description}`}
                        pinColor={marker.mapColor}
                    />
                ))}
            </MapView>

            <View style={styles.settingsContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Descrição do marcador"
                    value={description}
                    onChangeText={setDescription}
                />
                <Text style={styles.subHeaderText}>Escolha uma cor:</Text>
                <Picker
                    selectedValue={mapColor}
                    onValueChange={(itemValue) => setMapColor(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Azul Claro" value="#f0f8ff" />
                    <Picker.Item label="Verde Claro" value="#d1ffd1" />
                    <Picker.Item label="Rosa Claro" value="#ffd1d1" />
                    <Picker.Item label="Azul Claro (padrão)" value="#d1d1ff" />
                    <Picker.Item label="Amarelo Claro" value="#ffff99" />
                </Picker>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearMarkers}>
                    <Text style={styles.buttonText}>Limpar Marcadores</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={viewSavedCoordinates}>
                    <Text style={styles.buttonText}>Visualizar Coordenadas</Text>
                </TouchableOpacity>
            </View>

            {/* Exibindo as coordenadas salvas com FlatList */}
            {showCoordinates && (
                <View style={styles.coordinatesListContainer}>
                    <FlatList
                        data={markers}
                        renderItem={renderCoordinateItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setShowCoordinates(false)}>
                        <Text style={styles.buttonText}>Fechar Lista</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f6f9",
        padding: 10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    coordinatesText: {
        fontSize: 14,
        color: "#555",
    },
    messageText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
    locationMapView: {
        flex: 1,
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 15,
    },
    settingsContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    subHeaderText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    picker: {
        height: 50,
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    clearButton: {
        backgroundColor: "#ff6666",
    },
    viewButton: {
        backgroundColor: "#4caf50",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    coordinatesListContainer: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 15,
    },
    coordinateItem: {
        paddingVertical: 10,
    },
    coordinateText: {
        fontSize: 16,
        color: "#333",
    },
    closeButton: {
        padding: 10,
        backgroundColor: "#4caf50",
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
    },
});