import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'motion/react';

import { AppProvider, useApp } from './context/AppContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './screens/Home.jsx';
import Check from './screens/Check.jsx';
import Results from './screens/Results.jsx';
import NextSteps from './screens/NextSteps.jsx';
import AskFamily from './screens/AskFamily.jsx';
import HowItWorks from './screens/HowItWorks.jsx';
import NotFound from './screens/NotFound.jsx';

function AnimatedRoutes() {
  const location = useLocation();
  const { settings } = useApp();

  return (
    // "user" follows the device's reduce-motion setting; our own toggle forces it on.
    <MotionConfig reducedMotion={settings.reduceMotion ? 'always' : 'user'}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/check" element={<Check />} />
          <Route path="/results" element={<Results />} />
          <Route path="/next-steps" element={<NextSteps />} />
          <Route path="/ask-family" element={<AskFamily />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </AppProvider>
  );
}
