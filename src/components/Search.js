import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import { setSearchResult } from '../actions/actions';
import { fetchGet } from '../api/tmdb';
import SearchForm from './SearchForm';

const Search = (props) => {
    const { searchItem, searchResult } = props;
    
    let filteredResult = searchResult;

     if (searchItem !== '') {
        useEffect(() => {
            fetchGet(`/search/multi/?query=${searchItem}&`)
                .then(response => {
                    props.setSearchResult(response.results);
                })
                .catch(error => {
                    console.log('error getting results');
                    console.log(error);
                })
        }, [searchItem])
    }

    if (!filteredResult || filteredResult.length == 0) {
        return (
            <ScrollView>
                <SearchForm />
                <Text> No Results</Text>
            </ScrollView>
        )
    }

    return (
        <ScrollView>
            <SearchForm />
            {filteredResult.map(item => (
                <Text key={item.id}>{item.media_type}</Text>
            ))}
        </ScrollView>
    );



};

const mapStateToProps = state => {
    const { searchItem, searchResult } = state;
    return { searchItem, searchResult };
}

export default connect(mapStateToProps, { setSearchResult })(Search);