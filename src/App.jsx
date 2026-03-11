import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientMarquee from './components/ClientMarquee';
import Services from './components/Services';
import HowWeWork from './components/HowWeWork';
import BusinessModel from './components/BusinessModel';
import Team from './components/Team';
import Consultation from './components/Consultation';
import Footer from './components/Footer';

function Divider() {
  return (
    <div className="relative w-full h-px overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal/25 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-teal/40" />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative w-full">
      <Navbar />
      <Hero />
      <Divider />
      <ClientMarquee />
      <Divider />
      <Services />
      <Divider />
      <HowWeWork />
      <Divider />
      <BusinessModel />
      <Divider />
      <Team />
      <Divider />
      <Consultation />
      <Footer />
    </div>
  );
}
