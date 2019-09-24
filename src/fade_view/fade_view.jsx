import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Type } from "schema-verify";
import "./fade_view.css";

const CLASSNAME = "cffade";
const TIMEOUT_CONFIG = { enter: 500, exit: 300 };

class FadeView extends React.PureComponent {
    render() {
        const { props } = this;
        const { hidden } = props;

        let classNames = props.classNames;
        let children = props.children;
        
        classNames = Type.string.isNotEmpty(classNames)
            ? classNames
            : CLASSNAME;

        children = hidden ? null : children;

        const transItems = React.Children.map(children, (item, i) => {
            return (
                <CSSTransition
                    key={i}
                    classNames={classNames}
                    timeout={TIMEOUT_CONFIG}
                >
                    {item}
                </CSSTransition>
            );
        });

        return <TransitionGroup>{transItems}</TransitionGroup>;
    }
}

export default FadeView;
