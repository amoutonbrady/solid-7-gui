import { createState, createEffect } from 'solid-js';

export default function Timer() {
  const [state, setState] = createState({ timer: 15, elapsed: 0 });
  let interval: number;

  const handleChange = (event: Event & { target: HTMLInputElement }) => {
    const value = parseFloat(event.target.value);
    if (value < state.elapsed) setState('elapsed', value);
    setState('timer', value);
  };

  const reset = () => setState('elapsed', 0);

  const createInterval = (t: number) =>
    setInterval(() => {
      setState('elapsed', (e) => parseFloat((e + t / 1000).toFixed(2)));
    }, t);

  createEffect(() => {
    const needsToBeStarted = interval === undefined;
    const needsToBeRestarted = interval === -1 && state.timer > state.elapsed;
    if (needsToBeStarted || needsToBeRestarted) interval = createInterval(100);

    if (state.elapsed >= state.timer) {
      clearInterval(interval);
      interval = -1;
    }
  });

  return (
    <form class="max-w-md mx-auto mt-10 flex flex-col space-y-3">
      <div class="flex flex-col space-y-3">
        <p class="uppercase text-sm text-gray-200 flex justify-between font-bold">
          <span>Elapsed time</span>
          <span class="lowercase">{state.elapsed}s</span>
        </p>
        <progress max={state.timer} value={state.elapsed} class="w-full" />
      </div>

      <div class="flex flex-col space-y-3">
        <label
          class="uppercase text-sm text-gray-200 flex justify-between font-bold"
          for="duration"
        >
          <span>Duration</span>
          <span>{state.timer}</span>
        </label>
        <input
          id="duration"
          type="range"
          min={1}
          max={20}
          step={0.1}
          onInput={handleChange}
          value={state.timer}
        />
      </div>

      <button
        onClick={reset}
        type="reset"
        class="px-4 py-1 ml-auto uppercase rounded font-semibold text-sm bg-blue-100 border border-blue-300 text-blue-900 hover:bg-blue-200"
      >
        reset
      </button>
    </form>
  );
}
