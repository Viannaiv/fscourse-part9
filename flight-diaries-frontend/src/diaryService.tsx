import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
    .catch(error => {
      if (axios.isAxiosError(error)) {
        if (!error.response || !error.response.data) console.error(error);
        throw new Error((error.response && error.response.data) 
          ? error.response.data
          : "Could not add entry. Check your input.");
      } else {
        console.error(error);
      }
    })
}