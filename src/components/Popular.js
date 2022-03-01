import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

import MovieCover from './MovieCover';
import { setPopular } from '../actions/actions';
import { fetchGet } from '../api/tmdb';

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

class Popular extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getPopular();
    }

    getPopular = () => {
        fetchGet("/movie/popular")
            .then(response => {
                this.props.setPopular(response.results);
            })
            .catch(error => {
                console.log(`error getting popular movies`);
                console.log(error);
            })
    }

    render() {
        const { popular } = this.props;

        return (
            <ScrollView>
                <Text style={styles.header}>Popular Movies</Text>
                {popular.map(m => (
                    <MovieCover movie={m} key={m.id} navigation={this.props.navigation} />
                ))}
            </ScrollView>
        )
    }
};


let mapStateToProps = state => {
    return {
        popular: state.popular,
    }
}

const styles = StyleSheet.create({
    header: {
        color: 'yellow',
        padding: 20,
        fontSize: 30,
    }
});

export default connect(mapStateToProps, { setPopular })(Popular);