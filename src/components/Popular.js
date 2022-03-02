import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';

import MovieCover from './MovieCover';
import { setPopular } from '../actions/actions';
import { fetchGet } from '../api/tmdb';

class Popular extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getPopular();
    }

    getPopular = () => {
        fetchGet("/movie/popular/?")
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
            <ScrollView style={styles.background}>
                <Text style={styles.header}>Most Popular</Text>
                {popular.map(m => (
                    <MovieCover movie={m} key={m.id} navigation={this.props.navigation} />
                ))}
            </ScrollView>
        )
    }
};


const mapStateToProps = state => {
    return {
        popular: state.popular,
    }
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        fontSize: 30,
    }
});

export default connect(mapStateToProps, { setPopular })(Popular);