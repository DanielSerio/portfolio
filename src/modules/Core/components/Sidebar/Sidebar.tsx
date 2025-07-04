import { SidebarProviders } from "./Providers";

export function Sidebar() {
  return (
    <SidebarProviders>
      <aside id="sidebar" className="sidebar">
        <nav id="mainNav">
          <div>Sidebar</div>
        </nav>
      </aside>
    </SidebarProviders>
  );
}
