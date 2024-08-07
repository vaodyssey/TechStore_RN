import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Icon, MD3Colors, Searchbar } from "react-native-paper";
import { SCREEN_WIDTH } from "../../constants/screens";
import { SearchParams } from '../../entities/SearchParams';

type AllProductsAppBarProps = {
    performSearch: (searchParams: SearchParams) => void;
}
export default function AllProductsAppBar({ performSearch }: AllProductsAppBarProps) {
    const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('')
    const [searchParams, setSearchParams] = useState<SearchParams>()
    return (
        <Appbar.Header>
            <Appbar.Content title="All Products" />
            {isSearchBarVisible ? (
                <Searchbar
                    placeholder="Search"
                    onChangeText={(keyword) => {
                        setKeyword(keyword)
                        setSearchParams(prevSearchParams => ({
                            ...prevSearchParams,
                            keyword: keyword

                        }))
                    }}
                    value={keyword}
                    style={styles.searchBar}
                    loading={false}
                    onBlur={() => { setIsSearchBarVisible(!isSearchBarVisible) }}
                    onSubmitEditing={() => performSearch(searchParams as SearchParams)}
                />
            ) : (<Appbar.Action icon="magnify" onPress={() => { setIsSearchBarVisible(!isSearchBarVisible) }} />)}
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        width: SCREEN_WIDTH * 0.8
    }
})