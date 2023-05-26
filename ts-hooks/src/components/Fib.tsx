import { useMemo } from "react";

const MemoizedFibonacci = ({ n }: { n: number }) => {
  const fibonacci = useMemo(() => {
    const memo: number[] = [0, 1]; // Memoization array to store computed Fibonacci values

    const fib = (num: number): number => {
      if (memo[num] !== undefined) {
        return memo[num]; // If the value is already memoized, return it
      }

      memo[num] = fib(num - 1) + fib(num - 2); // Calculate and memoize the value
      return memo[num];
    };

    return fib;
  }, []);

  const result = fibonacci(n);

  return <div>The Fibonacci number at position {n} is: {result}</div>;
};

export default MemoizedFibonacci;