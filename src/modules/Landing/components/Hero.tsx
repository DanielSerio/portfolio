import { useParticles } from "#landing/hooks";
import { Box, Text, TypographyStylesProvider } from "@mantine/core";
import Particles from "@tsparticles/react";

export function Hero() {
  const [{ options }, { particlesLoaded }] = useParticles();
  return (
    <Box component="section" w="100%">
      <Box w={"100%"} pos="relative">
        <Particles
          style={{ position: "relative" }}
          id="heroParticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
        <Text component="h1" className="hero-title">
          About
        </Text>
      </Box>

      <TypographyStylesProvider>
        <Box component="article" className="about-article" my={48}>
          <h1>Introduction</h1>
          <p>
            Hi! I'm Dan Serio. I am a senior frontend software engineer with{" "}
            <strong>10+ years of experience</strong>. I currently live near
            Cincinnati OH. With a background in graphic design, I provide a
            unique perspective on frontend development.
          </p>
          <h2>History</h2>
          <p>I am originally from the northern suburbs of Chicago, IL.</p>
          <p>
            Ever since I can remember, I have been obsessed with creating. My
            mother loves to tell the story of how when I was about 3 years old,
            I drew a picture of a helicopter that was better than anything she
            could draw.
          </p>
          <h3>How I Became Interested In Development</h3>
          <p>
            After high school, I enrolled at the American Academy of Art in
            Chicago. It was here that I received my BFA in Graphic Design. While
            in pursuit of my degree, my curriculum required me to take an
            introductory course to web design. I fell in love with the idea that
            the art that I was creating was actually interactive! I decided to
            continue to pursue my graphic design degree while learning website
            development on the side.
          </p>
        </Box>
      </TypographyStylesProvider>
    </Box>
  );
}
