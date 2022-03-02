import React from 'react';
import { ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';

import { setSearch } from '../actions/actions';
import colors from '../assets/colors';

const Search = (props) => {
    const onChangeSearch = query => props.setSearch(query);

    return (
        <ScrollView>
            <Searchbar
                placeholder='Find a Movie'
                onChangeText={onChangeSearch}
                value={props.searchItem}
                style={{ backgroundColor: colors.primaryBlue }}
            />
        </ScrollView>
    )
};

export default connect(null, { setSearch })(Search);