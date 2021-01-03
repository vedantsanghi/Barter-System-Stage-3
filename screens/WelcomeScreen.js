import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      UserName: "",
      FirstName: "",
      LastName: "",
      isModalVisible: false,
      Address: "",
      MobileNumber: "",
      ConfirmPassword: "",
    };
  }

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        return alert("Successfully Login");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };

  userSignUp = (emailId, password) => {
    if (this.state.ConfirmPassword === this.state.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then((response) => {
          return alert("User Added Successfully");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    } else {
      alert("Password Not Matching");
    }
  };
  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder="First Name"
                maxLength={15}
                onChangeText={(text) => {
                  this.setState({
                    FirstName: text,
                  });
                }}
                value={this.state.FirstName}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="Last Name"
                maxLength={15}
                onChangeText={(text) => {
                  this.setState({
                    LastName: text,
                  });
                }}
                value={this.state.FirstName}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="example@booksanta.com"
                keyboardType="email-address"
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                secureTextEntry={true}
                placeholder="password"
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                secureTextEntry={true}
                placeholder="Confirm password"
                onChangeText={(text) => {
                  this.setState({
                    ConfirmPassword: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="Mobile Number"
                maxLength={10}
                keyboardType="numeric"
                onChangeText={(text) => {
                  this.setState({
                    MobileNumber: text,
                  });
                }}
                value={this.state.FirstName}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="Address"
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    Address: text,
                  });
                }}
                value={this.state.FirstName}
              />
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  this.userSignUp(this.state.emailId, this.state.password);
                }}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  this.setState({
                    isModalVisible: false,
                  });
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
       <View>{this.showModal()}</View> 
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Barter System</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.loginBox}
            placeholder="example@booksanta.com"
            placeholderTextColor="#ffff"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />

          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            placeholder="password"
            placeholderTextColor="#ffff"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TouchableOpacity
            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                isModalVisible: true,
              });
            }}
          >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8BE85",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 65,
    fontWeight: "300",
    paddingBottom: 30,
    color: "#ff3d00",
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "#ff8a65",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#ff5722",
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: "#ff5722",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "200",
    fontSize: 20,
  },
});

