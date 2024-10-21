import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const HomeScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const getPhoneNumber = async () => {
      try {
        const phone = await AsyncStorage.getItem("phoneNumber");
        if (phone !== null) {
          setPhoneNumber(phone);
        }
      } catch (error) {
        console.log("Lỗi khi lấy số điện thoại: ", error);
      }
    };

    getPhoneNumber(); // Lấy số điện thoại khi màn hình HomeScreen được hiển thị
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chào mừng đến Trang chủ!</Text>
      {phoneNumber ? (
        <Text style={styles.phoneText}>
          Số điện thoại của bạn: {phoneNumber}
        </Text>
      ) : (
        <Text>Không có thông tin số điện thoại.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  phoneText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default HomeScreen;
