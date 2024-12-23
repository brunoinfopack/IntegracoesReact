import { StyleSheet } from 'react-native';
import { ColorsConstants, FontConstans } from './Global.style';

export const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cityInfo: {
        flex: 1,
    },
    cityName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    countryName: {
        fontSize: 16,
        color: '#777',
    },
    iconButton: {
        marginLeft: 10,
    },
    cardFooter: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
        marginTop: 10,
    },
    updatedText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'right',
    },
});
