import { HeaderProviders } from "./Providers";

export function Header() {
  return (
    <HeaderProviders>
      <header id="header" className="header">
        <div>Header</div>
      </header>
    </HeaderProviders>
  );
}
