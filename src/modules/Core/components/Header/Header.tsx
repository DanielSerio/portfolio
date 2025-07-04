import { Box } from "@mantine/core";
import { HeaderProviders } from "./Providers";

export function Header() {
  return (
    <HeaderProviders>
      <Box component="header" id="header" className="header" h={48}>
        <div>Header</div>
      </Box>
    </HeaderProviders>
  );
}
