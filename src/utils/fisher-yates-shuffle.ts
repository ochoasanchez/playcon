export function swap<T>(array: T[], i: number, j: number): void {
  const temp: T = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export function shuffleCards<T>(array: T[]): T[] {
  const length: number = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex: number = Math.floor(Math.random() * i);
    const currentIndex: number = i - 1;
    swap(array, currentIndex, randomIndex);
  }
  return array;
}
