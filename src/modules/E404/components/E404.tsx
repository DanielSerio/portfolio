import { useParticles } from "#landing/hooks";
import Particles from "@tsparticles/react";
import { E404Providers } from "./Providers";
import { Anchor, Box, TypographyStylesProvider } from "@mantine/core";

export function E404() {
  const [{ options }, { particlesLoaded }] = useParticles({ fullScreen: true });
  const name = window.location.pathname;

  return (
    <E404Providers>
      <Particles
        style={{ position: "relative" }}
        id="particles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <TypographyStylesProvider>
        <Box component="article" style={{}}>
          <h4>{name} does not exist...</h4>
          <Anchor
            style={{ cursor: "pointer" }}
            underline="hover"
            onClick={() => {
              window.history.back();
              setTimeout(() => window.location.reload(), 0);
            }}
          >
            Go Back
          </Anchor>
        </Box>
      </TypographyStylesProvider>
    </E404Providers>
  );
}
