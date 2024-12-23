import { StyleSheet } from 'react-native';
import { ColorsConstants, FontConstans } from './Global.style';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorsConstants.backgroundColor,
        padding: 20,
    },
    logoContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 25,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: FontConstans.TitleSize,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: FontConstans.familyRegular,
    },
    subtitle: {
        fontSize: FontConstans.SubtitleSize,
        color: FontConstans.color,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: FontConstans.familyRegular,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: FontConstans.color,
        fontFamily: FontConstans.familyRegular,
        fontWeight: 'bold',
        fontSize: 16,
    },
    forgotPassword: {
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        color: '#007bff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});