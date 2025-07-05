import { WeatherProviders } from "./Providers";
import { WeatherForm } from "./WeatherForm";

export function Weather() {
  return (
    <WeatherProviders>
      <WeatherForm />
    </WeatherProviders>
  );
}
