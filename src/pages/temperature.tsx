import { createSignal } from 'solid-js';

const CELSIUS = 'CELSIUS';
const FAHRENHEIT = 'FAHRENHEIT';
type Unit = 'CELSIUS' | 'FAHRENHEIT';

const FtoC = (f: number) => ((f - 32) * (5 / 9)).toString();
const CtoF = (c: number) => (c * (9 / 5) + 32).toString();
const isNumber = (n: string) => n.match(/\d+(.\d+)?/gi);

export default function Temperature() {
  const [f, setF] = createSignal('0');
  const [c, setC] = createSignal('0');
  setF(CtoF(parseFloat(c())));

  const handleInput = (
    unit: Unit,
    event: InputEvent & { target: HTMLInputElement },
  ) => {
    const value = event.target.value;
    const shouldConvert = isNumber(value);

    switch (unit) {
      case 'CELSIUS':
        setC(value);
        shouldConvert && setF(CtoF(parseFloat(c())));
        break;

      case 'FAHRENHEIT':
        setF(value);
        shouldConvert && setC(FtoC(parseFloat(f())));
        break;
    }
  };

  return (
    <section class="flex flex-col space-y-3 items-center justify-center font-bold text-xl mt-10">
      <div class="flex items-center space-x-3">
        <input
          class="py-1 uppercase rounded font-bold text-center text-sm bg-gray-100 border border-gray-300 text-gray-900 w-32"
          onInput={[handleInput, CELSIUS]}
          value={c()}
        />{' '}
        <span>°C</span>
      </div>

      <div class="flex items-center space-x-3">
        <input
          class="py-1 uppercase rounded font-bold text-center text-sm bg-gray-100 border border-gray-300 text-gray-900 w-32"
          onInput={[handleInput, FAHRENHEIT]}
          value={f()}
        />{' '}
        <span>°F</span>
      </div>
    </section>
  );
}
