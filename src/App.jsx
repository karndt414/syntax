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
    <div className="relative w-full flex items-center justify-center" style={{ height: '3rem' }}>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
      <div className="relative w-2 h-2 rounded-full bg-teal/50 ring-4 ring-teal/10" />
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
