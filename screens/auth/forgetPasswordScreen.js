import { SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { Button } from '../../components/usableComponent/usableComponent'
import { LanguageContext } from "../../languages";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import OTPTextView from "react-native-otp-textinput";
import { Overlay } from "@rneui/themed";

const ForgetPasswordScreen = ({ navigation }) => {
  const { i18n, language } = useContext(LanguageContext);

  const isRtl = language == "ar";

  function tr(key) {
    return i18n.t(`forgetPasswordScreen.${key}`);
  }

  const [verificationInput, setVerificationInput] = useState('');
  const [newPassword, setNewPassword] = useState("");
  const [newReptPassword, setNewReptPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {otpFields()}
          {newPasswordInfo()}
          {newReptPasswordInfo()}
          {verifyButton()}
        </ScrollView>
        {loadingDialog()}
      </View>
      {/* {alreadyAccountInfo()} */}
    </SafeAreaView>
  );

  function loadingDialog() {
    return (
      <Overlay isVisible={isLoading} overlayStyle={styles.dialogStyle}>
        <ActivityIndicator
          size={35}
          color={Colors.primaryColor}
          style={{ alignSelf: "center" }}
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            textAlign: "center",
            ...Fonts.blackColor16SemiBold,
          }}
        >
          {tr("wait")}
        </Text>
      </Overlay>
    );
  }

  function newPasswordInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 5.0 }}>
        <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium }}>
          {tr('passwordTitle')}
        </Text>
        <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', ...styles.textFieldWrapStyle }}>
          <Feather name="lock" size={16} color={newPassword ? Colors.primaryColor : Colors.grayColor} />
          <TextInput
            placeholder={tr('passwordPlaceholder')}
            value={newPassword}
            onChangeText={(value) => setNewPassword(value)}
            style={{ ...Fonts.blackColor14Regular, flex: 1, marginHorizontal: Sizes.fixPadding }}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            secureTextEntry={true}
            keyboardType="default"
          />
        </View>
      </View>
    );
  }

  function newReptPasswordInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 5.0 }}>
        <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium }}>
          {tr('reptPasswordTitle')}
        </Text>
        <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', ...styles.textFieldWrapStyle }}>
          <Feather name="lock" size={16} color={newReptPassword ? Colors.primaryColor : Colors.grayColor} />
          <TextInput
            placeholder={tr('reptPasswordPlaceholder')}
            value={newReptPassword}
            onChangeText={(value) => setNewReptPassword(value)}
            style={{ ...Fonts.blackColor14Regular, flex: 1, marginHorizontal: Sizes.fixPadding }}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
            secureTextEntry={true}
            keyboardType="default"
          />
        </View>
      </View>
    );
  }

  function verifyButton() {
    return (
      <Button
        btnText={tr("btnText")}
        btnStyle={styles.verifyButtonStyle}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push("BottomTabBar");
          }, 2000);
        }}
      />
    );
  }

  function otpFields() {
    return (
      <OTPTextView
        containerStyle={{
          justifyContent: "center",
          marginHorizontal: Sizes.fixPadding,
          marginVertical: Sizes.fixPadding * 2.5,
        }}
        handleTextChange={(text) => {
          setVerificationInput(text);
          if (verificationInput.length == 5) {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              navigation.push("BottomTabBar");
            }, 2000);
          }
        }}
        inputCount={6}
        keyboardType="numeric"
        tintColor={Colors.primaryColor}
        offTintColor={Colors.shadowColor}
        textInputStyle={{ ...styles.textFieldStyle }}
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor20SemiBold, textAlign: 'center', }}>
          {tr('forgetPassword')}
        </Text>
        <MaterialIcons
          name={isRtl ? "arrow-forward" : "arrow-back"}
          size={20}
          color={Colors.blackColor}
          style={{ position: 'absolute', bottom: 10.0, right: isRtl ? 0.0 : null, }}
          onPress={() => navigation.pop()}
        />
      </View>
    );
  }
}

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  textFieldWrapStyle: {
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    borderBottomWidth: 0.0,
  },
  textFieldStyle: {
    width: 40.0,
    height: 40.0,
    borderBottomWidth: null,
    borderRadius: Sizes.fixPadding - 2.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderWidth: 1.0,
    ...Fonts.blackColor16Medium,
    lineHeight: 22.0,
  },
  dialogStyle: {
    width: "80%",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 3.5,
    paddingTop: Sizes.fixPadding * 3.0,
    elevation: 3.0,
  },
  verifyButtonStyle: {
    marginTop: Sizes.fixPadding * 6.0,
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
  },
  headerWrapStyle: {
    margin: Sizes.fixPadding * 2.0,
    justifyContent: 'center',
  },
  animatedView: {
    backgroundColor: Colors.lightBlackColor,
    position: "absolute",
    bottom: 20,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  enterCodeInfoTextStyle: {
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 3.0,
    textAlign: "center",
    ...Fonts.grayColor14Medium,
  },
});
