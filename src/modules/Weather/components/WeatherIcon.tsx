import { getWeatherIconName } from "#weather/utilities";
import { lazy, Suspense, type ReactNode } from "react";
import type { IconBaseProps, IconType } from "react-icons/lib";

interface WIProps extends IconBaseProps {
  code: number;
  isNight?: boolean;
  fallback: ReactNode;
}

export function WeatherIcon({ code, isNight, fallback, ...props }: WIProps) {
  const iconName = getWeatherIconName(code, isNight ?? false);
  const Icon = lazy(async () => {
    const module = await import("react-icons/wi");
    const icon = (module as any)[iconName]! as IconType;

    return {
      default: icon,
    };
  });

  return (
    <Suspense fallback={fallback}>
      <Icon {...props} />
    </Suspense>
  );
}
