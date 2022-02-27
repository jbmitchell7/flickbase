import React from 'react';
import { fetchGet } from '../api/tmdb';
import { setPopular } from '../actions/actions';
import { connect } from 'react-redux';
import Movie from './Movie';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

class Home extends React.Component {
    constructor() {
        super();
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
            <ScrollView style={styles.header}>
                <h1>Popular Movies</h1>
                {popular.map(m => (
                    <Movie movie={m} key={m.id} />
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
    }
});

export default connect(mapStateToProps, { setPopular })(Home);