import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';

// Step 1 placeholder: the verdict and red flags arrive in step 3.
export default function Results() {
  return (
    <Page title="Your result">
      <h1>Your result</h1>
      <p>The verdict and red flags go here.</p>
      <div className="stack">
        <Link className="btn btn--primary" to="/next-steps">
          What should I do now?
        </Link>
        <Link className="btn btn--secondary" to="/ask-family">
          Ask someone I trust
        </Link>
      </div>
    </Page>
  );
}
