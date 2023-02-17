import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import colors from "../assets/colors";

const MediaBtn = (props) => {
  const { label, media, icon, mediaState, navigation, setMedia } = props;

  const onButtonPress = () => {
    navigation.navigate(media);
    setMedia(media);
  };

  if (mediaState == media) {
    return (
      <Button
        compact={true}
        buttonColor={colors.yellow}
        dark={true}
        icon={icon}
        mode="contained"
        style={styles.yellowBtn}
        onPress={() => onButtonPress()}
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      compact={true}
      textColor={colors.yellow}
      dark={true}
      icon={icon}
      mode="outlined"
      style={styles.yellowBtn}
      onPress={() => onButtonPress()}
    >
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  yellowBtn: {
    marginBottom: 20,
    padding: 1,
    marginHorizontal: 5,
    alignSelf: "center",
  },
});

export default MediaBtn;
