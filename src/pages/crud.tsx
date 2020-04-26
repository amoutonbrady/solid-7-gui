import { createState } from 'solid-js';
import { For } from 'solid-js/dom';

const getFullName = (firstname: string, lastname: string) =>
  `${firstname}, ${lastname}`;

export default function Crud() {
  const [state, setState] = createState({
    firstname: '',
    lastname: '',
    search: '',
    selected: '',
    persons: [] as Person[],
  });

  // COMPUTED
  const filteredList = () => {
    return state.persons.filter(({ firstname, lastname }) => {
      const fullname = getFullName(firstname, lastname);
      return fullname.toLowerCase().includes(state.search.toLowerCase());
    });
  };

  // HELPER
  const reset = () => setState({ selected: '', firstname: '', lastname: '' });

  // CRUD OPERATIONS (METHODS)
  const createPerson = (event: Event) => {
    event.preventDefault();

    setState((state) => {
      state.persons.push({
        id: '_' + Math.random().toString(36).substr(2, 9),
        firstname: state.firstname,
        lastname: state.lastname,
      });
    });

    reset();
  };

  const updatePerson = () => {
    const { firstname, lastname, selected } = state;

    setState(
      'persons',
      (p) => p.id === selected,
      () => ({ firstname, lastname }),
    );

    reset();
  };

  const deletePerson = () => {
    setState({ persons: state.persons.filter((p) => p.id !== state.selected) });
    reset();
  };

  const selectPerson = ({ id: selected, firstname, lastname }: Person) => {
    setState({ selected, firstname, lastname });
  };

  // VIEW
  return (
    <form
      class="max-w-md mx-auto grid grid-cols-2 gap-3 mt-10"
      onSubmit={createPerson}
    >
      <div class="flex flex-col space-y-1">
        <label
          for="filter"
          class="uppercase text-sm text-gray-200 flex justify-between font-bold"
        >
          Filter prefix
        </label>
        <input
          id="filter"
          name="filter"
          type="search"
          class="py-1 px-2 rounded font-bold text-sm bg-gray-100 border border-gray-300 text-gray-900"
          value={state.search}
          onInput={(e) => setState('search', e.target.value)}
        />
      </div>

      <ul class="row-start-2 col-start-1 bg-gray-800 flex flex-col">
        <For
          each={filteredList()}
          fallback={<li class="text-center py-2">No person yet</li>}
        >
          {(person) => (
            <li>
              <button
                type="button"
                class="px-3 py-2 hover:bg-gray-900 w-full"
                classList={{ 'bg-blue-800': person.id === state.selected }}
                onClick={[selectPerson, person]}
              >
                {getFullName(person.firstname, person.lastname)}
              </button>
            </li>
          )}
        </For>
      </ul>

      <div class="row-start-2 col-start-2 space-y-3">
        <div class="flex flex-col space-y-1">
          <label
            for="firstname"
            class="uppercase text-sm text-gray-200 flex justify-between font-bold"
          >
            firstname
          </label>
          <input
            id="firstname"
            type="text"
            name="firstname"
            class="py-1 px-2 rounded font-bold text-sm bg-gray-100 border border-gray-300 text-gray-900"
            required={true}
            value={state.firstname}
            onInput={(e) => setState('firstname', e.target.value)}
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label
            class="uppercase text-sm text-gray-200 flex justify-between font-bold"
            for="surname"
          >
            surname
          </label>
          <input
            id="surname"
            type="text"
            name="surname"
            class="py-1 px-2 rounded font-bold text-sm bg-gray-100 border border-gray-300 text-gray-900"
            required={true}
            value={state.lastname}
            onInput={(e) => setState('lastname', e.target.value)}
          />
        </div>
      </div>

      <div class="row-start-3 col-span-2 space-x-3">
        <button
          type="submit"
          class="px-4 py-1 px-2 ml-auto uppercase rounded font-semibold text-sm bg-green-100 border border-green-300 text-green-900 hover:bg-green-200"
        >
          Create
        </button>
        <button
          type="button"
          class="px-4 py-1 px-2 ml-auto uppercase rounded font-semibold text-sm bg-blue-100 border border-blue-300 text-blue-900 hover:bg-blue-200 disabled:cursor-not-allowed disabled:bg-gray-200"
          disabled={!state.selected}
          onClick={updatePerson}
        >
          Update
        </button>
        <button
          type="button"
          class="px-4 py-1 px-2 ml-auto uppercase rounded font-semibold text-sm bg-red-100 border border-red-300 text-red-900 hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-gray-200"
          disabled={!state.selected}
          onClick={deletePerson}
        >
          Delete
        </button>
      </div>
    </form>
  );
}

// TYPES
type Person = {
  id: string;
  firstname: string;
  lastname: string;
};
