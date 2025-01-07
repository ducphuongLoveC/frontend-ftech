import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// GradientIcon.jsx
import React from 'react';
const GradientIcon = ({ children }) => {
    return (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "grad1", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "red", children: _jsx("animate", { attributeName: "stop-color", values: "red;yellow;green;red", dur: "4s", repeatCount: "indefinite" }) }), _jsx("stop", { offset: "50%", stopColor: "yellow", children: _jsx("animate", { attributeName: "stop-color", values: "yellow;green;red;yellow", dur: "4s", repeatCount: "indefinite" }) }), _jsx("stop", { offset: "100%", stopColor: "green", children: _jsx("animate", { attributeName: "stop-color", values: "green;red;yellow;green", dur: "4s", repeatCount: "indefinite" }) })] }) }), React.cloneElement(children, {
                fill: 'url(#grad1)',
            })] }));
};
export default GradientIcon;
