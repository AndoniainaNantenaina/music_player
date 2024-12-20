function truncate(input: string, n: number) {
  if (input.length <= n) {
    return input;
  } else {
    return input.slice(0, n - 1) + "...";
  }
}

export { truncate };
