import { StyleSheet } from 'react-native';
import { ColorsConstants, FontConstans } from './Global.style';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: ColorsConstants.backgroundColor,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5, // Para sombra no Android
        marginBottom: 20,
    },
    cityImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    cityDetails: {
        padding: 15,
        alignItems: 'center',
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
    },
    cityCountry: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
    },
    locationsContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Para sombra no Android
    },
    locationsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
});