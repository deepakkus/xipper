import {View, Text} from 'react-native';
import React from 'react';

const ButtonComponent = ({text}) => {
  return (
    <View className=" mt-5 py-3 bg-user rounded-md justify-center items-center ">
      <Text className=" text-sm font-psemibold text-center  text-white">
        {text}
      </Text>
    </View>
  );
};

export default ButtonComponent;
