
const calculateBmi = (height: number, weight: number) : string => {
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
  if (roundedBmi >= 40) return 'Obese (Class III)';
}

console.log(calculateBmi(180, 74));