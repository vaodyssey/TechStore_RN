import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Icon, MD3Colors, Modal, Portal, Searchbar, SegmentedButtons, Text } from "react-native-paper";
import { SCREEN_WIDTH } from "../../constants/screens";
import { SearchParams } from '../../entities/SearchParams';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setKeyword } from "../../redux/searchSlice";
import FilterModal from "../../components/filterModal";
import SortModal from "../../components/sortModal";


type HeaderProps = {
    refreshList: () => void;
}
export default function Header({ refreshList }: HeaderProps) {
    return (
        <View>
            <AppBar refreshList={refreshList} />
            <FilterSortSection refreshList={refreshList} />
        </View>
    )
}


function AppBar({ refreshList }: HeaderProps) {
    const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);
    const keyword = useSelector((state: RootState) => state.search.searchTerm)
    const dispatch = useDispatch();
    return (
        <Appbar.Header>
            <Appbar.Content title="All Products" />
            {isSearchBarVisible ? (
                <Searchbar
                    placeholder="Search"
                    onChangeText={(keyword) => {
                        dispatch(setKeyword(keyword))
                    }}
                    value={keyword}
                    style={styles.searchBar}
                    loading={false}
                    onBlur={() => { setIsSearchBarVisible(!isSearchBarVisible) }}
                    onSubmitEditing={refreshList}
                />
            ) : (<Appbar.Action icon="magnify" onPress={() => { setIsSearchBarVisible(!isSearchBarVisible) }} />)}


        </Appbar.Header>
    )
}

function FilterSortSection({ refreshList }: HeaderProps) {
    const [value, setValue] = useState<string>('')
    const [sortVisible, setSortVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);

    const showFilterModal = () => setFilterVisible(true);
    const hideFilterModal = () => setFilterVisible(false);

    const showSortModal = () => setSortVisible(true);
    const hideSortModal = () => setSortVisible(false);

    return (
        <View>
            <SegmentedButtons
                value={value}
                style={styles.filterSortRegion}
                onValueChange={setValue}
                buttons={[
                    {
                        value: 'filter',
                        label: 'Filter By',
                        icon: "filter",
                        onPress: showFilterModal
                    },
                    {
                        value: 'sort',
                        label: 'Sort By',
                        icon: "sort",
                        onPress: showSortModal
                    },
                ]}
            />
            {filterVisible ? (
                <FilterModal isVisible={filterVisible} hideModal={hideFilterModal}
                    refreshList={refreshList} />
            ) : (<View></View>)}
            {sortVisible ? (
                <SortModal isVisible={sortVisible} hideModal={hideSortModal} refreshList={refreshList} />
            ) : (<View></View>)}

        </View>
    )
}







const styles = StyleSheet.create({
    searchBar: {
        width: SCREEN_WIDTH * 0.8
    },
    filterSortRegion: {
        margin: 10,

    },
    modalContainer: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 20 }

})