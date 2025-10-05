
export const NUM_PREROLLS = 30;

export interface PrerollResult {
  die: string;
  rolls: number[];
}

export function preroll(src: string, number_to_preroll: number = NUM_PREROLLS): number[] {
  const [count, die] = src
    .split("d")
    .map((val: string) => Number.parseInt(val));
  console.log(`Rolling ${count}d${die}`);
  const results: number[] = [];

  // Could probably be better but whatever
  for (let preroll_idx = 0; preroll_idx < number_to_preroll; preroll_idx++) {
    let current_roll = 0;
    for (let num = 0; num < count; num++) {
      current_roll += Math.floor(Math.random() * die);
    }
    results.push(current_roll);
  }
  return results;
}
