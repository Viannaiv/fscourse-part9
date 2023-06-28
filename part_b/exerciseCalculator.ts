
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

const calculateExercises = (target: number, dailyHours: number[]) : Result => {
  const days = dailyHours.length;
  const hourSum = dailyHours.reduce((acc, val) => acc + val, 0);
  const averageHours = hourSum / days;

  const ratingBasis = averageHours / Math.max(target, 1);
  let rating: Rating = 1;
  let ratingDescription = 'bad';
  if (ratingBasis >= 1) {
    rating = 3;
    ratingDescription = 'good';
  } else if (ratingBasis > 0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } 
  

  return {
    periodLength: days,
    trainingDays: dailyHours.filter(day => day > 0).length,
    success: averageHours >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageHours
  };
}

const parseArguments = (args: string[]): {numValue: number, arrayValue: number[]} => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const numValue = Number(args[2])
  const numArray = args.slice(3).map(val => Number(val));

  if (numValue && numArray.every(val => !isNaN(val))) {
    return {
      numValue: numValue,
      arrayValue: numArray
    };
  } else {
    throw new Error('All provided values must be numbers');
  }
}

try {
  const { numValue, arrayValue } = parseArguments(process.argv);
  console.log(calculateExercises(numValue, arrayValue));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}