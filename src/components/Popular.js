import React, { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MediaCover from './MediaCover';
import { setPopular, setLoginStatus } from '../actions/actions';
import { fetchGet } from '../api/tmdb';
import PopularBtn from './PopularBtn';

const Popular = (props) => {
    const [media, setMedia] = useState('movie');
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
                        let newPopular = popResponse.results;
                        props.setPopular(newPopular);
                    }
                }
                catch (error) {
                    console.log('error getting popular movies');
                    console.log(error);
                }
            };

            getPopular(media);

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
                <PopularBtn label='Movies' setMedia={setMedia} media='movie' />
                <PopularBtn label='TV Shows' setMedia={setMedia} media='tv' />
                <PopularBtn label='People' setMedia={setMedia} media='person' />
            </View>
            <FlatList
                data={popular}
                renderItem={({ item }) => (
                    <MediaCover media={item} key={item.id} navigation={props.navigation} />
                )}
                extraData={media}
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