import React from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';

import SearchResult from './SearchResult';
import { setSearchResult } from '../../actions/actions';
import { fetchGet } from '../../api/tmdb';
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
                <Text style={styles.text}> No Results</Text>
            </ScrollView>
        )
    }

    return (
        <ScrollView>
            <SearchForm />
            {filteredResult.map(item => (
                <SearchResult key={item.id} item={item} navigation={props.navigation} />
            ))}
        </ScrollView>
    );



};

const styles = StyleSheet.create({
    text: {
        paddingTop: 50,
        fontSize: 20,
        alignSelf: 'center'
    }
})

const mapStateToProps = state => {
    const { searchItem, searchResult } = state;
    return { searchItem, searchResult };
}

export default connect(mapStateToProps, { setSearchResult })(Search);