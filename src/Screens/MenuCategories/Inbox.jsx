import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Navbar from './Navbar';
import MessageListItem from './MessageListItem';
import ChatWindow from './ChatWindow';
import Icon from 'react-native-vector-icons/Ionicons';
import MicIcon from 'react-native-vector-icons/MaterialIcons';
import netflix from '../assets/netflix.png'; // Adjust paths if necessary
import prime from '../assets/prime.jpg';

const Inbox = () => {
  const [chatWindowDetails, setChatWindowDetails] = useState({});

  return (
    <View style={styles.container}>
      <Navbar inbox={true} />
      <View style={styles.mainContent}>
        <View style={styles.sidebar}>
          <ScrollView horizontal style={styles.scrollView}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={styles.profileImageWrapper}>
                <Image source={netflix} style={styles.profileImage} />
              </View>
            ))}
          </ScrollView>

          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search for your favourite brands"
              style={styles.searchInput}
            />
            <Icon
              name="ios-search"
              size={25}
              color="gray"
              style={styles.searchIcon}
            />
            <MicIcon name="mic" size={25} color="gray" style={styles.micIcon} />
          </View>

          <View>
            <ScrollView horizontal contentContainerStyle={styles.tabList}>
              {['All', 'Unread', 'Archived', 'Blocked'].map((tab, index) => (
                <TouchableOpacity key={index} style={styles.tab}>
                  <Text style={styles.tabText}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <Text style={styles.header}>Your Messages</Text>

          <ScrollView style={styles.messageList}>
            {[
              {
                name: 'Prime',
                img: prime,
                noOfMessagesUnread: '3',
                lastMessageTime: 'Yesterday',
                isPinned: true,
                isSilent: false,
              },
              {
                name: 'Netflix',
                img: netflix,
                noOfMessagesUnread: '3',
                lastMessageTime: 'Yesterday',
                isPinned: true,
                isSilent: true,
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setChatWindowDetails(item)}>
                <MessageListItem {...item} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.chatWindow}>
          {chatWindowDetails.img && (
            <ChatWindow
              name={chatWindowDetails.name}
              img={chatWindowDetails.img}
              isSilent={chatWindowDetails.isSilent}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F6FA',
  },
  sidebar: {
    width: '33%',
    backgroundColor: 'white',
    padding: 10,
  },
  scrollView: {
    height: 80,
    flexDirection: 'row',
  },
  profileImageWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'relative',
    marginTop: 10,
  },
  searchInput: {
    paddingLeft: 40,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 12,
  },
  micIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  tabList: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  tab: {
    borderColor: '#6D38C3',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabText: {
    color: '#6D38C3',
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  messageList: {
    marginTop: 10,
  },
  chatWindow: {
    flex: 1,
  },
});

export default Inbox;
