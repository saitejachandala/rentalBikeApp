import React, { useContext, useState } from 'react';
import { Text, TextInput, View, SafeAreaView, StatusBar, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { Header, Button } from '../../components/usableComponent/usableComponent'
import { LanguageContext } from '../../languages';

const PersonalInformationScreen = ({ navigation }) => {
  const { i18n, language } = useContext(LanguageContext);
  const isRtl = language === 'ar';

  function tr(key) {
    return i18n.t(`personalInformationScreen.${key}`);
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleContinue = () => {
    const data = {
      Name: name,
      Emailid: email,
      PhoneNo: phoneNumber,
      Address: address,
      IsActive: 1,
    };

    const url = 'https://192.168.1.6:44347/api/Test/Personalinfo';
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Response Data:', response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
        console.log('Error Details:', error.response);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {nameInfo()}
          {emailInfo()}
          {phoneNumberInfo()}
          {addressInfo()}
        </ScrollView>
      </View>
      {continueButton()}
    </SafeAreaView>
  );

  function continueButton() {
    return (
      <Button
      btnText={tr("btnText")}
      btnStyle={{ borderRadius: 0.5 }}
        onPress={() => {
          handleContinue();
          navigation.push('UploadDocument');
        }}
      />
    );
  }

  function addressInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 10.0 }}>
        <Text style={{ marginBottom: Sizes.fixPadding - 8.0, ...Fonts.blackColor16Medium }}>
          {tr('addressTitle')}
        </Text>
        <TextInput
          placeholder={tr('addressPlaceHolder')}
          style={styles.textFieldStyle}
          placeholderTextColor={Colors.grayColor}
          selectionColor={Colors.primaryColor}
          multiline={true}
          numberOfLines={5}
          textAlignVertical='top'
          onChangeText={(value) => handleAddressChange(value)}
        />
      </View>
    );
  }

  function handleAddressChange(value) {
    setAddress(value);
  }

  function phoneNumberInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 10.0 }}>
        <Text style={{ marginBottom: Sizes.fixPadding - 8.0, ...Fonts.blackColor16Medium }}>
          {tr('phoneTitle')}
        </Text>
        <TextInput
          placeholder={tr('phonePlaceHolder')}
          style={styles.textFieldStyle}
          placeholderTextColor={Colors.grayColor}
          selectionColor={Colors.primaryColor}
          keyboardType="phone-pad"
          onChangeText={(value) => handlePhoneNumberChange(value)}
        />
      </View>
    );
  }

  function handlePhoneNumberChange(value) {
    setPhoneNumber(value);
  }

  function emailInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 10.0 }}>
        <Text style={{ marginBottom: Sizes.fixPadding - 8.0, ...Fonts.blackColor16Medium }}>
          {tr('emailTitle')}
        </Text>
        <TextInput
          placeholder={tr('emailPlaceHolder')}
          style={styles.textFieldStyle}
          placeholderTextColor={Colors.grayColor}
          selectionColor={Colors.primaryColor}
          keyboardType="email-address"
          onChangeText={(value) => handleEmailChange(value)}
        />
      </View>
    );
  }

  function handleEmailChange(value) {
    setEmail(value);
  }

  function nameInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 10.0 }}>
        <Text style={{ marginBottom: Sizes.fixPadding - 8.0, ...Fonts.blackColor16Medium }}>
          {tr('nameTitle')}
        </Text>
        <TextInput
          placeholder={tr('namePlaceHolder')}
          style={styles.textFieldStyle}
          placeholderTextColor={Colors.grayColor}
          selectionColor={Colors.primaryColor}
          onChangeText={(value) => handleNameChange(value)}
        />
      </View>
    );
  }

  function handleNameChange(value) {
    setName(value);
  }

  function header() {
    return (
      <Header
        headerText={tr('header')}
        isRtl={isRtl}
        arrowPress={() => navigation.pop()}
      />
    );
  }
};

export default PersonalInformationScreen;

const styles = StyleSheet.create({
  textFieldStyle: {
    ...Fonts.blackColor14Regular,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding - 3.0,
  }
});
