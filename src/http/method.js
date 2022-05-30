import axios from "axios";
import {
    BASE_URL_GOOGLESHEET_API,
    GOOGLE_SPREADSHEET_API_KEY,
    SPREADSHEET_ID,
    CLIENT_ID,
    TAB_SHEET
} from '../services/Const'

export const GET_SHEET_DATA = async () => {
    const result = await axios.get(`${BASE_URL_GOOGLESHEET_API}/${SPREADSHEET_ID}/FORMATTED_STRING/ROWS/FORMATTED_VALUE/
    ${CLIENT_ID}/${GOOGLE_SPREADSHEET_API_KEY}/${TAB_SHEET}`)
    console.log(result)
}