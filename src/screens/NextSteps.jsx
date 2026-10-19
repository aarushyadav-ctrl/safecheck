import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import ReadAloudButton from '../components/ReadAloudButton.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getSteps } from '../lib/steps.js';

// Forward slides in from the right, back slides in from the left.
const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 36 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir * -24, transition: { duration: 0.16 } }),
};

export default function NextSteps() {
  const [params] = useSearchParams();
  const path = params.get('path') === 'clicked' ? 'clicked' : 'main';
  const { check, resetCheck } = useApp();
  const navigate = useNavigate();
  const steps = getSteps(check.result, path);

  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [dir, setDir] = useState(1);
  const headingRef = useRef(null);
  const moved = useRef(false);

  // Switching between "normal" and "I already tapped a link" starts again at step 1.
  useEffect(() => {
    setIndex(0);
    setDone(false);
  }, [path]);

  // After each move, put focus on the new step's heading so it is read out.
  useEffect(() => {
    if (!moved.current) return;
    const id = setTimeout(() => headingRef.current?.focus(), 220);
    return () => clearTimeout(id);
  }, [index, done, path]);

  function go(next) {
    moved.current = true;
    setDir(next > index ? 1 : -1);
    if (next >= steps.length) setDone(true);
    else setIndex(next);
  }

  const step = steps[Math.min(index, steps.length - 1)];
  const isLast = index === steps.length - 1;
  const clicked = path === 'clicked';

  return (
    <Page title={clicked ? 'If you already tapped a link' : 'What to do now'} className="steps">
      <h1>{clicked ? 'If you already tapped a link or replied' : 'What should I do now?'}</h1>
      <p className="lead">
        {clicked
          ? "Don't worry. Acting quickly helps a lot. Let's go one step at a time."
          : "Let's go one step at a time. Take as long as you need."}
      </p>

      <p className="steps__switch">
        {clicked ? (
          <Link to="/next-steps" className="text-link" onClick={() => (moved.current = true)}>
            I didn't tap or reply to anything
          </Link>
        ) : (
          <Link
            to="/next-steps?path=clicked"
            className="text-link"
            onClick={() => (moved.current = true)}
          >
            <Icon name="pointer" />
            I already tapped a link, replied, or shared information
          </Link>
        )}
      </p>

      {!done && (
        <div className="progress" aria-hidden="true">
          <div
            className="progress__fill"
            style={{ transform: `scaleX(${(index + 1) / steps.length})` }}
          />
        </div>
      )}

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        {done ? (
          <motion.section
            key="done"
            className="step-card step-card--done"
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            aria-labelledby="done-title"
          >
            <span className="step-card__done-icon">
              <Icon name="check" size="1.75rem" />
            </span>
            <h2 id="done-title" ref={headingRef} tabIndex={-1}>
              You're all done
            </h2>
            <p>You did the right thing by checking first. Here is what you did:</p>
            <ol className="done-list" role="list">
              {steps.map((s) => (
                <li key={s.title}>
                  <Icon name="check" />
                  {s.title}
                </li>
              ))}
            </ol>
            <div className="button-row">
              <Link to="/ask-family" className="btn btn--primary">
                <Icon name="users" />
                Ask someone I trust
              </Link>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => {
                  resetCheck();
                  navigate('/check');
                }}
              >
                Check another message
              </button>
              <button
                type="button"
                className="btn btn--quiet"
                onClick={() => {
                  moved.current = true;
                  setDir(-1);
                  setDone(false);
                  setIndex(0);
                }}
              >
                Go over the steps again
              </button>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key={`${path}-${index}`}
            className="step-card"
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            aria-labelledby="step-title"
          >
            <h2 id="step-title" ref={headingRef} tabIndex={-1} className="step-card__title">
              <span className="step-card__count">
                Step {index + 1} of {steps.length}
                <span className="visually-hidden">:</span>
              </span>{' '}
              {step.title}
            </h2>
            <p className="step-card__body">{step.body}</p>
            <ReadAloudButton
              label="Read this step to me"
              className="btn--small step-card__read"
              getText={() => `Step ${index + 1} of ${steps.length}. ${step.title}. ${step.body}`}
            />
            {step.links?.map((l) => (
              <p key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-link">
                  {l.label}
                  <Icon name="external" />
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </p>
            ))}
          </motion.section>
        )}
      </AnimatePresence>

      {!done && (
        <div className="step-nav">
          {index > 0 ? (
            <button type="button" className="btn btn--secondary" onClick={() => go(index - 1)}>
              <Icon name="arrowLeft" />
              Back
            </button>
          ) : (
            <Link to={check.result ? '/results' : '/'} className="btn btn--secondary">
              <Icon name="arrowLeft" />
              {check.result ? 'Back to my result' : 'Back to start'}
            </Link>
          )}
          <button type="button" className="btn btn--primary" onClick={() => go(index + 1)}>
            {isLast ? 'Done' : 'Next step'}
            <Icon name={isLast ? 'check' : 'arrowRight'} />
          </button>
        </div>
      )}
    </Page>
  );
}
