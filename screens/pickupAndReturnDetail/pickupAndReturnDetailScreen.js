import Axios from "axios";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LanguageContext } from "../../languages";
import {
  Header,
  Button,
} from "../../components/usableComponent/usableComponent";

const { height, width } = Dimensions.get("window");

const PickupAndReturnDetailScreen = ({ navigation, route }) => {
  const { i18n, language } = useContext(LanguageContext);

  const isRtl = language == "ar";

  function tr(key) {
    return i18n.t(`pickupAndReturnDetailScreen.${key}`);
  }

  useEffect(() => {
    if (route.params?.address) {
      if (route.params.addressFor === "pickup") {
        setPickupLocation(route.params.address);
      } else {
        setReturnLocation(route.params.address);
      }
    }
  }, [route.params?.address]);

  useEffect(() => {
    if (route.params?.selectionFor) {
      if (route.params.selectionFor === "pickup") {
        setPickupDate(route.params.date);
        setPickupTime(route.params.time);
      } else {
        setReturnDate(route.params.date);
        setReturnTime(route.params.time);
      }
    }
  }, [route.params?.selectionFor]);

  const [withDriverSwitch, setWithDriverSwitch] = useState(true);
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const handlePostRequest = async () => {
    // try {
    //   const requestBody = {
    //     withDriverSwitch,
    //     pickupLocation,
    //     returnLocation,
    //     pickupDate,
    //     pickupTime,
    //     returnDate,
    //     returnTime,
    //   };

    //   const response = await Axios.post("https://127.0.0.1:7201/api/Registration/PickupAndReturnDetailScreen", requestBody);

    //   if (response.status === 200) {
    //     console.log("POST request successful");
    //     console.log("Response Data: ", response.data);
    //   } else {
    //     console.error("POST request failed");
    //     console.error("Error Response Data:", response.data);
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     console.error("Server Error:", error.response.data);
    //     console.error("Status Code:", error.response.status);
    //   } else if (error.request) {
    //     console.error("Network Error:", error.request);
    //   } else {
    //     console.error("An error occurred:", error.message);
    //   }
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {carImage()}
          {withDriverOrNotInfo()}
          {pickupLocationInfo()}
          {returnLocationInfo()}
          {pickupDateAndTimeInfo()}
          {returnDateAndTimeInfo()}
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
        onPress={async () => {
          
          await handlePostRequest();
  
    
          navigation.push("PersonalInformation");
        }}
      />
    );
  }

  function returnDateAndTimeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor16Medium,
          }}
        >
          {tr("returnDateTimeTitle")}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.push("PickupAndReturnDateAndTime", {
              selectionFor: "return",
            })
          }
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.PickupAndReturnDetailWrapStyle,
          }}
        >
          <Text
            style={{
              flex: returnDate && returnTime ? 0 : 1,
              ...Fonts.grayColor14Regular,
            }}
          >
            {returnDate && returnTime
              ? `${returnDate} , ${returnTime}`
              : tr("noReturnDateTime")}
          </Text>
          <MaterialIcons
            name="calendar-today"
            size={18}
            color={Colors.grayColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function pickupDateAndTimeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor16Medium,
          }}
        >
          {tr("picDateTimeTitle")}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.push("PickupAndReturnDateAndTime", {
              selectionFor: "pickup",
            })
          }
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.PickupAndReturnDetailWrapStyle,
          }}
        >
          <Text
            style={{
              flex: pickupDate && pickupTime ? 0 : 1,
              ...Fonts.grayColor14Regular,
            }}
          >
            {pickupDate && pickupTime
              ? `${pickupDate} , ${pickupTime}`
              : tr("noPicDateTime")}
          </Text>
          <MaterialIcons
            name="calendar-today"
            size={18}
            color={Colors.grayColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function returnLocationInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor16Medium,
          }}
        >
          {tr("returnLocTitle")}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.push("PickupAndReturnLocation", {
              addressFor: "return",
            });
          }}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.PickupAndReturnDetailWrapStyle,
          }}
        >
          <Text style={{ flex: 1, ...Fonts.grayColor14Regular }}>
            {returnLocation ? returnLocation : tr("noReturnLoc")}
          </Text>
          <MaterialIcons
            name="location-pin"
            size={22}
            color={Colors.grayColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function pickupLocationInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor16Medium,
          }}
        >
          {tr("pickupLocTitle")}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.push("PickupAndReturnLocation", {
              addressFor: "pickup",
            });
          }}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.PickupAndReturnDetailWrapStyle,
          }}
        >
          <Text style={{ flex: 1, ...Fonts.grayColor14Regular }}>
            {pickupLocation ? pickupLocation : tr("noPickupLoc")}
          </Text>
          <MaterialIcons
            name="location-pin"
            size={22}
            color={Colors.grayColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function withDriverOrNotInfo() {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.withDriverOrNotInfoWrapStyle,
        }}
      >
        <Text style={{ ...Fonts.blackColor14Medium }}>{tr("withDriver")}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setWithDriverSwitch(!withDriverSwitch)}
          style={{
            ...styles.switchStyle,
            backgroundColor: withDriverSwitch
              ? Colors.primaryColor
              : Colors.lightGrayColor,
          }}
        >
          <View
            style={{
              alignSelf: withDriverSwitch ? "flex-end" : "flex-start",
              ...styles.switchInnerCircleStyle,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function carImage() {
    return (
      <Image
        source={require("../../assets/images/cars/car6.png")}
        style={{
          height: height / 4.0,
          width: width - 40.0,
          alignSelf: "center",
        }}
        resizeMode="contain"
      />
    );
  }

  function header() {
    return (
      <Header
        headerText={tr("header")}
        isRtl={isRtl}
        arrowPress={() => navigation.pop()}
      />
    );
  }
};

export default PickupAndReturnDetailScreen;

const styles = StyleSheet.create({
  switchStyle: {
    width: 35.0,
    height: 19.0,
    borderRadius: Sizes.fixPadding * 3.0,
    justifyContent: "center",
  },
  switchInnerCircleStyle: {
    backgroundColor: Colors.whiteColor,
    width: 14.0,
    height: 14.0,
    borderRadius: 7.0,
    marginHorizontal: Sizes.fixPadding - 7.0,
  },
  withDriverOrNotInfoWrapStyle: {
    margin: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  PickupAndReturnDetailWrapStyle: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    elevation: 1.5,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding + 2.0,
    paddingBottom: Sizes.fixPadding,
  },
});