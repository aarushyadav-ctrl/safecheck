import { useState } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import CopyButton from '../components/CopyButton.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import { buildShareNote } from '../lib/share.js';

const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

export default function AskFamily() {
  const { check, mode } = useApp();
  const t = useT();
  const result = check.result;
  const [note, setNote] = useState(() =>
    result
      ? buildShareNote(
          {
            result,
            text: check.sentText || check.text,
            claimedSender: check.claimedSender,
            linkReport: check.linkReport,
            link: check.link,
          },
          t,
        )
      : '',
  );
  const resultPath = mode === 'quick' ? '/quick' : '/results';

  if (!result) {
    return (
      <Page title={t('ask.title')}>
        <h1>{t('ask.title')}</h1>
        <p>{t('ask.noResult')}</p>
        <Link className="btn btn--primary" to={mode === 'quick' ? '/quick' : '/check'}>
          {t('results.noneAction')}
          <Icon name="arrowRight" />
        </Link>
      </Page>
    );
  }

  async function shareNote() {
    try {
      await navigator.share({ title: t('ask.subject'), text: note });
    } catch {
      // The person closed the share sheet. Nothing to do.
    }
  }

  const body = encodeURIComponent(note);

  return (
    <Page title={t('ask.title')} className="ask">
      <h1>{t('ask.title')}</h1>
      <p className="lead">{t('ask.lead')}</p>

      <div className="field">
        <label htmlFor="share-note" className="field__label">
          {t('ask.noteLabel')}
        </label>
        <p id="share-note-hint" className="field__hint">
          {t('ask.noteHint')}
        </p>
        <textarea
          id="share-note"
          className="field__input share-note"
          rows={12}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          aria-describedby="share-note-hint"
        />
      </div>

      <h2 className="ask__how">{t('ask.how')}</h2>
      <ul className="share-options" role="list">
        {canShare && (
          <li>
            <button type="button" className="btn btn--primary" onClick={shareNote}>
              <Icon name="share" />
              {t('ask.share')}
            </button>
          </li>
        )}
        <li>
          <a className="btn btn--secondary" href={`sms:?&body=${body}`}>
            <Icon name="message" />
            {t('ask.sms')}
          </a>
        </li>
        <li>
          <a
            className="btn btn--secondary"
            href={`mailto:?subject=${encodeURIComponent(t('ask.subject'))}&body=${body}`}
          >
            <Icon name="mail" />
            {t('ask.email')}
          </a>
        </li>
        <li>
          <CopyButton
            className={`btn ${canShare ? 'btn--secondary' : 'btn--primary'}`}
            label={t('ask.copy')}
            copiedMessage={t('ask.copied')}
            getText={() => note}
          />
        </li>
      </ul>

      <p className="ask__call">
        <Icon name="phone" />
        <span>{t('ask.call')}</span>
      </p>

      <Link to={resultPath} className="text-link">
        <Icon name="arrowLeft" />
        {t('common.backToResult')}
      </Link>
    </Page>
  );
}
