import { useState, useEffect } from 'react';
import axios from 'axios';
import { DiaryEntry } from './types';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries').then(response => {
      setEntries(response.data);
    })
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      <div>
        <ul>
          {entries.map(entry =>
            <div key={entry.id}>
              <h4>{entry.date}</h4>
              <p>
                Visibility: {entry.visibility} <br/>
                Weather: {entry.weather}
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
