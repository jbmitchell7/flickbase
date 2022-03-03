import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import MovieInfo from './Movie/MovieInfo';
import PersonInfo from './Person/PersonInfo';
import TvShowInfo from './TvShow/TvShowInfo';
import { setChoice } from '../actions/actions';
import { fetchGet } from '../api/tmdb';
import ImageComponent from './image';

const MediaInfo = (props) => {
    const { mediaId, mediaType } = props.route.params;
    const { choice } = props;

    const getMedia = () => {
        fetchGet(`/${mediaType}/${mediaId}?`)
            .then(response => {
                props.setChoice(response);
            })
            .catch(error => {
                console.log('error getting movie');
                console.log(error);
            })
    }

    useFocusEffect(
        React.useCallback(() => {
            getMedia();
        }, [])
    );

    if (mediaType == 'movie') {
        return (
            <ScrollView>
                <MovieInfo movie={choice} styles={styles} />
                <ImageComponent item={choice} />
            </ScrollView>
        )
    }

    if (mediaType == 'person') {
        return (
            <ScrollView>
                <PersonInfo person={choice} styles={styles} />
                <ImageComponent item={choice} media={'person'} />
            </ScrollView>
        )
    }

    return (
        <ScrollView>
            <TvShowInfo show={choice} styles={styles} />
            <ImageComponent item={choice} />
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    textContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },

    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20,
    },

    bioText: {
        marginVertical: 10
    },

    watchlistBtn: {
        marginTop: 20,
        width: 200,
        alignSelf: 'center'
    },
});

const mapStateToProps = state => {
    const { choice } = state;
    return { choice };
}

export default connect(mapStateToProps, { setChoice })(MediaInfo);