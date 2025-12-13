import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <div id="about"></div> {/* Placeholder for smooth scroll target if separate About is needed, otherwise Hero covers it */}
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </Layout>
  );
}

export default App;
