
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Clients from '../components/Clients';
import Contact from '../components/Contact';

interface HomePageProps {
    content: any; // Simplified type for content object
}

const HomePage: React.FC<HomePageProps> = ({ content }) => {
    return (
        <main>
            <Hero content={content.hero} />
            <About content={content.about} />
            <Portfolio content={content.portfolio} />
            <Clients content={content.clients} clients_data={content.clients_data} />
            <Contact content={content.contact} />
        </main>
    );
};

export default HomePage;
