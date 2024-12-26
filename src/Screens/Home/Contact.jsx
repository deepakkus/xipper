import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { BackArrowIcon } from '../../assets/images/Icons/ArrowIcon';
import { useNavigation } from '@react-navigation/native';

const Contact = () => {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton}  onPress={() => nav.goBack()} >
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.header}>Contact Us</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <ContactOption title="Chat with us" subtitle="speak with our team" buttonText="Chat with us" />
        <ContactOption title="Call us" subtitle="talk with our team" buttonText="Call us" />
        <ContactOption title="Message us" subtitle="talk with our team" buttonText="Fill Form" />
      </ScrollView>
    </View>
  );
};

const ContactOption = ({ title, subtitle, buttonText }) => {
  return (
    <View style={styles.optionContainer}>
      <View style={styles.iconContainer}>
        {/* <BackArrowIcon /> */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FB',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 32,
  },
  backButton: {
    marginRight: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 100,
    marginTop: 5,
  },
  content: {
    paddingBottom: 5,
  },
  optionContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#F3E9FF',
    padding: 8,
    borderRadius: 8,
  },
  textContainer: {
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    marginTop: 4,
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
  },
});

export default Contact;
