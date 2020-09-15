function sums(number1: number, number2: number): number {
  return number1 + number2;
}

function isPrime(num: number): boolean {
  for (let i = 2; i < num / 2; i++) {
    if (num % i == 0) return false;
  }
  return num >= 2;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sums(1, 2)).toBe(3);
});
test("Is prime 2", () => {
  expect(isPrime(2)).toBe(true);
});
test("adds 1 + 2 to equal 3", () => {
  expect(sums(1, 2)).toBe(3);
});
test("Is prime 2", () => {
  expect(isPrime(2)).toBe(true);
});
test("adds 1 + 2 to equal 3", () => {
  expect(sums(1, 2)).toBe(3);
});
test("Is prime 2", () => {
  expect(isPrime(2)).toBe(true);
});
test("adds 1 + 2 to equal 3", () => {
  expect(sums(1, 2)).toBe(3);
});
test("Is prime 2", () => {
  expect(isPrime(2)).toBe(true);
});
test("adds 1 + 2 to equal 3", () => {
  expect(sums(1, 2)).toBe(3);
});
test("Is prime 2", () => {
  expect(isPrime(2)).toBe(true);
});
test("adds 1 + 2 to equal 3", () => {
  expect(sums(1, 2)).toBe(3);
});
test("Is prime 2", () => {
  expect(isPrime(2)).toBe(true);
});
test("adds 1 + 2 to equal 3", () => {
  expect(sums(1, 2)).toBe(3);
});
test("Is prime 2", () => {
  expect(isPrime(2)).toBe(true);
});
test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "beer",
];

test("the shopping list has beer on it", () => {
  expect(shoppingList).toContain("beer");
  expect(new Set(shoppingList)).toContain("beer");
});

test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});
