const NUMBER = /^\d+(\.\d+)?$/;

const NUMERIC_FIELDS = [
  ['minHeight', 'Minimum height'],
  ['maxHeight', 'Maximum height'],
  ['minWeight', 'Minimum weight'],
  ['maxWeight', 'Maximum weight'],
];

export function validateDog(input) {
  const errors = {};

  if (input.name && !/^[a-zA-Z]+$/.test(input.name)) {
    errors.name = 'Name must contain only letters.';
  }

  NUMERIC_FIELDS.forEach(([field, label]) => {
    if (input[field] && !NUMBER.test(input[field].trim())) {
      errors[field] = `${label} must contain only numbers (with or without periods).`;
    }
  });

  if (input.life_span && !/^[0-9]*$/.test(input.life_span)) {
    errors.life_span = 'Life-span must contain only numbers.';
  }

  return errors;
}

export function isComplete(input, temperaments) {
  return Boolean(
    input.name.length &&
      input.minHeight.length &&
      input.maxHeight.length &&
      input.minWeight.length &&
      input.maxWeight.length &&
      input.life_span.length &&
      temperaments.length
  );
}
