import { Text } from "react-native-paper";
import { FlatList, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";

import { IMAGE_URL } from "../ImageComponent";
import { CreditListStyles } from "./CreditListStyles";

const CreditList = (props) => {
  const { list, mediaType, listType, navigation } = props;
  const [imageString, setImageString] = useState("");
  const [nameString, setNameString] = useState("");
  const [titleString, setTitleString] = useState("");
  const [creditData, setCreditData] = useState([]);

  useEffect(() => {
    switch(mediaType) {
      case 'person':
        setNameString("name");
        setImageString("profile_path");
        break;
      case 'movie':
        setNameString("title");
        setImageString("poster_path");
        break;
      case 'tv':
        setNameString("name");
        setImageString("poster_path");
        break;
    }

    if (listType === 'crew') {
      setTitleString("job")
    } else {
      setTitleString("character")
    }

    if (nameString && titleString && imageString){
      setData();
    }
  });

  const setData = () => {
    if (list.length && !creditData.length) {
      // gets unique ids from credits list
      const uniqueList = Array.from(new Set(list.map(media => media.id)));
      // creates new list of credits with list of roles for unique person
      const newList = uniqueList.map(id => {
        // filters current list of credits for matching id in uniqueList
        const items = list.filter(media => media.id === id);
        return {
          image: items[0][imageString],
          id,
          name: items[0][nameString],
          roles: items.map(item => item[titleString])
        }
      })
      setCreditData(newList);
    }
  };

  if (!creditData.length) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <FlatList
        horizontal
        data={creditData}
        renderItem={({ item }) => (
          <Pressable
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
              source={{ uri: `${IMAGE_URL}${item.image}` }}
            />
            <Text
              style={[
                CreditListStyles.nameText,
                CreditListStyles.nameTextBold,
              ]}
            >
              {item.name}
            </Text>
            { item.roles.map((role) => <Text key={role} style={CreditListStyles.nameText}>{ `${role} / ` }</Text>) }
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
      />
    </>
  );
};

export default CreditList;
