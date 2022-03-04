import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import MediaCover from './MediaCover';
import { setPopular } from '../actions/actions';
import { fetchGet } from '../api/tmdb';
import YellowBtn from './YellowBtn';

const Popular = (props) => {
    const [media, setMedia] = useState('movie');
    const { popular } = props;

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const getPopular = async (mediaType) => {
                try {
                    const popResponse = await fetchGet(`/${mediaType}/popular/?`);
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

            return () => {
                isActive = false;
                props.setPopular([]);
            };
        }, [media])
    );

    return (
        <ScrollView style={styles.background}>
            <Text style={styles.header}>Most Popular</Text>
            <YellowBtn label='Movies' setState={setMedia} media='movie' />
            <YellowBtn label='TV Shows' setState={setMedia} media='tv' />
            <YellowBtn label='People' setState={setMedia} media='person' />
            {popular.map(m => (
                <MediaCover media={m} key={m.id} navigation={props.navigation} />
            ))}
        </ScrollView>
    )
};


const mapStateToProps = state => {
    return {
        popular: state.popular,
    }
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 40,
        marginHorizontal: 20,
        fontSize: 30,
    }
});

export default connect(mapStateToProps, { setPopular })(Popular);