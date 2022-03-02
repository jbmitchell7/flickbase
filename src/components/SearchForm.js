import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';

import { setSearch } from '../actions/actions';
import colors from '../assets/colors';

const SearchForm = (props) => {
    const onChangeSearch = query => props.setSearch(query);

    return (
        <Searchbar
            placeholder='Find a Movie'
            onIconPress={onChangeSearch}
            value={props.searchItem}
            style={styles.searchBar}
        />
    )
};

const styles = StyleSheet.create({
    searchBar: {
        marginVertical: 20,
        backgroundColor: colors.primaryBlue,
        width: '90%',
        alignSelf: 'center',
    }
});

export default connect(null, { setSearch })(SearchForm);