import { useState, useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from './types';
import { getAllEntries, createEntry } from './diaryService';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [error, SetError] = useState('');

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    })
  }, []);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry: NewDiaryEntry = {
      date: date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment: comment
    };

    createEntry(newEntry).then(data => {
      setEntries(entries.concat(data as DiaryEntry))
      error && SetError('')
      setDate('')
      setWeather('')
      setVisibility('')
      setComment('')
    }).catch ((error: unknown)  =>{
      let errorMessage = 'Error: ';
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      SetError(errorMessage);
    })
  };

  return (
    <div>
      <h2>Add a new entry</h2>
      <p style={{ color: 'red' }}>{error && error}</p>
      <form onSubmit={addEntry}>
        <label> Date: <input
          value={date}
          onChange={(event) => setDate(event.target.value)} 
        /></label><br/>
        <label> Weather:<input
          value={weather}
          onChange={(event) => setWeather(event.target.value)} 
          /></label><br/>
        <label> Visibility:<input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)} 
          /></label><br/>
        <label> Comment:<input
          value={comment}
          onChange={(event) => setComment(event.target.value)} 
        /></label><br/>
        <button type='submit'>Add</button>
      </form>

      <h2>Diary entries</h2>
      <div>
          {entries.map(entry =>
            <div key={entry.id}>
              <h4>{entry.date}</h4>
              <p>
                Visibility: {entry.visibility} <br/>
                Weather: {entry.weather}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default App;
