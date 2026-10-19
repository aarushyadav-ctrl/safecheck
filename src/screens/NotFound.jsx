import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import { useT } from '../i18n/index.js';

export default function NotFound() {
  const t = useT();
  return (
    <Page title={t('notFound.title')}>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.body')}</p>
      <Link className="btn btn--primary" to="/">
        {t('common.backToStart')}
      </Link>
    </Page>
  );
}
