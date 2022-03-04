import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';

import { setSearch } from '../../actions/actions';
import colors from '../../assets/colors';

const SearchForm = (props) => {

    return (
        <Searchbar
            placeholder='Movie, TV Show, or Person'
            onChangeText={query => props.setSearch(query)}
            // onIconPress={(query) => props.setSearch(query)}
            value={props.searchItem}
            style={styles.searchBar}
        />
    )
};

const styles = StyleSheet.create({
    searchBar: {
        marginVertical: 40,
        backgroundColor: colors.primaryBlue,
        width: '90%',
        alignSelf: 'center',
    }
});

export default connect(null, { setSearch })(SearchForm);