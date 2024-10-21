import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const SignInScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validatePhone = (text) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(text);
  };

  const handleContinue = async () => {
    const plainPhone = phone.replace(/\s/g, ""); // Loại bỏ khoảng trắng để kiểm tra
    if (validatePhone(plainPhone)) {
      setIsValid(true);
      try {
        await AsyncStorage.setItem("phoneNumber", plainPhone); // Lưu số điện thoại vào AsyncStorage
        navigation.navigate("Home"); // Điều hướng đến HomeScreen khi hợp lệ
      } catch (error) {
        console.log("Lỗi khi lưu số điện thoại: ", error);
      }
    } else {
      Alert.alert(
        "Lỗi",
        "Số điện thoại không hợp lệ. Hãy nhập đúng 10 chữ số."
      );
      setIsValid(false);
    }
  };

  const handlePhoneChange = (text) => {
    const formattedText = text
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    setPhone(formattedText);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.subtitle}>Nhập số điện thoại</Text>
      <Text style={styles.description}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing
        Pro
      </Text>
      <TextInput
        style={[styles.input, !isValid && styles.inputError]}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="numeric"
        value={phone}
        onChangeText={handlePhoneChange}
      />
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: phone.length === 0 ? "#ccc" : "#007BFF" },
        ]}
        disabled={phone.length === 0}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: "red",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SignInScreen;
