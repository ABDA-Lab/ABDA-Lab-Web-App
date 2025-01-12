import { useState } from "react";

export function useRandomIndex(arrayLength: number) {
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  const generateRandomIndex = () => {
    if (arrayLength > 0) {
      const index = Math.floor(Math.random() * arrayLength);
      setRandomIndex(index);
    }
  };

  return { randomIndex, generateRandomIndex };
}
