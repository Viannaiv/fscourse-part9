
type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number) : Result => {
  const days = dailyHours.length;
  if (days === 0) throw new Error('No daily exercise hours provided');
  const hourSum = dailyHours.reduce((acc, val) => acc + val, 0);
  const averageHours = hourSum / days

  const ratingBasis = averageHours / Math.max(target, 1)
  let rating: Rating = 1
  let ratingDescription = 'bad'
  if (ratingBasis > 1) {
    rating = 3
    ratingDescription = 'good'
  } else if (ratingBasis > 0.5) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } 
  

  return {
    periodLength: days,
    trainingDays: dailyHours.filter(day => day > 0).length,
    success: averageHours >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageHours
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))