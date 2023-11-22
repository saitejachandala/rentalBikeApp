import { SafeAreaView, StatusBar, Text, View, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { Header } from '../../components/usableComponent/usableComponent'
import { LanguageContext } from '../../languages'

const termsAndConditionList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis sit nunc consectetur a. Cras leo sagittis vestibulum, tristique amet, amet tempor suspendisse quis. Nibh praesent non ut nunc. Ultrices cras aenean vivamus tincidunt tristique arcu aliquet volutpat vitae. Massa, duis vitae risus sit nibh sapien sed suspendisse lectus.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis sit nunc consectetur a. Cras leo sagittis vestibulum, tristique amet, amet tempor suspendisse quis. Nibh praesent non ut nunc. Ultrices cras aenean vivamus tincidunt tristique arcu aliquet volutpat vitae. Massa, duis vitae risus sit nibh sapien sed suspendisse lectus.Cras leo sagittis vestibulum, tristique amet, amet tempor suspendisse quis. Nibh praesent non ut nunc. Ultrices cras aenean vivamus tincidunt tristique arcu aliquet volutpat vitae. Massa, duis vitae risus sit nibh sapien sed suspendisse lectus.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis sit nunc consectetur a. Cras leo sagittis vestibulum, tristique amet, amet tempor suspendisse quis. Nibh praesent non ut nunc. Ultrices cras aenean vivamus tincidunt tristique arcu aliquet volutpat vitae. Massa, duis vitae risus sit nibh sapien sed suspendisse lectus.'
];

const TermsAndConditionsScreen = ({ navigation }) => {

    const { i18n, language } = useContext(LanguageContext);

    const isRtl = (language == 'ar');

    function tr(key) {
        return i18n.t(`termsAndConditionsScreen.${key}`)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {termsAndConditions()}
            </View>
        </SafeAreaView>
    )

    function termsAndConditions() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    termsAndConditionList.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.grayColor14Regular, marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </ScrollView>
        )
    }

    function header() {
        return (
            <Header
                headerText={tr('header')}
                isRtl={isRtl}
                arrowPress={() => navigation.pop()}
            />
        )
    }
}

export default TermsAndConditionsScreen;
