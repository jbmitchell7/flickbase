import React, { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import MediaCover from './MediaCover';
import { setPopular, setLoginStatus } from '../actions/actions';
import { fetchGet } from '../api/tmdb';
import PopularBtn from './PopularBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Popular = (props) => {
    const [media, setMedia] = useState('movie');
    const [mediaChanged, setMediaChanged] = useState(0);
    const { popular } = props;

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const getPopular = async (mediaType) => {
                try {
                    const popResponse = await fetchGet(`/3/${mediaType}/popular/`);
                    const userLoggedIn = await AsyncStorage.getItem('token');
                    if (userLoggedIn != '') {
                        props.setLoginStatus(true);
                    }
                    if (isActive) {
                        props.setPopular(popResponse.results);
                    }
                }
                catch (error) {
                    console.log('error getting popular movies');
                    console.log(error);
                }
            };

            getPopular(media);
            setMediaChanged(mediaChanged + 1);

            return () => {
                isActive = false;
                props.setPopular([]);
            };
        }, [media])
    );

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.header}>Most Popular</Text>
            <View style={styles.buttonContainer}>
                <PopularBtn label='Movies' setState={setMedia} media='movie' />
                <PopularBtn label='TV Shows' setState={setMedia} media='tv' />
                <PopularBtn label='People' setState={setMedia} media='person' />
            </View>
            <FlatList
                data={popular}
                renderItem={({ item }) => (
                    <MediaCover media={item} key={item.id} navigation={props.navigation} />
                )}
                extraData={mediaChanged}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </SafeAreaView>
    )
};


const mapStateToProps = state => {
    return {
        popular: state.popular,
        loginStatus: state.loginStatus
    }
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 40,
        marginHorizontal: 20,
        fontSize: 30,
    },
    background: {
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});

export default connect(mapStateToProps, { setPopular, setLoginStatus })(Popular);