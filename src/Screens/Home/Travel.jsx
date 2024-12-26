import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    TextInputBase,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import HomeHeader from "../../components/HomeHeader";
  import {
    Bed,
    Calender,
    CarRent,
    Flight,
    FromFlight,
    Globle,
    Hut,
    Id,
    People,
    ToFlight,
    UnoReverse,
  } from "../../assets/images/Icons/TravalIons";
  import RadioButton from "../../components/RadioButton";
  import {
    BackArrowIcon,
    DropDownArrow,
    GreaterArrowIcon,
  } from "../../assets/images/Icons/ArrowIcon";
  import { LocationIcon } from "../../assets/images/Icons/PersonalInfo";
  import { useNavigation } from "@react-navigation/native";
  // import DateTimePickerModal from "@/models/DateTimePickerModal";
  import DateTimePicker from "../../modals/DateTimePickerModal"
    import NumberSelectorModal from "../../modals/NumberSelector";
  
  const Traval = () => {
    const [option, setOption] = useState("flight");
  
    const nav = useNavigation();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <HomeHeader />
  
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center space-x-3 font-semibold">
            <TouchableOpacity onPress={() => nav.pop()}>
              <BackArrowIcon />
            </TouchableOpacity>
            <Text className="font-semibold text-2xl text-black">
              {option === "flight" && "Book A Flight"}
              {option === "bed" && "Book A Hotel"}
              {option === "car" && "Book A Car"}
              {option === "id" && "Apply For VISA"}
              {option === "globe" && "Book A Service"}
            </Text>
          </View>
          <View className="border rounded-full border-gray-300 pt-4 mt-3 flex-row justify-evenly">
            <TouchableOpacity
              onPress={() => setOption("flight")}
              className={
                option == "flight" ? "border-b-2 pb-4 border-primary" : ""
              }
            >
              <Flight color={option == "flight" ? "#6d38c3" : null} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption("bed")}
              className={option == "bed" ? "border-b-2 pb-4 border-primary" : ""}
            >
              <Bed color={option == "bed" ? "#6d38c3" : null} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption("car")}
              className={option == "car" ? "border-b-2 pb-4 border-primary" : ""}
            >
              <CarRent color={option == "car" ? "#6d38c3" : null} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption("id")}
              className={option == "id" ? "border-b-2 pb-4 border-primary" : ""}
            >
              <Id color={option == "id" ? "#6d38c3" : null} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption("globe")}
              className={
                option == "globe" ? "border-b-2 pb-4 border-primary" : ""
              }
            >
              <Globle color={option == "globe" ? "#6d38c3" : null} />
            </TouchableOpacity>
          </View>
  
          {option === "flight" && <FlightBook nav={nav} />}
          {option === "bed" && <BedBook nav={nav} />}
          {option === "car" && <CarBook nav={nav} />}
          {option === "id" && <IdBook nav={nav} />}
          {option === "globe" && <GlobeBook nav={nav} />}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Traval;
  
  // Flight Booking
  const FlightBook = ({ nav }) => {
    const [selectedRadio, setSelectedRadio] = useState("One Way");
    const [showRadioOptions, setShowRadioOptions] = useState(false);
    const [number, setNumber] = useState(2);
    const [isDepartureDatePickerVisible, setDepartureDatePickerVisible] =
      useState(false);
    const [isReturnDatePickerVisible, setReturnDatePickerVisible] =
      useState(false);
    const [departureDate, setDepartureDate] = useState("Select Date");
    const [returnDate, setReturnDate] = useState("Select Date");
  
    const [selectedRadio2, setSelectedRadio2] = useState("Premium");
    const [showRadioOptions2, setShowRadioOptions2] = useState(false);
  
    const [selectedRadio3, setSelectedRadio3] = useState("Regular");
    const [showRadioOptions3, setShowRadioOptions3] = useState(false);
  
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [isNumberSelectorVisible, setNumberSelectorVisible] = useState(false);
    const [travelers, setTravelers] = useState(1);
  
    const [multiCityData, setMultiCityData] = useState([
      {
        from: "",
        to: "",
        departureDate: "Select Date",
        returnDate: "Select Date",
      },
    ]);
  
    const radioOptions = [
      { label: "One Way", value: "One Way" },
      { label: "Round Trip", value: "Round Trip" },
      { label: "Multicity", value: "Multicity" },
    ];
  
    const radioOptions2 = [
      { label: "Premium", value: "Premium" },
      { label: "Business", value: "Business" },
      { label: "Economy", value: "Economy" },
    ];
  
    const radioOptions3 = [
      { label: "Regular", value: "Regular" },
      { label: "Student", value: "Student" },
      { label: "Senior Citizen", value: "Senior Citizen" },
      { label: "Armed Forces", value: "Armed Forces" },
      { label: "Doctor & Nurses", value: "Doctor & Nurses" },
    ];
  
    const handleDepartureConfirm = (date) => {
      setDepartureDate(date);
      setDepartureDatePickerVisible(false);
    };
  
    const handleReturnConfirm = (date) => {
      setReturnDate(date);
      setReturnDatePickerVisible(false);
    };
  
    const handleRadioSelect = (value) => {
      setSelectedRadio(value);
      setShowRadioOptions(false);
    };
  
    const handleRadioSelect2 = (value) => {
      setSelectedRadio2(value);
      setShowRadioOptions2(false);
    };
  
    const handleRadioSelect3 = (value) => {
      setSelectedRadio3(value);
      setShowRadioOptions3(false);
    };
  
    const handleReverseLocations = () => {
      setFrom(to);
      setTo(from);
    };
  
    const handleMultiCityChange = (index, field, value) => {
      const updatedData = [...multiCityData];
      updatedData[index][field] = value;
      setMultiCityData(updatedData);
    };
  
    const handleAddStop = () => {
      setMultiCityData([
        ...multiCityData,
        {
          from: "",
          to: "",
          departureDate: "Select Date",
          returnDate: "Select Date",
        },
      ]);
    };
  
    const handleMultiCityReverseLocations = (index) => {
      const updatedData = [...multiCityData];
      const temp = updatedData[index].from;
      updatedData[index].from = updatedData[index].to;
      updatedData[index].to = temp;
      setMultiCityData(updatedData);
    };
  
    const handleMultiCityDepartureConfirm = (index, date) => {
      const updatedData = [...multiCityData];
      updatedData[index].departureDate = date;
      setMultiCityData(updatedData);
    };
  
    const handleMultiCityReturnConfirm = (index, date) => {
      const updatedData = [...multiCityData];
      updatedData[index].returnDate = date;
      setMultiCityData(updatedData);
    };
  
    return (
      <>
        <View className="mt-5">
          <View className="flex-row items-center space-x-5">
            <Text
              className={`font-psemibold text-xl text-black font-bold ${
                selectedRadio !== "Choose" && "text-black"
              }`}
            >
              {selectedRadio}
            </Text>
            <TouchableOpacity
              onPress={() => setShowRadioOptions(!showRadioOptions)}
            >
              <DropDownArrow />
            </TouchableOpacity>
          </View>
        </View>
  
        {selectedRadio !== "Multicity" ? (
          <>
            <View className="mt-3 flex-row justify-between items-center font-bold">
              {showRadioOptions ? (
                <View className="p-3 bg-secondary rounded-md font-bold">
                  {radioOptions.map((radioOption) => (
                    <RadioButton
                      key={radioOption.value}
                      label={radioOption.label}
                      value={radioOption.value}
                      selected={selectedRadio === radioOption.value}
                      onPress={handleRadioSelect}
                    />
                  ))}
                </View>
              ) : (
                <>
                  <View className="mt-3 space-y-3 w-full">
                    <View className="flex-row items-center space-x-4 flex-1 pb-3">
                      <FromFlight />
                      <TextInput
                        className="font-pmedium text-lg text-gray-400 mb-0.6"
                        placeholder="From"
                        value={from}
                        onChangeText={setFrom}
                        placeholderTextColor="#A0A0A0"
                        style={{ flex: 1 }}
                      />
                    </View>
  
                    <View className="flex-row items-center space-x-4 flex-1 pb-3">
                      <ToFlight />
                      <TextInput
                        className="font-pmedium text-lg text-gray-400 mb-0.6 flex-1"
                        placeholder="To"
                        value={to}
                        onChangeText={setTo}
                        placeholderTextColor="#A0A0A0"
                        style={{ flex: 1 }}
                      />
                    </View>
                  </View>
                </>
              )}
              <TouchableOpacity
                className="p-3 bg-primary rounded-full absolute right-0"
                onPress={handleReverseLocations}
              >
                <UnoReverse />
              </TouchableOpacity>
            </View>
  
            <View className="flex-row mt-3  justify-between space-x-3">
              <View>
              <Text className="font-normal text-xl mb-2 text-black">Departure</Text>

                <TouchableOpacity
                  className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300"
                  onPress={() => setDepartureDatePickerVisible(true)}
                >
                  <Calender />
                  <Text className="font-psemibold text-primary text-xs">
                    {departureDate}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mr-7">
                <Text className="font-predular text-xl mb-2 text-black">Return</Text>
                <TouchableOpacity
                  className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300"
                  onPress={() => setReturnDatePickerVisible(true)}
                >
                  <Calender />
                  <Text className="font-psemibold text-primary text-xs">
                    {returnDate}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            {multiCityData.map((stop, index) => (
              <View
                key={index}
                className="border-b pb-5 rounded-lg border-gray-300"
              >
                <View className="mt-3 flex-row justify-between items-center">
                  {showRadioOptions ? (
                    <View className="p-3 bg-secondary rounded-md text-black">
                      {radioOptions.map((radioOption) => (
                        <RadioButton
                          key={radioOption.value}
                          label={radioOption.label}
                          value={radioOption.value}
                          selected={selectedRadio === radioOption.value}
                          onPress={handleRadioSelect}
                        />
                      ))}
                    </View>
                  ) : (
                    <>
                      <View className="mt-3 space-y-3 w-full">
                        <View className="flex-row items-center space-x-4 flex-1 pb-3">
                          <FromFlight />
                          <TextInput
                            className="font-pmedium text-lg text-gray-400 mb-0.6"
                            placeholder="From"
                            value={stop.from}
                            onChangeText={(value) =>
                              handleMultiCityChange(index, "from", value)
                            }
                            placeholderTextColor="#A0A0A0"
                            style={{ flex: 1 }}
                          />
                        </View>
  
                        <View className="flex-row items-center space-x-4 flex-1 pb-3">
                          <ToFlight />
                          <TextInput
                            className="font-pmedium text-lg text-gray-400 mb-0.6 flex-1"
                            placeholder="To"
                            value={stop.to}
                            onChangeText={(value) =>
                              handleMultiCityChange(index, "to", value)
                            }
                            placeholderTextColor="#A0A0A0"
                            style={{ flex: 1 }}
                          />
                        </View>
                      </View>
                    </>
                  )}
                  <TouchableOpacity
                    className="p-3 bg-primary rounded-full absolute right-0"
                    onPress={() => handleMultiCityReverseLocations(index)}
                  >
                    <UnoReverse />
                  </TouchableOpacity>
                </View>
  
                <View className="flex-row mt-3  justify-between space-x-3">
                  <View>
                  <Text className="font-normal text-xl mb-2 text-black">Departure</Text>
                    <TouchableOpacity
                      className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300"
                      onPress={() => setDepartureDatePickerVisible(true)}
                    >
                      <Calender />
                      <Text className="font-psemibold text-primary text-xs">
                        {stop.departureDate}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="mr-10">
                  <Text className="font-predular text-xl mb-2 text-black">Return</Text>
                    <TouchableOpacity
                      className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300"
                      onPress={() => setReturnDatePickerVisible(true)}
                    >
                      <Calender />
                      <Text className="font-psemibold text-primary text-xs">
                        {stop.returnDate}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
  
        <Text className="font-predular text-xl mt-5 mb-2 text-black">Traveller & Class</Text>
        <View className="flex-row justify-between space-x-5">
          <TouchableOpacity
            onPress={() => setNumberSelectorVisible(true)}
            className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300"
          >
            <People />
            <Text className="font-psemibold text-primary text-xs">
              {travelers} {travelers === 1 ? "Traveller" : "Travellers"}
            </Text>
            <View>
              <GreaterArrowIcon color={"#6d38c3"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowRadioOptions2(!showRadioOptions2)}
            className="flex-row px-3 mr-7 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300"
          >
            <Text className="font-psemibold text-primary text-xs">
              {selectedRadio2}
            </Text>
            <GreaterArrowIcon color={"#6d38c3"} />
          </TouchableOpacity>
        </View>
  
        {showRadioOptions2 && (
          <View className="items-center absolute bottom-2 right-5 bg-white p-5 rounded-md z-10">
            {radioOptions2.map((radioOption2) => (
              <RadioButton
                key={radioOption2.value}
                label={radioOption2.label}
                value={radioOption2.value}
                selected={selectedRadio2 === radioOption2.value}
                onPress={handleRadioSelect2}
              />
            ))}
          </View>
        )}
  
        <View className="mt-5 flex-row space-x-5 mb-4 items-center justify-between">
          <TouchableOpacity
            className="flex-row items-center space-x-3"
            onPress={() => setShowRadioOptions3(!showRadioOptions3)}
          >
            <Text className="font-psemibold text-xl font-bold mr-3 text-black">{selectedRadio3}</Text>
            <DropDownArrow />
          </TouchableOpacity>
          {showRadioOptions3 && (
            <View className="absolute bottom-5 left-5 bg-white p-5 rounded-md z-10 text-black">
              {radioOptions3.map((radioOption3) => (
                <RadioButton
                  key={radioOption3.value}
                  label={radioOption3.label}
                  value={radioOption3.value}
                  selected={selectedRadio3 === radioOption3.value}
                  onPress={handleRadioSelect3}
                />
              ))}
            </View>
          )}
          {selectedRadio === "Multicity" && (
            <View className="mt-5 flex-row justify-between items-center">
              <TouchableOpacity
                onPress={handleAddStop}
                className="p-3 w-auto items-center space-x-2 rounded-md bg-[#dbdde0]"
              >
                <Text className="font-psemibold text-white text-xs">
                  Add Stops
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <DateTimePicker
            isVisible={isDepartureDatePickerVisible}
            onClose={() => setDepartureDatePickerVisible(false)}
            onDateSelect={handleDepartureConfirm}
          />
          <DateTimePicker
            isVisible={isReturnDatePickerVisible}
            onClose={() => setReturnDatePickerVisible(false)}
            onDateSelect={handleReturnConfirm}
          />
          <NumberSelectorModal
            isVisible={isNumberSelectorVisible}
            onClose={() => setNumberSelectorVisible(false)}
            onSelect={setTravelers}
            currentNumber={travelers}
          />
        </View>
  
        <TouchableOpacity
          onPress={() => nav.navigate("SearchFlight")}
          className="bg-primary px-3 py-2 rounded-md mb-3"
        >
          <Text className="font-psemibold text-md text-white text-center">
            Search Flights
          </Text>
        </TouchableOpacity>
      </>
    );
  };
  
  //Bed
  const CarBook = ({ nav }) => {
    const [selectedRadio, setSelectedRadio] = useState("Outsitation One Way");
    const [showRadioOptions, setShowRadioOptions] = useState(false);
  
    const radioOptions = [
      { label: "Outsitation One Way", value: "Outsitation One Way" },
      { label: "Outsitation Round Trip", value: "Outsitation Round Trip" },
      { label: "Airport Transfers", value: "Airport Transfers" },
      { label: "Hourly Rentals", value: "Hourly Rentals" },
    ];
  
    const handleRadioSelect = (value) => {
      setSelectedRadio(value);
      setShowRadioOptions(false);
    };
    return (
      <>
        <View className="mt-5">
          <View className="flex-row items-center space-x-5">
            <Text
              className={`font-psemibold text-md text-gray-400 ${
                selectedRadio !== "Choose" && "text-black"
              }`}
            >
              {selectedRadio}
            </Text>
            <TouchableOpacity
              onPress={() => setShowRadioOptions(!showRadioOptions)}
            >
              <DropDownArrow />
            </TouchableOpacity>
          </View>
        </View>
        {showRadioOptions && (
          <View className="  absolute bg-white p-5 rounded-md   left-3   z-10">
            {radioOptions.map((radioOption2) => (
              <RadioButton
                key={radioOption2.value}
                label={radioOption2.label}
                value={radioOption2.value}
                selected={selectedRadio === radioOption2.value}
                onPress={handleRadioSelect}
              />
            ))}
          </View>
        )}
        <View className="mt-3 space-y-3  w-full">
          <View className="flex-row items-center space-x-4 flex-1 pb-2 border-b-[1px] border-gray-200  ">
            <LocationIcon color="#999" />
            <TextInput
              className="font-pmedium text-lg text-gray-400 mb-0.6 "
              placeholder="From"
              placeholderTextColor="#A0A0A0"
              style={{ flex: 1 }}
            />
          </View>
  
          {selectedRadio !== "Hourly Rentals" && (
            <>
              <View className="flex-row items-center mt-3 space-x-4 flex-1 pb-3 border-b-[1px] border-gray-200  ">
                <LocationIcon color="#999" />
                <TextInput
                  className="font-pmedium text-lg text-gray-400 mb-0.6 flex-1"
                  placeholder="To"
                  placeholderTextColor="#A0A0A0"
                  style={{ flex: 1 }}
                />
              </View>
              <TouchableOpacity className="p-3 bg-primary rounded-full absolute right-0">
                <UnoReverse />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View className="flex-row mt-5 space-x-3">
          <View>
            <Text className="font-predular text-md mb-2 font-bold text-black">
              {selectedRadio !== "Hourly Rentals" ? "Department" : "Pick Up Date"}
            </Text>
            <View className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300">
              <Calender />
              <Text className="font-psemibold text-primary text-xs font-bold">
                25Th June, 2024
              </Text>
            </View>
          </View>
          {selectedRadio !== "Airport Transfers" &&
            selectedRadio !== "Hourly Rentals" && (
              <View>
                
                <Text className="font-predular text-md mb-2 font-bold text-black">Return</Text>
                <View className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300">
                  <Calender />
                  <Text className="font-psemibold text-primary text-xs font-bold">
                    25Th June, 2024
                  </Text>
                </View>
              </View>
            )}
        </View>
  
        {selectedRadio !== "Outsitation Round Trip" ? (
          <>
            <Text className="font-predular text-md mt-5 mb-2 font-bold text-black">Pickup Time</Text>
            <View className="flex-row space-x-5 justify-between mb-5">
              <View className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300">
                <Text className="font-psemibold text-primary text-xs font-bold">
                  10:00 AM
                </Text>
                <View>
                  <GreaterArrowIcon color={"#6d38c3"} />
                </View>
              </View>
              {selectedRadio !== "Airport Transfers" &&
                selectedRadio !== "Hourly Rentals" && (
                  <View className="p-3  w-auto items-center space-x-2 rounded-md bg-[#dbdde0]">
                    <Text className="font-psemibold text-white text-xs">
                      Add Stops
                    </Text>
                  </View>
                )}
            </View>
          </>
        ) : (
          <View className="flex-row  space-x-11">
            <View>
              <Text className="font-predular text-md mt-5 mb-2 font-bold text-black">Pickup Time</Text>
              <View className="flex-row space-x-5 justify-between mb-5">
                <View className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300">
                  <Text className="font-psemibold text-primary text-xs font-bold">
                    10:00 AM
                  </Text>
                  <View>
                    <GreaterArrowIcon color={"#6d38c3"} />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text className="font-predular text-md mt-5 mb-2 font-bold text-black">Drop Time</Text>
              <View className="flex-row space-x-5 justify-between mb-5">
                <View className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300">
                  <Text className="font-psemibold text-primary text-xs font-bold">
                    10:00 AM
                  </Text>
                  <View>
                    <GreaterArrowIcon color={"#6d38c3"} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        <TouchableOpacity
          className="bg-primary px-3 py-2 rounded-md mb-3    "
          onPress={() => nav.navigate("SearchCar")}
        >
          <Text className="font-psemibold text-md text-white text-center">
            Search
          </Text>
        </TouchableOpacity>
      </>
    );
  };
  //Car
  const BedBook = ({ nav }) => {
    const [isCheckInPickerVisible, setCheckInPickerVisible] = useState(false);
    const [isCheckOutPickerVisible, setCheckOutPickerVisible] = useState(false);
  
    const [isNumberSelectorVisible1, setNumberSelectorVisible1] = useState(false);
    const [isNumberSelectorVisible2, setNumberSelectorVisible2] = useState(false);
    const [room, setRoom] = useState(1);
    const [guest, setGuest] = useState(1);
    const [indate, setindate] = useState("Select Date");
    const [outDate, setOutDate] = useState("Select Date");
    const handleDepartureConfirm = (date) => {
      setindate(date);
      setCheckInPickerVisible(false);
    };
  
    const handleReturnConfirm = (date) => {
      setOutDate(date);
      setCheckOutPickerVisible(false);
    };
  
    return (
      <View className="my-7">
        <TouchableOpacity
          className="flex-row p-3 border-b w-auto items-center space-x-2 rounded-md border-b-gray-300"
          onPress={() => setindate(true)}
        >
          <LocationIcon color="#999" />
          <TextInput
            className="font-psemibold text-gray-400 text-md"
            placeholder="City, location or property name"
          />
        </TouchableOpacity>
  
        <View className="flex-row space-x-3 mt-7">
          <View>
            <Text className="font-pmedium text-md mb-2">Check - In</Text>
            <TouchableOpacity
              onPress={() => setCheckInPickerVisible(true)}
              className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300"
            >
              <Calender />
              <Text className="font-psemibold text-primary text-xs">
                {indate}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="font-pmedium text-md mb-2">Check - Out</Text>
            <TouchableOpacity
              onPress={() => setCheckOutPickerVisible(true)}
              className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300"
            >
              <Calender />
              <Text className="font-psemibold text-primary text-xs">
                {outDate}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <View className="mt-6">
          <Text className="font-psemibold text-black text-md mb-3">
            Rooms & Guests
          </Text>
          <View className="flex-row space-x-4 mb-7">
            <TouchableOpacity
              onPress={() => setNumberSelectorVisible1(true)}
              className="flex-row p-3 border w-auto items-center space-x-5 rounded-md border-gray-300"
            >
              <Text className="font-psemibold pr-4 text-primary text-xs">
                {room} {room === 1 ? "Room" : "Rooms"}
              </Text>
              <GreaterArrowIcon color="#6d38c3" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNumberSelectorVisible2(true)}
              className="flex-row p-3 border w-auto items-center space-x-5 rounded-md border-gray-300"
            >
              <Text className="font-psemibold pr-4 text-primary text-xs">
                {guest} {guest === 1 ? "Guest" : "Guests"}
              </Text>
              <GreaterArrowIcon color="#6d38c3" />
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePicker
          isVisible={isCheckInPickerVisible}
          onClose={() => setCheckInPickerVisible(false)}
          onDateSelect={handleDepartureConfirm}
        />
        <DateTimePicker
          isVisible={isCheckOutPickerVisible}
          onClose={() => setCheckOutPickerVisible(false)}
          onDateSelect={handleReturnConfirm}
        />
        <NumberSelectorModal
          isVisible={isNumberSelectorVisible1}
          onClose={() => setNumberSelectorVisible1(false)}
          onSelect={setRoom}
          currentNumber={room}
        />
        <NumberSelectorModal
          isVisible={isNumberSelectorVisible2}
          onClose={() => setNumberSelectorVisible2(false)}
          onSelect={setGuest}
          currentNumber={guest}
        />
        <TouchableOpacity
          className="bg-primary px-3 py-2 rounded-md mb-3"
          onPress={() => nav.push("SearchHotels")}
        >
          <Text className="font-psemibold text-md text-white text-center">
            Search Hotels
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  //Id
  const IdBook = () => {
    return <></>;
  };
  //Globe
  const GlobeBook = ({ nav }) => {
    const [selectedRadio, setSelectedRadio] = useState("Tours");
    const [showRadioOptions, setShowRadioOptions] = useState(false);
  
    const radioOptions = [
      { label: "Tours", value: "Tours" },
      { label: "Museums", value: "Museums" },
      { label: "Outdoor sport", value: "Outdoor sport" },
      { label: "Cultural Experience", value: "Cultural Experience" },
    ];
  
    const handleRadioSelect = (value) => {
      setSelectedRadio(value);
      setShowRadioOptions(false);
    };
    return (
      <>
        <View className="my-7">
          <View className=" flex-row items-center space-x-6  border-b-2 pb-3 border-b-gray-200">
            <LocationIcon color={"#999"} />
            <Text className="font-psemibold text-gray-400 text-md">
              Your Destination
            </Text>
          </View>
          <View className=" flex-row space-x-3 mt-7 ">
            <View>
              <Text className=" text-md mb-2 text-black font-bold">Departure</Text>
              <View className="flex-row px-3 py-1 border w-auto items-center space-x-2 rounded-md border-gray-300">
                <Calender />
                <Text className="font-psemibold text-primary text-xs">
                  25Th June, 2024
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setShowRadioOptions(true)}
            className=" flex-row space-x-3 mt-7 mb-5 items-center"
          >
            <Hut />
            <Text className="font-psemibold text-gray-400 text-md mt-1">
              {selectedRadio}
            </Text>
          </TouchableOpacity>
  
          <View className=" mb-4 flex-row justify-between items-center">
            {showRadioOptions && (
              <View className="p-3 bg-secondary rounded-md">
                {radioOptions.map((radioOption) => (
                  <RadioButton
                    key={radioOption.value}
                    label={radioOption.label}
                    value={radioOption.value}
                    selected={selectedRadio === radioOption.value}
                    onPress={handleRadioSelect}
                  />
                ))}
              </View>
            )}
          </View>
  
          <TouchableOpacity
            className="bg-primary px-3 py-2 rounded-md mb-3    "
            onPress={() => nav.navigate("SearchServices")}
          >
            <Text className="font-psemibold text-md text-white text-center">
              Search Services
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  