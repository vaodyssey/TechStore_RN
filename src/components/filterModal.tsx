import { Chip, Modal, Portal, Text } from "react-native-paper"
import { SCREEN_WIDTH } from "../constants/screens"
import { ScrollView, StyleSheet } from "react-native"
import { PRICE_RANGES } from "../constants/text"
import { PriceRange } from '../entities/PriceRange';
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";

type FilterModalProps = {
    isVisible: boolean
    hideModal: () => void
    refreshList: () => void
}
export default function FilterModal({ isVisible, hideModal }: FilterModalProps) {
    return (
        <Portal>
            <Modal visible={isVisible} onDismiss={hideModal}
                contentContainerStyle={styles.modalContainer}>
                <Text variant="headlineSmall">Choose a price range</Text>
                <ScrollView style={styles.priceScrollView}>
                    {PRICE_RANGES?.map((priceRange, key) => {
                        return (
                            <Chip
                                key={key}
                                icon="cash"
                                style={styles.priceChip}
                                onPress={() => console.log(priceRange.rangeInt)}>{priceRange.label}</Chip>

                        )
                    })}
                </ScrollView>
            </Modal>
        </Portal>
    )

}

const styles = StyleSheet.create({
    searchBar: {
        width: SCREEN_WIDTH * 0.8
    },
    filterSortRegion: {
        margin: 10,

    },
    priceScrollView: {
        marginVertical: 10,
        height: SCREEN_HEIGHT * 0.12
    },
    modalContainer: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 20 },
    priceChip: {
        marginVertical: 3
    }


})