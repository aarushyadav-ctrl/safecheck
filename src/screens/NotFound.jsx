import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';

export default function NotFound() {
  return (
    <Page title="Page not found">
      <h1>We can't find that page</h1>
      <p>The link may be old or typed wrong.</p>
      <Link className="btn btn--primary" to="/">
        Go to the start
      </Link>
    </Page>
  );
}
