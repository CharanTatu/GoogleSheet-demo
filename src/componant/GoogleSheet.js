import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import axios from "axios";
import {
    BASE_URL_GOOGLESHEET_API,
    GOOGLE_SPREADSHEET_API_KEY,
    SPREADSHEET_ID,
    CLIENT_ID,
    TAB_SHEET
} from '../services/Const'
function GoogleSheet() {

    const [sheetData, setSheetData] = useState([]);
    const fieldName = [];
    const fieldType = [];
    console.log("GetThoseData", sheetData)
    // const obj = { fieldName: '', fieldType: '' };
    const obj = {};


    useEffect(() => {
        GetSheetData();
    }, [])

    const GetSheetData = async () => {
        const result = await axios.get(`${BASE_URL_GOOGLESHEET_API}/${SPREADSHEET_ID}/values/${TAB_SHEET}?key=${GOOGLE_SPREADSHEET_API_KEY}`)
        // console.log("=====Shrre==", result)
        //  setSheetData(result.data.values)
        for (var items of result.data.values[0]) {
            fieldName.push(items)
        }
        // console.log("field name", fieldName)
        for (var items of result.data.values[1]) {
            fieldType.push(items)
        }

        for (let i = 0; i < fieldName.length; i++) {
            obj[i] = fieldName[i];
        }
        console.log(obj);
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
    let listItemView = (item) => {
        return (
            <View
                key={item.user_id}
                style={{ backgroundColor: 'white', padding: 20 }}>
                <Text >FirstName: {item.FirstName}</Text>
                <Text>MiddleName: {item.MiddleName}</Text>
                <Text> LastName: {item.LastName}</Text>
                <Text> Gender: {item.Gender}</Text>
                <Text> Date: {item.Date}</Text>
            </View>
        );
    };
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

    return (
        <View>
            {/* <FlatList
                data={sheetData}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => listItemView(item)}
            /> */}
            <Text>
                Hello
            </Text>
        </View>
    )
}

export default GoogleSheet