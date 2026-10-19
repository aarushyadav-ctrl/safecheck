import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';

// Step 1 placeholder: the one-step-at-a-time guide arrives in step 3.
export default function NextSteps() {
  return (
    <Page title="What to do now">
      <h1>What should I do now?</h1>
      <p>The guided steps go here.</p>
      <Link to="/results">Back to my result</Link>
    </Page>
  );
}
