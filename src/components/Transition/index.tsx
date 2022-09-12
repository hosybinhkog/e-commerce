import React from "react";
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";

interface TransitonProps {
  children: React.ReactNode;
  location: string;
}

const TIMEOUT = 500;

const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transfrom: `translateX(50px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateX(0px)`,
    animation: "blink .3s linear 2",
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateX(-50px)`,
  },
};

const Transition: React.FC<TransitonProps> = ({ children, location }) => {
  return (
    <TransitionGroup style={{ position: "relative" }}>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <div
            style={{
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};

export default Transition;
