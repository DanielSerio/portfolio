import { PokeView } from "./PokeView";
import { PokeProviders } from "./Providers";

export function Poke() {
  return (
    <PokeProviders>
      <PokeView />
    </PokeProviders>
  );
}
