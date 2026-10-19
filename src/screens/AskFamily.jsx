import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';

// Step 1 placeholder: the share summary arrives in step 5.
export default function AskFamily() {
  return (
    <Page title="Ask someone you trust">
      <h1>Ask someone you trust</h1>
      <p>The summary and share buttons go here.</p>
      <Link to="/results">Back to my result</Link>
    </Page>
  );
}
