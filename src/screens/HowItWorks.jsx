import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';

// Step 1 placeholder: full content arrives in a later step.
export default function HowItWorks() {
  return (
    <Page title="How it works">
      <h1>How SafeCheck works</h1>
      <p>What we check, what we don't, and common warning signs go here.</p>
      <Link to="/">Back to start</Link>
    </Page>
  );
}
