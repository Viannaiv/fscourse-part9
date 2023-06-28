import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight) || !req.query.height || !req.query.weight) 
    return res.status(400).json({ error: 'malformatted parameters' });
  
  try {
    const bmi = calculateBmi(height, weight);
    return res.json({
      weight,
      height,
      bmi
    });
  } catch (error: unknown) {
    let errorMessage = 'Bmi could not be calculated. ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).send({ error: errorMessage});
  } 
});

/*
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { height, weight } = req.query;
  const heightAsNum = Number(height);
  const weightAsNum = Number(weight);

  console.log(!height, !weight, heightAsNum, weightAsNum)

  if (isNaN(heightAsNum) || (!height) 
    || isNaN(weightAsNum) || (!weight) )
    return res.status(400).send({ error: 'malformatted parameters'});
*/

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if ((!target && target !== 0) || !daily_exercises)
    return res.status(400).send({ error: 'parameters missing' });

  const targetAsNum = Number(target);
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any, 
    @typescript-eslint/no-unsafe-assignment */
  const hoursAsNum: number[] = [...daily_exercises].map((val: any) => Number(val));

  if ((isNaN(targetAsNum)) || !hoursAsNum.every(val => !isNaN(val))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(targetAsNum, hoursAsNum);
  return res.send({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});