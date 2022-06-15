import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TextInput } from 'react-native'
import axios from "axios";
import Icons from 'react-native-vector-icons/AntDesign';
import SpeechToText from 'react-native-google-speech-to-text';
import {
    BASE_URL_GOOGLESHEET_API,
    GOOGLE_SPREADSHEET_API_KEY,
    SPREADSHEET_ID,
    CLIENT_ID,
    TAB_SHEET,
    TAB1
} from '../services/Const'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Icon from 'react-native-vector-icons/EvilIcons';
// import Icons from 'react-native-vector-icons/AntDesign';
// import { Dropdown } from 'react-native-element-dropdown';
// import Tts from 'react-native-tts';
// import RadioForm from 'react-native-simple-radio-button';
// import AntDesign from 'react-native-vector-icons/AntDesign';
function GoogleSheet() {

    const [sheetData, setSheetData] = useState([]);
    const [firstnametext, setFirstnametext] = useState("")
    const [middlenametext, setMiddlenametext] = useState("")
    const [lastnametext, setLastnametext] = useState("")
    const fieldName = [];
    const fieldType = [];
    // console.log("GetThoseData", sheetData)
    // const obj = { fieldName: '', fieldType: '' };
    const obj = [];


    useEffect(() => {
        GetSheetData();
    }, [])

    const GetSheetData = async () => {
        const result = await axios.get(`${BASE_URL_GOOGLESHEET_API}/${SPREADSHEET_ID}/values/${TAB_SHEET}?key=${GOOGLE_SPREADSHEET_API_KEY}`)
        // console.log("=====Shrre==", result.data.values)
        //  setSheetData(result.data.values)
        // for (var items of result.data.values[0]) {
        //     fieldName.push(items)
        // }
        // // console.log("field name", fieldName)
        // for (var items of result.data.values[1]) {
        //     fieldType.push(items)
        // }

        // for (let i = 0; i < fieldName.length; i++) {
        //     obj[i] = fieldName[i];
        // }
        for (let i = 1; i < result.data.values.length; i++) {
            obj.push({ fieldName: result.data.values[i][0], filedtype: result.data.values[i][1] })
        }
        // console.log(obj);
        setSheetData(obj);
        // console.log("field type", fieldType)
        // fieldName.forEach((element, index) => {
        //     obj.fieldName = element;
        //     obj.fieldType = fieldType[index]
        //     //setSheetData(obj);
        // });
        //====key and value
        // function mapToObject(fieldName, fieldType) {
        //     return fieldName.reduce(
        //         (sum, fieldName, index) => Object.assign(sum, { [fieldName]: fieldType[index] }),
        //         []
        //     );
        // }
        // const data = mapToObject(fieldName, fieldType)
        // setSheetData(data);
        // console.log(mapToObject(fieldName, fieldType));
    }
    const AddSheetData = async () => {
        // const result = await axios.put(`${BASE_URL_GOOGLESHEET_API}/${SPREADSHEET_ID}/values/Sheet3!C1?valueInputOption=USER_ENTERED/${TAB_SHEET}?key=${GOOGLE_SPREADSHEET_API_KEY}`, {
        //     "range": "Sheet3!C1",
        //     "majorDimension": "COLUMNS",
        //     "values": [
        //         [
        //             "Charan",
        //             "Sing",
        //             "Rajput",
        //             "Male",
        //             "3/15/2016"
        //         ]
        //     ]
        // })
        const result = await axios.post(`${BASE_URL_GOOGLESHEET_API}/${SPREADSHEET_ID}/values/${TAB1}:append?includeValuesInResponse=true&insertDataOption=OVERWRITE&responseDateTimeRenderOption=SERIAL_NUMBER&responseValueRenderOption=FORMATTED_VALUE&valueInputOption=RAW`, {
            "range": `ResultData`,
            "majorDimension": "ROWS",
            "values": [
                [
                    //  "User add",
                    // getTime,
                    // username,
                    // useremail,
                    // textData,
                    // textMiddle,
                    // textLast,
                    // chosenOption,
                    // date
                ]
            ]
        },
        )
    }
    let listItemView = (item) => {
        return (
            <View
                key={item.user_id}
                style={{ backgroundColor: 'white', padding: 20 }}>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    borderColor: "white",
                    alignSelf: "center",
                    borderRadius: 8,
                    height: 30,
                    width: "100%",
                }}>
                    <Text style={{ fontSize: 17, paddingRight: 10 }}> {item.fieldName}</Text>
                    <Icons name='infocirlceo' size={20} color="blue" style={{ paddingRight: '1%', justifyContent: 'flex-end' }}
                        onPress={() => speechToTextHandler(item.fieldName, item.filedtype)}
                    ></Icons>
                </View>
                {setData(item.filedtype, item.fieldName)}
            </View>
        );
    };
    const setData = (filedtype1, fieldName) => {
        switch (filedtype1) {
            case "Text":
                if (fieldName == "First Name") {
                    return (
                        <TextInput
                            style={{
                                height: 40,
                                borderWidth: 1.5,
                                borderColor: 'darkgray'
                            }}
                            placeholder="First Name"
                            value={firstnametext}
                            onChange={(e) => setFirstnametext(e.nativeEvent.text)}
                        //  onChangeText={(textData) => setTextData(textData)}
                        />
                    )
                }
                else if (fieldName == "Middle Name") {
                    return (
                        <TextInput
                            style={{
                                height: 40,
                                borderWidth: 1.5,
                                borderColor: 'darkgray',
                            }}
                            placeholder="Middle Name"
                            value={middlenametext}
                            onChange={(e) => setMiddlenametext(e.nativeEvent.text)}
                        //   onChangeText={(textMiddle) => setTextMiddle(textMiddle)}
                        />

                    )
                }
                else if (fieldName == "Last Name") {
                    return (
                        <TextInput
                            style={{
                                height: 40,
                                borderWidth: 1.5,
                                borderColor: 'darkgray',
                            }}
                            placeholder="Last Name"
                            // onChangeText={(textLast) => setTextLast(textLast)}
                            value={lastnametext}
                            onChange={(e) => setLastnametext(e.nativeEvent.text)}
                        />
                    )
                }
            //             // return (
            //             //   <TextInput style={{
            //             //     height: 40,
            //             //     borderWidth: 1.5,
            //             //     borderColor: 'darkgray',
            //             //   }}
            //             //     //onChangeText={(textData) => setTextData(textData)}
            //             //     onChangeText={(textData) => {
            //             //       if (fieldName == 'First Name') {
            //             //         setTextData(textData)
            //             //         console.log("====", textData)
            //             //       } else if (fieldName == 'Middle Name') {
            //             //         setTextData(textData)
            //             //         console.log("middle", textData)
            //             //       } else if (fieldName == 'Last Name') {
            //             //         setText(textData)
            //             //       }
            //             //     }
            //             //     }
            //             //   />
            //             // )
            //             break;
            //         case "Date":
            //             return (
            //                 <View
            //                     style={{
            //                         height: 40,
            //                         borderWidth: 1.5,
            //                         borderColor: 'darkgray',
            //                     }}
            //                 >
            //                     {show && (
            //                         <DateTimePicker
            //                             value={mydate}
            //                             mode={mode}
            //                             display="default"
            //                             onChange={changeSelectedDate} maximumDate={new Date()}
            //                         />
            //                     )}
            //                     <View style={{
            //                         flexDirection: 'row',
            //                         flexWrap: 'wrap',
            //                         padding: 3
            //                     }}>
            //                         <Text>{date}</Text>
            //                         <Icon name='calendar' size={40} color="#000000" onPress={() => showMode('date')}
            //                             style={{ marginLeft: '90%', position: 'absolute' }}
            //                         />
            //                     </View>
            //                 </View >)
            //             break;
            //         case 'Dropdown':
            //             return (
            //                 <View
            //                     style={{
            //                         height: 40,
            //                         borderWidth: 1.5,
            //                         borderColor: 'darkgray',
            //                     }}>{dropdownChose ? (<>
            //                         <View style={{
            //                             flexDirection: 'row',
            //                             flexWrap: 'wrap',
            //                         }}>
            //                             <Text style={{ padding: 6 }}>{chosenOption}</Text>
            //                             <AntDesign color="black" name="Safety" size={20} onPress={() => setDropdownChose(false)}
            //                                 style={{ marginLeft: '90%', position: 'absolute', padding: 4 }} />
            //                         </View>
            //                     </>) : (<>
            //                         <Dropdown
            //                             // style={styles.dropdown}
            //                             placeholderStyle={styles.placeholderStyle}
            //                             selectedTextStyle={styles.selectedTextStyle}
            //                             iconStyle={styles.iconStyle}
            //                             data={droplist}
            //                             maxHeight={300}
            //                             labelField="label"
            //                             valueField="value"
            //                             value={values}
            //                             dropdownPosition='bottom'
            //                             renderItem={renderItem}
            //                             onChange={item => {
            //                                 setValues(item.value);
            //                             }}
            //                         />
            //                     </>)}

            //                     {/* <Text style={{ padding: 2, fontSize: 15 }}> {chosenOption}</Text>
            //             <RadioForm
            //               formHorizontal={true}
            //               labelHorizontal={true}
            //               // buttonColor={'#2196f3'}
            //               buttonInnerColor={'blue'}
            //               buttonOuterColor={'blue'}
            //               labelStyle={{ fontSize: 15, padding: 4 }}
            //               radio_props={options}
            //               initial={0}
            //               onPress={(chosenOption) => {
            //                 setChosenOption(chosenOption);
            //               }}
            //               style={{ padding: 2, }}
            //             /> */}
            //                 </View >)

        }
    }
    let listViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.2,
                    width: '100%',
                    backgroundColor: '#808080',
                    padding: 5
                }}
            />
        );
    };

    const speechToTextHandler = async (fieldName, fieldType) => {

        let speechToTextData = null;
        try {
            speechToTextData = await SpeechToText.startSpeech('Try saying something', 'en_IN');
            console.log('speechToTextData: ', speechToTextData);
            console.log("=====setproper", fieldName, fieldType)
            if (fieldName == "First Name") {
                console.log("u can set here first")
                setFirstnametext(speechToTextData)
            } else if (fieldName == "Middle Name") {
                console.log("u are set this middle")
                setMiddlenametext(speechToTextData)
            }
            else if (fieldName == "Last Name") {
                console.log("are u select last name ")
                setLastnametext(speechToTextData)
            }

        } catch (error) {
            console.log('error: ', error);
        }
    }

    return (
        <View>
            <FlatList
                data={sheetData}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => listItemView(item)}
            />
        </View>
    )
}

export default GoogleSheet
/*
import React, { useState, useEffect } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Button,
  StatusBar, Alert, ActivityIndicator
} from "react-native";
import { fetchDataFromSheet, addDataFromSheet } from '../services/after_login_page_service';
import { isInternetPresent } from '../utils/networkUtils';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconMic from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { showToast } from '../utils/toastUtils';
import Tts from 'react-native-tts';
import RadioForm from 'react-native-simple-radio-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TAB, GOOGLE_SPREADSHEET_ID, TAB1 } from "../utils/constants"
import http from "../services/http";
import { doLogOutUser, makeGoogleLoginAndGetToken } from '../services/google-service';
import SpeechToText from 'react-native-google-speech-to-text';
import { employes_form_root, googlelogin_root } from '../utils/rootUtils';

const options = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const droplist = [
  { label: 'Male', value: '1' },
]

function AfterLogin({ navigation }) {
  const [sheetData, setSheetData] = useState([]);
  const [apires, setApires] = useState([]);
  const [showloder, setShowloder] = useState(true);
  const [isloading, setIsloading] = useState(false)

  const [mydate, setDates] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");

  const [values, setValues] = useState(null);
  const [textData, setTextData] = useState("")
  const [textMiddle, setTextMiddle] = useState("");
  const [textLast, setTextLast] = useState("")
  const [indicatorshow, setIndicatorshow] = useState(true)
  const [chosenOption, setChosenOption] = useState(null);
  const [dropdownChose, setDropdownChose] = useState(false)
  const [username, setUsername] = useState("")
  const [useremail, setUseremail] = useState("")
  const [getTime, setGetTime] = useState("")
  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDates(currentDate);
    let tempDate = new Date(currentDate)
    let fdate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    setDate(fdate);
    setShow(false)
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const obj = [];
  useEffect(() => {
    getDataFromSheet();
    UserData();
  }, [])

  const onInfoClick = (fieldName, filedtype) => {

    Tts.speak(`This is ${fieldName}`, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    })
  }

  const speechToTextHandler = async (fieldName, fieldType) => {
    let speechToTextData = null;
    try {
      speechToTextData = await SpeechToText.startSpeech('Try saying something', 'en_IN');
      console.log('speechToTextData: ', speechToTextData);
      if (fieldName == "First Name") {
        setTextData(speechToTextData)
      } else if (fieldName == "Middle Name") {
        setTextMiddle(speechToTextData)
      }
      else if (fieldName == "Last Name") {
        setTextLast(speechToTextData)
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const renderItem = () => {
    return (
      <View>
        <RadioForm
          formHorizontal={true}
          labelHorizontal={true}
          // buttonColor={'#2196f3'}
          buttonInnerColor={'blue'}
          buttonOuterColor={'blue'}
          labelStyle={{ fontSize: 15, padding: 4 }}
          radio_props={options}
          initial={0}
          onPress={(chosenOption) => {
            setChosenOption(chosenOption);
            setDropdownChose(true)
          }}
          style={{ padding: 2, }}
        />
      </View>
    )
  }

  const getDataFromSheet = () => {
    isInternetPresent().then((isPresent) => {
      if (isPresent) {

        if (showloder == true) {
          setIsloading(true)
        }
        fetchDataFromSheet().then((res) => {
          setIsloading(false)
          if (res.success == false) {
            showToast(res.error);
          } else {
            setApires(res.values)
            for (let i = 1; i < res.values.length; i++) {
              obj.push({ fieldName: res.values[i][0], filedtype: res.values[i][1] })
            }
            setSheetData(obj)
            setIndicatorshow(false)
          }
        })
      } else {
        showToast(TURN_ON_INTERNET_MSG)
      }
    })

  }
  const UserData = () => {
    makeGoogleLoginAndGetToken().then((user) => {
      // console.log("===", user.userName, user.userEmail)
      setUsername(user.userName)
      setUseremail(user.userEmail)

      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds();// Current Second
      setGetTime(hours + ':' + min + ':' + sec)
    })
  }
  //add log out
  const LogOut = () => {
    doLogOutUser()
    navigation.navigate(googlelogin_root, {})
  }
  const AddUserData = () => {
    if (textData == 0 || date == 0 || chosenOption == 0 || textMiddle == 0 || textLast == 0) {
      Alert.alert(" Please, fill all Detailes")
    } else {
      navigation.navigate(employes_form_root, {
        getTime,
        username,
        useremail,
        textData,
        textMiddle,
        textLast,
        chosenOption,
        date
      })
      setTextData("")
      setTextMiddle("")
      setTextLast("")
      setValues("")
      setChosenOption("")
      setDate("")
    }
  }
  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: 'white', padding: 15 }}>

        <View style={styles.labelText} >
          <Text style={{ fontSize: 17, paddingRight: 10 }}> {item.fieldName}</Text>
          <IconMic name='mic' size={20} color="blue" style={{ paddingRight: '1%', justifyContent: 'flex-end', marginLeft: '80%', position: 'absolute' }}
            onPress={() => speechToTextHandler(item.fieldName, item.filedtype)}
          />
          <Icons name='infocirlceo' size={20} color="blue" style={{ paddingRight: '1%', justifyContent: 'flex-end' }}
            onPress={() => onInfoClick(item.fieldName, item.filedtype)}
          ></Icons>
        </View>
        {setData(item.filedtype, item.fieldName)}
      </View>
    );
  };

  const setData = (filedtype1, fieldName) => {
    switch (filedtype1) {
      case "Text":
        if (fieldName == "First Name") {
          return (
            <TextInput
              style={{
                height: 40,
                borderWidth: 1.5,
                borderColor: 'darkgray'
              }}
              placeholder="First Name"
              value={textData}
              onChange={(e) => setTextData(e.nativeEvent.text)}
            />
          )
        }
        else if (fieldName == "Middle Name") {
          return (
            <TextInput
              style={{
                height: 40,
                borderWidth: 1.5,
                borderColor: 'darkgray',
              }}
              placeholder="Middle Name"
              value={textMiddle}
              onChange={(e) => setTextMiddle(e.nativeEvent.text)}
            />

          )
        }
        else if (fieldName == "Last Name") {
          return (
            <TextInput
              style={{
                height: 40,
                borderWidth: 1.5,
                borderColor: 'darkgray',
              }}
              placeholder="Last Name"
              value={textLast}
              onChange={(e) => setTextLast(e.nativeEvent.text)}
            />
          )
        }
        break;
      case "Date":
        return (
          <View
            style={{
              height: 40,
              borderWidth: 1.5,
              borderColor: 'darkgray',
            }}
          >
            {show && (
              <DateTimePicker
                value={mydate}
                mode={mode}
                display="default"
                onChange={changeSelectedDate}
                maximumDate={new Date()}
              />
            )}
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 3
            }}>
              <Text>{date}</Text>
              <Icon name='calendar' size={40} color="#000000" onPress={() => showMode('date')}
                style={{ marginLeft: '90%', position: 'absolute' }}
              />
            </View>
          </View >)
        break;
      case 'Dropdown':
        return (
          <View
            style={{
              height: 40,
              borderWidth: 1.5,
              borderColor: 'darkgray',
            }}>{dropdownChose ? (<>
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
                <Text style={{ padding: 6 }}>{chosenOption}</Text>
                <AntDesign color="black" name="Safety" size={20} onPress={() => setDropdownChose(false)}
                  style={{ marginLeft: '90%', position: 'absolute', padding: 4 }} />
              </View>
            </>) : (<>
              <Dropdown
                // style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={droplist}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={values}
                dropdownPosition='bottom'
                renderItem={renderItem}
                onChange={item => {
                  setValues(item.value);
                }}
              />
            </>)}
          </View >)

    }
  }

  return (

    <SafeAreaView style={[styles.safeAreaStyle, {
      flexDirection: 'column'
    }]}>
      <View style={{ flex: 14 }}>
        <Text style={{
          alignItems: 'center', backgroundColor: 'blue',
          justifyContent: 'center', height: 50, textAlign: 'center', color: 'ghostwhite', fontSize: 20, fontWeight: "bold"

        }}  >Welcome!!</Text>
        <Text style={{
          fontSize: 20,
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "5%",
          marginBottom: '5%',
          color: "#000000"
        }}>{"User Details"}</Text>
        {indicatorshow ? (<>
          <ActivityIndicator size="large" color="#0000ff"
            style={{ alignItems: 'center', marginTop: '4%' }}
            animating={indicatorshow} />
        </>) : (<>
          <FlatList
            data={sheetData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </>)}
      </View>

      <View style={{ flex: 3 }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 250, marginTop: 30,
            marginBottom: 30,
            backgroundColor: "blue",
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '17%'
          }}
          //addDataInSheet
          onPress={AddUserData}
        >
          <Text style={{ color: 'ghostwhite', fontWeight: "bold" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )
}

export default AfterLogin

const styles = StyleSheet.create({

  loginText: {
    padding: 5,
    color: "#707070",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: "2%"
  },

  safeAreaStyle: {
    flex: 1,
    paddingBottom: "2%",
    backgroundColor: "#ffffff"
  },
  labelText: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "white",
    alignSelf: "center",
    borderRadius: 8,
    height: 30,
    width: "100%",

  },
  dropdown: {
    height: 40,
    borderColor: 'darkgray',
    borderWidth: 1.5,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    padding: 2
  },
  selectedTextStyle: {
    fontSize: 14,
    padding: 3
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

});

 */
//add new developemant
/*
import React, { useState, useEffect } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Button,
  StatusBar, Alert, ActivityIndicator
} from "react-native";
import { fetchDataFromSheet, addDataFromSheet } from '../services/after_login_page_service';
import { isInternetPresent } from '../utils/networkUtils';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconMic from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { showToast } from '../utils/toastUtils';
import Tts from 'react-native-tts';
import RadioForm from 'react-native-simple-radio-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TAB, GOOGLE_SPREADSHEET_ID, TAB1 } from "../utils/constants"
import http from "../services/http";
import { doLogOutUser, makeGoogleLoginAndGetToken } from '../services/google-service';
import SpeechToText from 'react-native-google-speech-to-text';
import { employes_form_root, googlelogin_root } from '../utils/rootUtils';

const options = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const droplist = [
  { label: 'Male', value: '1' },
]

function AfterLogin({ navigation }) {
  const [sheetData, setSheetData] = useState([]);
  const [apires, setApires] = useState([]);
  const [showloder, setShowloder] = useState(true);
  const [isloading, setIsloading] = useState(false)

  const [mydate, setDates] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");

  const [values, setValues] = useState(null);
  const [textData, setTextData] = useState("")
  const [textMiddle, setTextMiddle] = useState("");
  const [textLast, setTextLast] = useState("")
  const [indicatorshow, setIndicatorshow] = useState(true)
  const [chosenOption, setChosenOption] = useState(null);
  const [dropdownChose, setDropdownChose] = useState(false)
  const [username, setUsername] = useState("")
  const [useremail, setUseremail] = useState("")
  const [getTime, setGetTime] = useState("")
  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDates(currentDate);
    let tempDate = new Date(currentDate)
    let fdate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    setDate(fdate);
    setShow(false)
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const obj = [];
  useEffect(() => {
    getDataFromSheet();
    UserData();
  }, [])

  const onInfoClick = (fieldName, filedtype) => {

    Tts.speak(`This is ${fieldName}`, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    })
  }

  const speechToTextHandler = async (fieldName, fieldType) => {
    let speechToTextData = null;
    try {
      speechToTextData = await SpeechToText.startSpeech('Try saying something', 'en_IN');
      console.log('speechToTextData: ', speechToTextData);
      if (fieldName == "First Name") {
        setTextData(speechToTextData)
      } else if (fieldName == "Middle Name") {
        setTextMiddle(speechToTextData)
      }
      else if (fieldName == "Last Name") {
        setTextLast(speechToTextData)
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const renderItem = () => {
    return (
      <View>
        <RadioForm
          formHorizontal={true}
          labelHorizontal={true}
          // buttonColor={'#2196f3'}
          buttonInnerColor={'blue'}
          buttonOuterColor={'blue'}
          labelStyle={{ fontSize: 15, padding: 4 }}
          radio_props={options}
          initial={0}
          onPress={(chosenOption) => {
            setChosenOption(chosenOption);
            setDropdownChose(true)
          }}
          style={{ padding: 2, }}
        />
      </View>
    )
  }

  const getDataFromSheet = () => {
    isInternetPresent().then((isPresent) => {
      if (isPresent) {

        if (showloder == true) {
          setIsloading(true)
        }
        fetchDataFromSheet().then((res) => {
          setIsloading(false)
          if (res.success == false) {
            showToast(res.error);
          } else {
            setApires(res.values)
            for (let i = 1; i < res.values.length; i++) {
              obj.push({ fieldName: res.values[i][0], filedtype: res.values[i][1] })
            }
            setSheetData(obj)
            setIndicatorshow(false)
          }
        })
      } else {
        showToast(TURN_ON_INTERNET_MSG)
      }
    })

  }
  const UserData = () => {
    makeGoogleLoginAndGetToken().then((user) => {
      // console.log("===", user.userName, user.userEmail)
      setUsername(user.userName)
      setUseremail(user.userEmail)

      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds();// Current Second
      setGetTime(hours + ':' + min + ':' + sec)
    })
  }
  //add log out
  const LogOut = () => {
    doLogOutUser()
    navigation.navigate(googlelogin_root, {})
  }
  const AddUserData = () => {
    if (textData == 0 || date == 0 || chosenOption == 0 || textMiddle == 0 || textLast == 0) {
      Alert.alert(" Please, fill all Detailes")
    } else {
      navigation.navigate(employes_form_root, {
        getTime,
        username,
        useremail,
        textData,
        textMiddle,
        textLast,
        chosenOption,
        date
      })
      setTextData("")
      setTextMiddle("")
      setTextLast("")
      setValues("")
      setChosenOption("")
      setDate("")
    }
  }
  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: 'white', padding: 15 }}>

        <View style={styles.labelText} >
          <Text style={{ fontSize: 17, paddingRight: 10 }}> {item.fieldName}</Text>
          <IconMic name='mic' size={20} color="blue" style={{ paddingRight: '1%', justifyContent: 'flex-end', marginLeft: '80%', position: 'absolute' }}
            onPress={() => speechToTextHandler(item.fieldName, item.filedtype)}
          />
          <Icons name='infocirlceo' size={20} color="blue" style={{ paddingRight: '1%', justifyContent: 'flex-end' }}
            onPress={() => onInfoClick(item.fieldName, item.filedtype)}
          ></Icons>
        </View>
        {setData(item.filedtype, item.fieldName)}
      </View>
    );
  };

  const setData = (filedtype1, fieldName) => {
    switch (filedtype1) {
      case "Text":
        if (fieldName == "First Name") {
          return (
            <TextInput
              style={{
                height: 40,
                borderWidth: 1.5,
                borderColor: 'darkgray'
              }}
              placeholder="First Name"
              value={textData}
              onChange={(e) => setTextData(e.nativeEvent.text)}
            />
          )
        }
        else if (fieldName == "Middle Name") {
          return (
            <TextInput
              style={{
                height: 40,
                borderWidth: 1.5,
                borderColor: 'darkgray',
              }}
              placeholder="Middle Name"
              value={textMiddle}
              onChange={(e) => setTextMiddle(e.nativeEvent.text)}
            />

          )
        }
        else if (fieldName == "Last Name") {
          return (
            <TextInput
              style={{
                height: 40,
                borderWidth: 1.5,
                borderColor: 'darkgray',
              }}
              placeholder="Last Name"
              value={textLast}
              onChange={(e) => setTextLast(e.nativeEvent.text)}
            />
          )
        }
        break;
      case "Date":
        return (
          <View
            style={{
              height: 40,
              borderWidth: 1.5,
              borderColor: 'darkgray',
            }}
          >
            {show && (
              <DateTimePicker
                value={mydate}
                mode={mode}
                display="default"
                onChange={changeSelectedDate}
                maximumDate={new Date()}
              />
            )}
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 3
            }}>
              <Text>{date}</Text>
              <Icon name='calendar' size={40} color="#000000" onPress={() => showMode('date')}
                style={{ marginLeft: '90%', position: 'absolute' }}
              />
            </View>
          </View >)
        break;
      case 'Dropdown':
        return (
          <View
            style={{
              height: 40,
              borderWidth: 1.5,
              borderColor: 'darkgray',
            }}>{dropdownChose ? (<>
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
                <Text style={{ padding: 6 }}>{chosenOption}</Text>
                <AntDesign color="black" name="Safety" size={20} onPress={() => setDropdownChose(false)}
                  style={{ marginLeft: '90%', position: 'absolute', padding: 4 }} />
              </View>
            </>) : (<>
              <Dropdown
                // style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={droplist}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={values}
                dropdownPosition='bottom'
                renderItem={renderItem}
                onChange={item => {
                  setValues(item.value);
                }}
              />
            </>)}
          </View >)

    }
  }

  return (

    <SafeAreaView style={[styles.safeAreaStyle, {
      flexDirection: 'column'
    }]}>
      <View style={{ flex: 14 }}>
        <Text style={{
          alignItems: 'center', backgroundColor: 'blue',
          justifyContent: 'center', height: 50, textAlign: 'center', color: 'ghostwhite', fontSize: 20, fontWeight: "bold"

        }}  >Welcome!!</Text>
        <Text style={{
          fontSize: 20,
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "5%",
          marginBottom: '5%',
          color: "#000000"
        }}>{"User Details"}</Text>
        {indicatorshow ? (<>
          <ActivityIndicator size="large" color="#0000ff"
            style={{ alignItems: 'center', marginTop: '4%' }}
            animating={indicatorshow} />
        </>) : (<>
          <FlatList
            data={sheetData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </>)}
      </View>

      <View style={{ flex: 3 }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 250, marginTop: 30,
            marginBottom: 30,
            backgroundColor: "blue",
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '17%'
          }}
          //addDataInSheet
          onPress={AddUserData}
        >
          <Text style={{ color: 'ghostwhite', fontWeight: "bold" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )
}

export default AfterLogin

const styles = StyleSheet.create({

  loginText: {
    padding: 5,
    color: "#707070",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: "2%"
  },

  safeAreaStyle: {
    flex: 1,
    paddingBottom: "2%",
    backgroundColor: "#ffffff"
  },
  labelText: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "white",
    alignSelf: "center",
    borderRadius: 8,
    height: 30,
    width: "100%",

  },
  dropdown: {
    height: 40,
    borderColor: 'darkgray',
    borderWidth: 1.5,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    padding: 2
  },
  selectedTextStyle: {
    fontSize: 14,
    padding: 3
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

});

*/