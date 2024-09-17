export const wait = (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("hello");
    }, seconds);
  })
}