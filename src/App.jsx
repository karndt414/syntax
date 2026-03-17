import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientMarquee from './components/ClientMarquee';
import Services from './components/Services';
import HowWeWork from './components/HowWeWork';
import BusinessModel from './components/BusinessModel';
import Team from './components/Team';
import Consultation from './components/Consultation';
import Footer from './components/Footer';
import AdminView from './components/AdminView';
import { useSiteContent } from './hooks/useSiteContent';

function Divider() {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: '3rem' }}>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
      <div className="relative w-2 h-2 rounded-full bg-teal/50 ring-4 ring-teal/10" />
    </div>
  );
}

export default function App() {
  const { content, loading, error, refresh, saveContent, hasSupabaseEnv } = useSiteContent();
  const isAdminRoute = window.location.pathname === '/admin';

  if (isAdminRoute) {
    return (
      <AdminView
        content={content}
        saveContent={saveContent}
        refresh={refresh}
        loading={loading}
        loadError={error}
        hasEnv={hasSupabaseEnv}
      />
    );
  }

  return (
    <div className="relative w-full">
      <Navbar data={content.navbar} />
      <main>
        <Hero data={content.hero} />
        <Divider />
        <ClientMarquee data={content.clients} />
        <Divider />
        <Services data={content.services} />
        <Divider />
        <HowWeWork data={content.process} />
        <Divider />
        <BusinessModel data={content.model} />
        <Divider />
        <Team data={content.team} />
        <Divider />
        <Consultation data={content.consultation} />
        <Footer data={content.footer} />
      </main>
    </div>
  );
}
