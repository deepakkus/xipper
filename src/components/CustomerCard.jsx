import React from 'react';
import { View, Text, Image } from 'react-native';
import { DateFormatLong } from '../utils/utils';

const CustomerCard = ({ customer }) => {

  return (
    <View
      className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-1"
    >
      <View className="flex-row items-center mb-4">
        <Image
          source={{ uri: 'https://pbblogassets.s3.amazonaws.com/uploads/2015/11/4k-uncropped.jpg' }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <Text className="text-lg font-bold text-black">
          {customer.guests[0]?.guestName || 'Guest Name'}
        </Text>
      </View>

      <Text className="text-black text-base font-bold mb-2">
        Total Spends: ₹ 10,000 {/* Replace with dynamic data if available */}
      </Text>

      <View className="flex-row justify-between text-gray-500">
        <View>
          <Text className="font-semibold text-black">Check-in</Text>
          <Text className="text-black font-bold">
            {DateFormatLong(customer.checkInDate, "short")}
          </Text>
        </View>
        <View>
          <Text className="font-semibold text-black">Check-out</Text>
          <Text className="text-black font-bold">
            {DateFormatLong(customer.checkOutDate, "short")}
          </Text>
        </View>
        <View>
          <Text className="font-semibold text-black">Booking ID</Text>
          <Text className="text-black font-bold">
            {Array.isArray(customer.bookingId) ?
              customer.bookingId.slice(0, 8).join(", ") :
              (customer.bookingId.length > 8 ? `${customer.bookingId.slice(0, 8)}...` : customer.bookingId)
            }
          </Text>
        </View>

      </View>
    </View>
  );
};

export default CustomerCard;
