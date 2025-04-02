import colors from "../../../assets/colors";
import { StyleSheet } from "react-native";

export const watchlistStyles = StyleSheet.create({
  header: {
    fontSize: 25,
    marginTop: 30,
    marginBottom: 10,
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
    paddingVertical: 10
  },
  pageBtn: {
    padding: 1,
    marginHorizontal: 5,
  },
  pickerContainer: {
    marginBottom: 10,
    marginHorizontal: 30
  },
  pickerStyle: {
    backgroundColor: colors.yellow,
    borderRadius: 20
  },
  pickerTitle: {
    color: colors.white
  },
  pickerItem: {
    borderWidth: 1,
    borderColor: colors.yellow,
    borderRadius: 20,
    marginHorizontal: 15,
    marginTop: 8
  }
});
