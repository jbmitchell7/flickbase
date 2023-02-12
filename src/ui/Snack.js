import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setSnackText, setVisible } from "../redux/snack/snackSlice";

const Snack = () => {
  const dispatch = useDispatch();
  const snackData = useSelector((state) => state.snack);

  const onDismissSnack = () => {
    dispatch(setVisible(false));
    dispatch(setSnackText(""));
  };

  return (
    <Snackbar
      visible={snackData.visible}
      onDismiss={onDismissSnack}
      duration={3000}
      style={styles.snack}
    >
      {snackData.text}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snack: {
    height: 100,
    width: 100,
    padding: 5,
    alignSelf: "center",
  },
});

export default Snack;
