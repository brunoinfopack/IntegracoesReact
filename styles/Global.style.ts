import { Appearance } from "react-native";
const isDarkMode = Appearance.getColorScheme() == 'dark';

const FontConstans = {
    TitleSize: 26,
    familyRegular: 'Oswald',
    color: isDarkMode ? "#FFFFFF" : "#363636",
    SubtitleSize: 20,
};

const ColorsConstants = {
    backgroundColor: isDarkMode ? "#363636" : "#FFFFFF"
};

const SizeConstants = {

};

export {
    FontConstans,
    ColorsConstants,
    SizeConstants
}