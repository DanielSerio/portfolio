import { Hero } from "./Hero";
import { LandingProviders } from "./Providers";

export function Landing() {
  return (
    <LandingProviders>
      <Hero />
    </LandingProviders>
  );
}
