import { WeatherProviders } from "./Providers";
import { WeatherDisplay } from "./WeatherDisplay";
import { WeatherForm } from "./WeatherForm";

export function Weather() {
  return (
    <WeatherProviders>
      <WeatherForm />
      <WeatherDisplay />
    </WeatherProviders>
  );
}
