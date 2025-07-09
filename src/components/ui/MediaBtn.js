import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import colors from "../../assets/colors";

const MediaBtn = (props) => {
  const { label, media, icon, navigation, route } = props;

  const onButtonPress = () => {
    navigation.navigate(media);
  };

  if (route.name == media) {
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
      textColor={colors.white}
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
