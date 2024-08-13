const DELAY = 20;
const CHANCE = 0.3;

export function* animateText(
  from: string,
  to: string
): Generator<string | unknown, void, unknown> {
  const values = "abcdef1234567890";
  let fromArr = from.split("");
  let index = 0;

  while (from !== to) {
    if (Math.random() > CHANCE) {
      fromArr[index] = to[index];
      index++;
    } else {
      for (let i = index; i < fromArr.length; i++) {
        fromArr[i] = values[Math.floor(Math.random() * values.length)];
      }
      from = fromArr.join("");
    }
    console.log(from, to);

    yield fromArr.join("");

    yield new Promise((resolve) => setTimeout(resolve, DELAY));
  }
}
