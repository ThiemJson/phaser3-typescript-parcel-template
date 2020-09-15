function sum(number1: number, number2: number): number {
  return number1 + number2;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
