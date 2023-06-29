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
      setComment('')
    }).catch ((error: unknown)  =>{
      let errorMessage = 'Error: ';
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      SetError(errorMessage);
    })
  };
   enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  return (
    <div>
      <h2>Add a new entry</h2>
      <p style={{ color: 'red' }}>{error && error}</p>
      <form onSubmit={addEntry}>
        <label> Date: <input type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)} 
        /></label><br/>
        <label> Weather:
            <label> sunny
              <input type="radio" name="weather" value="sunny" 
                onChange={(event) => setWeather(event.target.value)}
            />
            </label>
            <label> rainy
              <input type="radio" name="weather" value="rainy" 
                onChange={(event) => setWeather(event.target.value)}/>
            </label>
            <label> cloudy
              <input type="radio"name="weather" value="cloudy" 
                onChange={(event) => setWeather(event.target.value)}/>
            </label>
            <label> stormy
              <input type="radio" name="weather" value="stormy" 
                onChange={(event) => setWeather(event.target.value)}/>
            </label>
            <label> windy
              <input type="radio" name="weather" value="windy" 
                onChange={(event) => setWeather(event.target.value)}/>
            </label>
        </label><br/>
        <label> Visibility:
            <label> great
              <input type="radio" name="visibility" value="great" 
                onChange={(event) => setVisibility(event.target.value)}
            />
            </label>
            <label> good
              <input type="radio" name="visibility" value="good" 
                onChange={(event) => setVisibility(event.target.value)}/>
            </label>
            <label> ok
              <input type="radio" name="visibility" value="ok" 
                onChange={(event) => setVisibility(event.target.value)}/>
            </label>
            <label> poor
              <input type="radio"name="visibility" value="poor" 
                onChange={(event) => setVisibility(event.target.value)}/>
            </label>
        </label><br/>
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
