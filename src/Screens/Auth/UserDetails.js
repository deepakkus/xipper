import {View, Text, Image, TextInput} from 'react-native';
import React from 'react';
import ButtonComponent from '@/components/ButtonComponent';

const UserDetails = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', padding: 5}}>
      <Image
        source={{
          uri: 'https://static.vecteezy.com/system/resources/previews/006/991/685/non_2x/arrow-back-icon-which-is-suitable-for-commercial-work-and-easily-modify-or-edit-it-vector.jpg',
        }}
        style={{width: 30, height: 30}}
      />

      <Text style={{marginVertical: 2, fontSize: 24, fontWeight: 'bold'}}>
        Provide us a few details
      </Text>

      <View style={{marginTop: 3}}>
        <Text style={{marginVertical: 2, fontSize: 20, fontWeight: 'bold'}}>
          Your name
        </Text>
        <TextInput
          placeholder="Enter your full name"
          style={{
            paddingHorizontal: 3,
            paddingVertical: 2,
            borderColor: '#7F8387',
            borderWidth: 1,
            borderRadius: 4,
          }}
        />
      </View>

      <View style={{marginVertical: 3}}>
        <Text style={{marginVertical: 2, fontSize: 20, fontWeight: 'bold'}}>
          Your Email
        </Text>
        <TextInput
          placeholder="Enter your Email"
          style={{
            paddingHorizontal: 3,
            paddingVertical: 2,
            borderColor: '#7F8387',
            borderWidth: 1,
            borderRadius: 4,
          }}
        />
      </View>

      <ButtonComponent text={'Submit'} />
    </View>
  );
};

export default UserDetails;
