export type WaitOptions = {
  minutes?: number;
  seconds?: number;
};

export async function sleep(options: WaitOptions) {
  let waitTimes = 0;
  if (options.seconds) {
    waitTimes += 1000 * options.seconds;
  } else if (options.minutes) {
    waitTimes += 1000 * 60 * options.minutes;
  }

  return new Promise((resolve) => setTimeout(resolve, waitTimes));
}
