import { Button, Chip, Modal, Portal, Text } from "react-native-paper"
import { SCREEN_WIDTH } from "../constants/screens"
import { ScrollView, StyleSheet } from "react-native"
import { SORT_OPTIONS, SORT_ORDERS } from "../constants/text"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { SortOrder } from '../entities/SortOptions';
import { setSortBy, setSortOrder } from "../redux/searchSlice"


type SortModalProps = {
    isVisible: boolean
    hideModal: () => void
    refreshList: () => void
}
export default function SortModal({ isVisible, hideModal, refreshList }: SortModalProps) {
    const dispatch = useDispatch();
    const performFilter = () => {
        refreshList()
        hideModal()
    }
    return (
        <Portal>
            <Modal visible={isVisible} onDismiss={hideModal}
                contentContainerStyle={styles.modalContainer}>
                <Text variant="headlineSmall">Sort By</Text>
                <ScrollView style={styles.sortByScrollView} horizontal>
                    {SORT_OPTIONS?.map((option, key) => {
                        return (
                            <Chip
                                key={key}
                                icon={option.icon}
                                showSelectedCheck
                                style={styles.sortByOption}
                                onPress={() => dispatch(setSortBy(option.value))}>{option.name}</Chip>

                        )
                    })}
                </ScrollView>
                <Text variant="headlineSmall">Sort Order</Text>
                <ScrollView style={styles.sortByScrollView} horizontal>
                    {SORT_ORDERS?.map((option, key) => {
                        return (
                            <Chip
                                key={key}
                                icon={option.icon}
                                style={styles.sortByOption}
                                onPress={() => dispatch(setSortOrder(option.value))}>{option.name}</Chip>
                        )
                    })}
                </ScrollView>
                <Button mode='contained' onPress={performFilter}>I'm done!</Button>
            </Modal>
        </Portal>
    )

}

const styles = StyleSheet.create({

    modalContainer: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 20 },
    sortByScrollView: {
        marginVertical: 10
    },
    sortByOption: {
        marginRight: 10
    }

})