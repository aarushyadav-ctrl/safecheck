import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import CopyButton from '../components/CopyButton.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import { QUIZ } from '../data/quiz.js';

const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

/**
 * "Spot the Scam": a short practice quiz. Choose Scam or Safe, then see why.
 * Score and streak are shown, and announced to screen readers.
 */
export default function Practice() {
  const { announce } = useApp();
  const t = useT();
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null); // 'scam' | 'safe' once answered
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [finished, setFinished] = useState(false);
  const headingRef = useRef(null);
  const feedbackRef = useRef(null);
  const moved = useRef(false);

  const item = QUIZ[index];
  const content = item[t.lang] || item.en;
  const correct = choice === item.answer;

  // Move focus to what's new: the next message, or the final score.
  useEffect(() => {
    if (!moved.current) return;
    const id = setTimeout(() => headingRef.current?.focus(), 200);
    return () => clearTimeout(id);
  }, [index, finished]);

  function answer(pick) {
    if (choice) return;
    const isRight = pick === item.answer;
    const newScore = score + (isRight ? 1 : 0);
    const newStreak = isRight ? streak + 1 : 0;
    setChoice(pick);
    setScore(newScore);
    setStreak(newStreak);
    setBest((b) => Math.max(b, newStreak));
    announce(
      `${isRight ? t('practice.right') : t('practice.wrong')} ${t(`practice.itWas.${item.answer}`)} ${t('practice.scoreLine', { score: newScore, total: QUIZ.length, streak: newStreak })}`,
    );
    setTimeout(() => feedbackRef.current?.focus(), 150);
  }

  function next() {
    moved.current = true;
    if (index + 1 >= QUIZ.length) {
      setFinished(true);
      announce(t('practice.final', { score, total: QUIZ.length }));
    } else {
      setIndex(index + 1);
      setChoice(null);
    }
  }

  function restart() {
    moved.current = true;
    setIndex(0);
    setChoice(null);
    setScore(0);
    setStreak(0);
    setBest(0);
    setFinished(false);
  }

  const shareText = t('practice.shareText', { score, total: QUIZ.length });

  return (
    <Page title={t('practice.pageTitle')} className="practice">
      <h1>{t('practice.title')}</h1>
      <p className="lead">{t('practice.lead')}</p>

      <div className="scoreboard" aria-hidden="true">
        <span>
          <Icon name="award" /> {t('practice.scoreShort', { score, total: QUIZ.length })}
        </span>
        <span>
          <Icon name="flame" /> {t('practice.streakShort', { streak })}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {finished ? (
          <motion.section
            key="summary"
            className="step-card step-card--done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            aria-labelledby="practice-summary"
          >
            <span className="step-card__done-icon">
              <Icon name="award" size="1.75rem" />
            </span>
            <h2 id="practice-summary" ref={headingRef} tabIndex={-1}>
              {t('practice.final', { score, total: QUIZ.length })}
            </h2>
            <p>{score >= 8 ? t('practice.great') : score >= 5 ? t('practice.good') : t('practice.keepGoing')}</p>
            <p>{t('practice.bestStreak', { best })}</p>
            <div className="button-row">
              {canShare && (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => navigator.share({ text: shareText }).catch(() => {})}
                >
                  <Icon name="share" />
                  {t('practice.share')}
                </button>
              )}
              <CopyButton
                className={`btn ${canShare ? 'btn--secondary' : 'btn--primary'}`}
                label={t('practice.copyScore')}
                getText={() => shareText}
              />
              <button type="button" className="btn btn--secondary" onClick={restart}>
                <Icon name="refresh" />
                {t('practice.again')}
              </button>
              <Link to="/" className="btn btn--quiet">
                {t('common.backToStart')}
              </Link>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key={item.id}
            className="step-card quiz-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
            aria-labelledby="quiz-title"
          >
            <h2 id="quiz-title" ref={headingRef} tabIndex={-1} className="step-card__title">
              <span className="step-card__count">
                {t('practice.count', { n: index + 1, total: QUIZ.length })}
              </span>
              {t('practice.question')}
            </h2>

            <figure className="quiz-message">
              <figcaption className="sms__from">{content.from}</figcaption>
              <p className="sms__body message-text">{content.text}</p>
            </figure>

            <div className="quiz-answers" role="group" aria-label={t('practice.answerLabel')}>
              {['scam', 'safe'].map((pick) => (
                <button
                  key={pick}
                  type="button"
                  className={`quiz-answer quiz-answer--${pick}`}
                  onClick={() => answer(pick)}
                  aria-pressed={choice === pick}
                  disabled={Boolean(choice) && choice !== pick}
                >
                  <Icon name={pick === 'scam' ? 'shieldAlert' : 'shieldCheck'} size="1.5rem" />
                  {t(`practice.choose.${pick}`)}
                </button>
              ))}
            </div>

            {choice && (
              <motion.div
                className={`quiz-feedback quiz-feedback--${correct ? 'right' : 'wrong'}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 ref={feedbackRef} tabIndex={-1} className="quiz-feedback__title">
                  <Icon name={correct ? 'check' : 'x'} />
                  {correct ? t('practice.right') : t('practice.wrong')}
                </h3>
                <p className="quiz-feedback__answer">{t(`practice.itWas.${item.answer}`)}</p>
                <p className="quiz-feedback__why">
                  {item.answer === 'scam' ? t('practice.redFlags') : t('practice.whySafe')}
                </p>
                <ul className="plain-list">
                  {content.flags.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <button type="button" className="btn btn--primary" onClick={next}>
                  {index + 1 >= QUIZ.length ? t('practice.seeScore') : t('practice.next')}
                  <Icon name="arrowRight" />
                </button>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </Page>
  );
}
