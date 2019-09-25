import React from "react";
import { Transition } from "react-transition-group";

const DURATION = 300;

const DEFAULT_STYLES = {
    position: "relative",
    width: "100%",
    transition: `opacity ${DURATION}ms ease-in-out`,
    opacity: 0
};

const TRANS_STYLES = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
};

class FadeView extends React.PureComponent {
    render() {
        const { props } = this;
        const { hidden, children } = props;
        return (
            <Transition unmountOnExit={true} in={!hidden} timeout={DURATION}>
                {state => (
                    <div
                        style={{
                            ...DEFAULT_STYLES,
                            ...TRANS_STYLES[state]
                        }}
                    >
                        {children}
                    </div>
                )}
            </Transition>
        );
    }
}

export default FadeView;
