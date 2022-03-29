import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';

import SearchResult from './SearchResult';
import { setSearchResult, setSearch } from '../../actions/actions';
import { fetchGet } from '../../api/tmdb';
import SearchForm from './SearchForm';

const Search = (props) => {
    const { searchItem, searchResult } = props;

    let filteredResult = searchResult;

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            const getMedia = async () => {
                try {
                    if (isActive) {
                        const getResponse = await fetchGet(`/3/search/multi/?query=${searchItem}`);
                        props.setSearchResult(getResponse.results);
                    }
                }
                catch (error) {
                    throw new Error('error querying for media');
                }
            }

            if (searchItem != '') {
                getMedia();
            }

            return () => {
                isActive = false;
                props.setSearch('');
            }
        }, [searchItem])
    )

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

export default connect(mapStateToProps, { setSearchResult, setSearch })(Search);