import { createState } from 'solid-js';
import { Show } from 'solid-js/dom';

const START = 'start';
const RETURN = 'return';
type Type = 'start' | 'return';

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth().toString().padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
}

export default function Flight() {
  const now = new Date();
  const [state, setState] = createState({
    mode: 'one-way',
    start: {
      date: now,
      format: formatDate(now),
      valid: true,
    },
    return: {
      date: now,
      format: formatDate(now),
      valid: true,
    },
    message: '',
  });

  const isValidDate = (date: string) =>
    date.length === 10 && date.match(/(\d{2}).(\d{2}).(\d{4})/gi);

  const isFormValid = () => {
    const isReturnMode = state.mode === 'return';
    const isStartBeforeReturn = state.return.date > state.start.date;
    const isEveryInputValid = state.return.valid && state.start.valid;

    return isReturnMode
      ? isStartBeforeReturn && isEveryInputValid
      : state.start.valid;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const isReturnMode = state.mode === 'return';
    const message =
      `You have booked a ${isReturnMode ? '' : state.mode} flight` +
      ` on ${state.start.format}` +
      `${isReturnMode ? ` returning on ${state.return.format}` : ''}`;

    setState('message', message);

    setTimeout(() => setState('message', ''), 5000);
  };

  const handleInput = (
    type: Type,
    event: Event & { target: HTMLInputElement },
  ) => {
    const value = event.target.value;

    if (!isValidDate(value))
      return setState((state) => {
        state[type].valid = false;
      });

    const [day, month, year] = event.target.value
      .split('.')
      .map((number) => parseInt(number, 10));

    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);

    setState((state) => {
      state[type].date = date;
      state[type].format = formatDate(date);
      state[type].valid = true;
    });
  };

  return (
    <form
      class="flex flex-col items-center justify-center max-w-sm space-y-3 mx-auto mt-10"
      onSubmit={handleSubmit}
    >
      <Show when={!!state.message}>
        <p class="p-4 rounded border-blue-300 bg-blue-200 text-blue-900 border-2 mb-3 font-bold">
          {state.message}
        </p>
      </Show>

      <select
        class="py-1 px-4 w-full uppercase rounded font-bold text-center text-sm bg-gray-100 border border-gray-300 text-gray-900 "
        onChange={(event) => setState('mode', event.target.value)}
        value={state.mode}
      >
        <option value="one-way">one-way flight</option>
        <option value="return">return flight</option>
      </select>

      <input
        type="text"
        name="start"
        autocomplete="off"
        pattern="(\d{2}).(\d{2}).(\d{4})"
        value={state.start.format}
        onInput={[handleInput, START]}
        class="py-1 uppercase rounded w-full font-bold text-center text-sm bg-gray-100 border border-gray-300 text-gray-900 "
        classList={{ 'bg-red-200': !state.start.valid }}
      />
      <input
        type="text"
        name="return"
        autocomplete="off"
        pattern="(\d{2}).(\d{2}).(\d{4})"
        value={state.return.format}
        onInput={[handleInput, RETURN]}
        disabled={state.mode !== 'return'}
        class="py-1 uppercase rounded w-full font-bold text-center text-sm bg-gray-100 border border-gray-300 text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-700"
        classList={{ 'bg-red-200': !state.return.valid }}
      />

      <button
        type="submit"
        disabled={!isFormValid()}
        class="px-4 w-full py-1 uppercase rounded font-semibold text-sm bg-blue-100 border border-blue-300 text-blue-900 hover:bg-blue-200 disabled:cursor-not-allowed disabled:bg-gray-200"
      >
        Book
      </button>
    </form>
  );
}
