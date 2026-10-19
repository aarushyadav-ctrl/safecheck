import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'motion/react';

import { AppProvider, useApp } from './context/AppContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './screens/Home.jsx';
import Quick from './screens/Quick.jsx';
import Check from './screens/Check.jsx';
import Results from './screens/Results.jsx';
import NextSteps from './screens/NextSteps.jsx';
import AskFamily from './screens/AskFamily.jsx';
import CallCoach from './screens/CallCoach.jsx';
import HowItWorks from './screens/HowItWorks.jsx';
import NotFound from './screens/NotFound.jsx';

// Not needed in a hurry, so loaded only when opened. (The call coach is not
// lazy: it must appear instantly while someone is on the phone.)
const Practice = lazy(() => import('./screens/Practice.jsx'));
const FamilyPlan = lazy(() => import('./screens/FamilyPlan.jsx'));

function AnimatedRoutes() {
  const location = useLocation();
  const { settings } = useApp();

  return (
    // "user" follows the device's reduce-motion setting; our own toggle forces it on.
    <MotionConfig reducedMotion={settings.reduceMotion ? 'always' : 'user'}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/quick" element={<Quick />} />
          <Route path="/check" element={<Check />} />
          <Route path="/results" element={<Results />} />
          <Route path="/next-steps" element={<NextSteps />} />
          <Route path="/ask-family" element={<AskFamily />} />
          <Route path="/call" element={<CallCoach />} />
          <Route path="/practice" element={<Suspense fallback={null}><Practice /></Suspense>} />
          <Route path="/family-plan" element={<Suspense fallback={null}><FamilyPlan /></Suspense>} />
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
