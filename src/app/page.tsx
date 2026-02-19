import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Highlights from "@/components/sections/Highlights";
import Collections from "@/components/sections/Collections";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Collections />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
