import React from 'react';
import { View, Text, Modal, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { BackArrowIcon, CrossIcon } from '../assets/images/Icons/ArrowIcon';

const OrderList = ({ visible, onClose, items, onSelectOption = () => { } }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>

          <View style={styles.iconRow}>
            <TouchableOpacity onPress={onClose} style={styles.iconButton}>
              <BackArrowIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.iconButton}>
              <CrossIcon />
            </TouchableOpacity>
          </View>

          <FlatList
            data={items}
            keyExtractor={(item, index) => item.id ? item.id.toString() : `item-${index}`}  // Ensure unique key
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectOption(item.name)} style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>{`(${item.count})`}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No items found</Text>}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconButton: {
    padding: 5,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
  },
  itemQuantity: {
    fontSize: 16,
    color: 'black',
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  }
});

export default OrderList;
