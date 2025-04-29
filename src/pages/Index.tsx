
import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import Features from '../components/home/Features';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <Features />
      <CallToAction />
    </Layout>
  );
};

export default Index;
