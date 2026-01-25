import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Clients from '../components/Clients';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

interface HomePageProps {
    content: any; // Simplified type for content object
}

const HomePage: React.FC<HomePageProps> = ({ content }) => {
    return (
        <main>
            <Hero content={content.hero} />
            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 to-transparent">
                <About content={content.about} />
                <Portfolio content={content.portfolio} />
                <Clients content={content.clients} clients_data={content.clients_data} />
                <Contact content={content.contact} />
                <Footer content={content.footer} />
            </div>
        </main>
    );
};

export default HomePage;