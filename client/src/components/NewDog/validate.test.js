import { validateDog, isComplete } from './validate';

const completeForm = {
  name: 'Doggo',
  minHeight: '30',
  maxHeight: '50',
  minWeight: '5',
  maxWeight: '8.4',
  life_span: '10',
};

describe('validateDog', () => {
  it('accepts valid values', () => {
    expect(validateDog(completeForm)).toEqual({});
  });

  it('does not complain about empty fields', () => {
    expect(validateDog({})).toEqual({});
  });

  it('requires a name with only letters', () => {
    expect(validateDog({ name: 'Rex 2' }).name).toBe('Name must contain only letters.');
  });

  it.each(['minHeight', 'maxHeight', 'minWeight', 'maxWeight'])(
    'requires numbers in %s',
    (field) => {
      expect(validateDog({ [field]: 'abc' })[field]).toMatch(/must contain only numbers/);
    }
  );

  it('accepts decimals but not trailing periods', () => {
    expect(validateDog({ minWeight: '8.4' }).minWeight).toBeUndefined();
    expect(validateDog({ minWeight: '8.' }).minWeight).toBeDefined();
  });

  it('requires a numeric life span', () => {
    expect(validateDog({ life_span: '10 years' }).life_span).toBe(
      'Life-span must contain only numbers.'
    );
  });
});

describe('isComplete', () => {
  it('needs every field and at least one temperament', () => {
    expect(isComplete({ ...completeForm }, ['Loyal'])).toBe(true);
    expect(isComplete({ ...completeForm }, [])).toBe(false);
    expect(isComplete({ ...completeForm, name: '' }, ['Loyal'])).toBe(false);
  });
});
