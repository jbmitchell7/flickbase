import colors from "../../../assets/colors";
import { StyleSheet } from "react-native";

export const pickerStyle = {
  inputIOS: {
    color: "white",
    backgroundColor: colors.yellow,
  },
  placeholder: {
    color: "white",
  },
  inputAndroid: {
    color: "white",
    backgroundColor: colors.yellow,
  },
};

export const watchlistStyles = StyleSheet.create({
  header: {
    fontSize: 25,
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  yellowBtn: {
    marginBottom: 20,
    padding: 1,
    alignSelf: "center",
  },
  watchlistMsg: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  pageBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  pageBtn: {
    padding: 1,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  pickerContainer: {
    marginHorizontal: 50,
    marginBottom: 20,
  },
});
