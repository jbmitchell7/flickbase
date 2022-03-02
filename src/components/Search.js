import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';

import { fetchGet } from '../api/tmdb';
import SearchForm from './SearchForm';

const Search = (props) => {
    const { searchItem } = props;
    let searchResults = [];

    const getResults = () => {
        fetchGet(`/search/multi/?query=${searchItem}&`)
            .then(response => {
                searchResults = response.results;
            })
            .catch(error => {
                console.log('error getting results');
                console.log(error);
            })
    }

    if (searchItem !== '') {
        getResults();
    }

    return (
        <ScrollView>
            <SearchForm />
            {searchResults.map(item => (
                <Text key={item.id}>{item.id}</Text>
            ))}
        </ScrollView>
    );
};

const mapStateToProps = state => {
    const { searchItem } = state;
    return { searchItem };
}

export default connect(mapStateToProps)(Search);