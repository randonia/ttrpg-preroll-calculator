
export const NUM_PREROLLS = 30;

export interface PrerollResult {
  die: string;
  rolls: number[];
}

export function preroll(src: string, number_to_preroll: number = NUM_PREROLLS): number[] {
  const match = src.match(/(\d{1,2})d(\d{1,3})(?:\+(\d+))?/);
  const count = parseInt(match![1]);
  const die = parseInt(match![2]);
  const flat = match![3] ? parseInt(match![3]) : 0;
  console.log(`Rolling ${count}d${die}${flat ? "+" + flat : ""}`);
  const results: number[] = [];

  // Could probably be better but whatever
  for (let preroll_idx = 0; preroll_idx < number_to_preroll; preroll_idx++) {
    let current_roll = flat;
    for (let num = 0; num < count; num++) {
      current_roll += Math.floor(Math.random() * die);
    }
    results.push(current_roll);
  }
  return results;
}
