import { Text } from "react-native-paper";
import { FlatList, TouchableOpacity, Image } from "react-native";
import { IMAGE_URL } from "../ImageComponent";
import { CreditListStyles } from "./CreditListStyles";
import { useEffect, useState } from "react";

const CreditList = (props) => {
  const { list, mediaType, listType, navigation } = props;
  const [imageString, setImageString] = useState("");
  const [nameString, setNameString] = useState("");
  const [titleString, setTitleString] = useState("");

  useEffect(() => {
    setData();
  });

  const setData = () => {
    if (mediaType === "person") {
      setImageString("profile_path");
      setNameString("name");
      if (listType === "crew") {
        setTitleString("job");
      } else {
        setTitleString("character");
      }
    } else {
      setImageString("poster_path");
      setTitleString("character");
    }

    if (mediaType === "movie") {
      setNameString("title");
    }

    if (mediaType === "tv") {
      setNameString("name");
    }
  };

  return (
    <>
      <FlatList
        horizontal
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={CreditListStyles.imageCard}
            onPress={() => {
              navigation.push("MediaInfo", {
                mediaId: item.id,
                mediaType: mediaType,
              });
            }}
          >
            <Image
              style={CreditListStyles.mediaImage}
              source={{ uri: `${IMAGE_URL}${item[imageString]}` }}
            />
            <Text
              style={[
                CreditListStyles.nameText,
                CreditListStyles.nameTextBold,
              ]}
            >
              {item[nameString]}
            </Text>
            <Text style={CreditListStyles.nameText}>{item[titleString]}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
      />
    </>
  );
};

export default CreditList;
