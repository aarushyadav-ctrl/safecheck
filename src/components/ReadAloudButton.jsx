import Icon from './Icon.jsx';
import { useT } from '../i18n/index.js';
import { speechSupported, useSpeech } from '../lib/speech.js';

/** "Read this to me" / "Stop reading". Hidden on browsers that can't speak. */
export default function ReadAloudButton({ getText, label, className = '' }) {
  const { status, speaking, speak, stop } = useSpeech();
  const t = useT();
  if (!speechSupported) return null;

  return (
    <button
      type="button"
      className={`btn btn--secondary ${className}`}
      onClick={() => (speaking ? stop() : speak(getText()))}
      aria-busy={status === 'loading' || undefined}
    >
      <Icon name={speaking ? 'stop' : 'speaker'} />
      {status === 'loading' ? t('speech.loading') : speaking ? t('speech.stop') : label || t('speech.read')}
    </button>
  );
}
