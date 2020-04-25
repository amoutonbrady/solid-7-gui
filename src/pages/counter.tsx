import { createSignal } from 'solid-js';

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = (amount: number, event: Event) => {
    event.preventDefault();
    setCount(count() + amount);
  };

  return (
    <form onSubmit={[increment, 1]} class="mt-10 flex justify-center space-x-3">
      <input
        class="py-1 uppercase rounded font-bold text-center text-sm bg-gray-100 border border-gray-300 text-gray-900 w-12"
        type="text"
        readOnly={true}
        disabled={true}
        value={count()}
      />
      <button
        class="px-4 py-1 uppercase rounded font-semibold text-sm bg-blue-100 border border-blue-300 text-blue-900 hover:bg-blue-200"
        type="submit"
      >
        Count
      </button>
    </form>
  );
}
