function truncate(input: string, n: number) {
  if (input[0].length <= n) {
    return input[0];
  } else {
    return input[0].slice(0, n - 1) + "...";
  }
}

export { truncate };
