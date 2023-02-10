import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { IMAGE_URL } from './ImageComponent';

const Streamers = (props) => {

    const { title, items, styles } = props;

    return (
        <>
            <Text style={[styles.bioTextHeader, styles.bioText]}>{title}in the US On:</Text>
            <View style={styles.imageContainer}>
                {(items.length > 0) ?
                    items.map(provider => (
                        <Image style={styles.image} key={provider.provider_id} source={{ uri: `${IMAGE_URL}${provider.logo_path}` }} />
                    ))
                    : <Text style={styles.streamText}>Not available to stream.</Text>
                }
            </View>
        </>
    )
}

export default Streamers;