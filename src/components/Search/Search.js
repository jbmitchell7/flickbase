import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { connect } from 'react-redux';

import { setSearchResult, setSearch } from '../../actions/actions';
import { fetchGet } from '../../api/tmdb';
import SearchForm from './SearchForm';
import ListCard from '../ListCard';
import colors from '../../assets/colors';

const Search = (props) => {
    const { searchItem, searchResult } = props;
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    let filteredResult = searchResult;

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            const getMedia = async () => {
                try {
                    if (isActive) {
                        const getResponse = await fetchGet(`/3/search/multi/?query=${searchItem}&page=${currentPage}`);
                        props.setSearchResult(getResponse.results);
                        setTotalPages(getResponse.total_pages);
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
            }
        }, [searchItem, currentPage])
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
        <ScrollView showsVerticalScrollIndicator={false}>
            <SearchForm />
            {filteredResult.map(item => (
                <ListCard key={item.id} media={item} navigation={props.navigation} type='search' />
            ))}
            {(totalPages > 1) ?
                <View style={styles.pageBtns}>
                    {(currentPage != 1) ?
                        <Button
                            color={colors.yellow}
                            dark={true}
                            icon='arrow-left-circle'
                            mode='contained'
                            style={styles.pageBtn}
                            onPress={() => setCurrentPage(currentPage - 1)}>
                            Prev
                        </Button> : null
                    }
                    {(currentPage != totalPages) ?
                        <Button
                            color={colors.yellow}
                            dark={true}
                            icon='arrow-right-circle'
                            mode='contained'
                            style={styles.pageBtn}
                            onPress={() => setCurrentPage(currentPage + 1)}>
                            Next
                        </Button> : null}
                </View> : null}
        </ScrollView>
    );



};

const styles = StyleSheet.create({
    text: {
        paddingTop: 50,
        fontSize: 20,
        alignSelf: 'center'
    },
    pageBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pageBtn: {
        padding: 1,
        marginBottom: 20,
        marginHorizontal: 5
    },
})

const mapStateToProps = state => {
    const { searchItem, searchResult } = state;
    return { searchItem, searchResult };
}

export default connect(mapStateToProps, { setSearchResult, setSearch })(Search);