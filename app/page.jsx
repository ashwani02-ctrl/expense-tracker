
import Header from "./_components/Header";

import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div>
      <Header
      buttonLink="/login"
      buttonText="Get Started"></Header>
      <Hero></Hero>
    </div>
  );
}
