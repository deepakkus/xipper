import {View, Text} from 'react-native';
import React from 'react';
import BillDateWise from './BillDateWise';
import SubTotal from './SubTotal';
import moment from 'moment';

const BillComponent = ({title, billDetails, billSubTotals}) => {
  return (
    <View>
      <Text className=" font-pmedium text-base mb-3 text-black font-bold">
        {title}
      </Text>

      {billDetails &&
        Object.entries(billDetails).map(([key, res]) => (
          <BillDateWise date={moment(key).format('LL')} bill={res} />
        ))}

      {/* <BillDateWise date="28 July 24" bill={billDetails}/> */}
      <SubTotal title={title} billSubTotals={billSubTotals} />
    </View>
  );
};

export default BillComponent;
