const links = [
  {
    href: "/apps/poke",
    name: "Poke",
  },
  {
    href: "/apps/pixel-canvas",
    name: "Pixel Canvas",
  },
  {
    href: "/apps/weather",
    name: "Weather",
  },
];

export function LinkList({ activePathName }: { activePathName: string }) {
  return (
    <>
      <em className="menu-title">Apps</em>
      <ul className="links">
        {links.map((link) => {
          return (
            <li
              key={link.href}
              className={link.href === activePathName ? "active" : undefined}
            >
              <a href={link.href}>{link.name}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
