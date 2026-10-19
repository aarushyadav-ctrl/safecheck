import Icon from './Icon.jsx';
import { speechSupported, useSpeech } from '../lib/speech.js';

/** "Read this to me" / "Stop reading". Hidden on browsers that can't speak. */
export default function ReadAloudButton({ getText, label = 'Read this to me', className = '' }) {
  const { speaking, speak, stop } = useSpeech();
  if (!speechSupported) return null;

  return (
    <button
      type="button"
      className={`btn btn--secondary ${className}`}
      onClick={() => (speaking ? stop() : speak(getText()))}
    >
      <Icon name={speaking ? 'stop' : 'speaker'} />
      {speaking ? 'Stop reading' : label}
    </button>
  );
}
