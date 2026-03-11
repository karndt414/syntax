import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientMarquee from './components/ClientMarquee';
import Services from './components/Services';
import HowWeWork from './components/HowWeWork';
import BusinessModel from './components/BusinessModel';
import Team from './components/Team';
import Consultation from './components/Consultation';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative w-full">
      <Navbar />
      <Hero />
      <ClientMarquee />
      <Services />
      <HowWeWork />
      <BusinessModel />
      <Team />
      <Consultation />
      <Footer />
    </div>
  );
}
