
export const calculateBmi = (height: number, weight: number) : string => {
  if (height <= 0 || weight <= 0) 
    throw new Error('Height(cm) and weight(kg) can not be 0 or less');
  const bmi = weight / Math.pow((height / 100) , 2);
  const roundedBmi = Math.round(bmi * 10) / 10;

  if (roundedBmi < 16) return 'Underweight (Severe thinness)';
  if (roundedBmi >= 16 && roundedBmi <= 16.9) return 'Underweight (Moderate thinness)';
  if (roundedBmi >= 17 && roundedBmi <= 18.4) return 'Underweight (Mild thinness)';
  if (roundedBmi >= 18.5 && roundedBmi <= 24.9) return 'Normal (healthy weight)';
  if (roundedBmi >= 25 && roundedBmi <= 29.9) return 'Overweight (Pre-obese)';
  if (roundedBmi >= 30 && roundedBmi <= 34.9) return 'Obese (Class I)';
  if (roundedBmi >= 35 && roundedBmi <= 39.9) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

const parseBmiArguments = (args: string[]): {height: number, weight: number} => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Height(cm) and weight(kg) must be numbers');
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight ));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong. ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}