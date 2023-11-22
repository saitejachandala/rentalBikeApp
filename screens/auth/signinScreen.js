import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useContext, useState, useCallback } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Button } from "../../components/usableComponent/usableComponent";
import { LanguageContext } from "../../languages";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const SigninScreen = ({ navigation }) => {
  const { i18n, language } = useContext(LanguageContext);

  const isRtl = language == "ar";

  function tr(key) {
    return i18n.t(`signinScreen.${key}`);
  }

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);
  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {signinOptionsInfo()}
          {emailIdInfo()}
          {passwordInfo()}
          {forgetPasswordInfo()}
          {signinButton()}
        </ScrollView>
      </View>
      {dontAccountInfo()}
      {exitInfo()}
    </SafeAreaView>
  );

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={[styles.animatedView]}>
        <Text
          style={{
            paddingTop: Sizes.fixPadding - 8.0,
            lineHeight: 15.0,
            ...Fonts.whiteColor12Medium,
          }}
        >
          {tr("exit")}
        </Text>
      </View>
    ) : null;
  }

  function dontAccountInfo() {
    return (
      <>
      <Text
        style={{
          textAlign: "center",
          marginVertical: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor14Medium }}>
          {tr("dontAccountInfo")} {}
        </Text>
        <Text
          onPress={() => navigation.push("Signup")}
          style={{ ...Fonts.primaryColor14Medium }}
        >
          {tr("signup")}
        </Text>
      </Text>
      </>
      
    );
  }

  function signinButton() {
    return (
      <Button
        btnText={tr("btnText")}
        btnStyle={styles.signinButtonStyle}
        onPress={() => navigation.push("Verification")}
      />
    );
  }

  function emailIdInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor16Medium,
          }}
        >
          {tr("emailIdTitle")}
        </Text>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.textFieldWrapStyle,
          }}
        >
          <Feather
            name="mail"
            size={16}
            color={emailId ? Colors.primaryColor : Colors.grayColor}
          />
          <TextInput
            placeholder={tr("emailIdPlaceHolder")}
            value={emailId}
            onChangeText={(value) => setemailId(value)}
            keyboardType="default"
            style={{
              ...Fonts.blackColor14Regular,
              flex: 1,
              marginHorizontal: Sizes.fixPadding,
            }}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <View style={{ height: 10 }} />
      </View>
    );
  }


  function passwordInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor16Medium,
          }}
        >
          {tr("passwordTitle")}
        </Text>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.textFieldWrapStyle,
          }}
        >
          <Feather
            name="lock"
            size={16}
            color={password ? Colors.primaryColor : Colors.grayColor}
          />
          <TextInput
            placeholder={tr("passwordPlaceholder")}
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry = {true}
            keyboardType="default"
            style={{
              ...Fonts.blackColor14Regular,
              flex: 1,
              marginHorizontal: Sizes.fixPadding,
            }}
            placeholderTextColor={Colors.grayColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function forgetPasswordInfo() {
    return (
      <>
      <Text
        style={{
          textAlign: "left",
          marginVertical: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.primaryColor14SemiBold }}
          onPress={() => navigation.push("ForgetPassword")}
        >
          {tr("forgotpassword")} {}
        </Text>
        <Text
          
          style={{ ...Fonts.primaryColor14Medium }}
        >
        </Text>
      </Text>
      </>
      
    );
  }

  function onGoogleSignin () {
    console.warn('onGoogleSignin');
  }

  function onFacebookSignin () {
    console.warn('onFacebookSignin');
  }
  
  function signinOptionsInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 4.5,
          marginTop: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding,
            ...Fonts.blackColor16Medium,
          }}
        >
          {tr("optionsTitle")}
        </Text>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginHorizontal: Sizes.fixPadding,
          }}
        >
          <View style={styles.googleAndFacebookIconWrapStyle}>
            <FontAwesome name="google" size={24} color={Colors.redColor} onPress = {onGoogleSignin}/>
          </View>
          <View style={styles.googleAndFacebookIconWrapStyle}>
            <FontAwesome name="facebook" size={24} color={Colors.blueColor} onPress = {onFacebookSignin}/>
          </View>
        </View>
      </View>
    );
  }

  function header() {
    return <Text style={styles.headerTextStyle}>{tr("signin")}</Text>;
  }
};

export default SigninScreen;

const styles = StyleSheet.create({
  googleAndFacebookIconWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  textFieldWrapStyle: {
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    borderBottomWidth: 0.0,
  },
  signinButtonStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 4.5,
  },
  headerTextStyle: {
    ...Fonts.blackColor22SemiBold,
    textAlign: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 3.0,
    marginBottom: Sizes.fixPadding,
  },
  animatedView: {
    backgroundColor: Colors.lightBlackColor,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});
