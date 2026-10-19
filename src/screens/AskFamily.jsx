import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { buildShareNote } from '../lib/share.js';

const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
const SUBJECT = 'Can you help me check a message?';

export default function AskFamily() {
  const { check, announce } = useApp();
  const result = check.result;
  const [note, setNote] = useState(() =>
    result ? buildShareNote({ result, text: check.text, claimedSender: check.claimedSender }) : '',
  );
  const [copied, setCopied] = useState(false);
  const noteRef = useRef(null);

  if (!result) {
    return (
      <Page title="Ask someone you trust">
        <h1>Ask someone you trust</h1>
        <p>Check a message first. Then we'll write a short note you can send to family or a friend.</p>
        <Link className="btn btn--primary" to="/check">
          Check a message
          <Icon name="arrowRight" />
        </Link>
      </Page>
    );
  }

  async function copyNote() {
    try {
      await navigator.clipboard.writeText(note);
    } catch {
      // Older browsers: select the text and use the old copy command.
      noteRef.current?.select();
      document.execCommand('copy');
    }
    setCopied(true);
    announce('Note copied. You can paste it into a text message or email.');
    setTimeout(() => setCopied(false), 4000);
  }

  async function shareNote() {
    try {
      await navigator.share({ title: SUBJECT, text: note });
    } catch {
      // The person closed the share sheet. Nothing to do.
    }
  }

  const body = encodeURIComponent(note);

  return (
    <Page title="Ask someone you trust" className="ask">
      <h1>Ask someone you trust</h1>
      <p className="lead">
        It's always fine to get a second opinion. We wrote a short note for a family member or
        friend. You can change the words first.
      </p>

      <div className="field">
        <label htmlFor="share-note" className="field__label">
          Your note
        </label>
        <p id="share-note-hint" className="field__hint">
          Web addresses are changed a little, like example[.]com, so nobody taps a scam link by
          accident.
        </p>
        <textarea
          id="share-note"
          ref={noteRef}
          className="field__input share-note"
          rows={12}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          aria-describedby="share-note-hint"
        />
      </div>

      <h2 className="ask__how">How do you want to send it?</h2>
      <ul className="share-options" role="list">
        {canShare && (
          <li>
            <button type="button" className="btn btn--primary" onClick={shareNote}>
              <Icon name="share" />
              Share
            </button>
          </li>
        )}
        <li>
          <a className="btn btn--secondary" href={`sms:?&body=${body}`}>
            <Icon name="message" />
            Send as a text message
          </a>
        </li>
        <li>
          <a
            className="btn btn--secondary"
            href={`mailto:?subject=${encodeURIComponent(SUBJECT)}&body=${body}`}
          >
            <Icon name="mail" />
            Send as an email
          </a>
        </li>
        <li>
          <button
            type="button"
            className={`btn ${canShare ? 'btn--secondary' : 'btn--primary'}`}
            onClick={copyNote}
          >
            <Icon name={copied ? 'check' : 'copy'} />
            {copied ? 'Copied' : 'Copy the note'}
          </button>
        </li>
      </ul>

      <p className="ask__call">
        <Icon name="phone" />
        <span>You can also just call them and read them the message.</span>
      </p>

      <Link to="/results" className="text-link">
        <Icon name="arrowLeft" />
        Back to my result
      </Link>
    </Page>
  );
}
