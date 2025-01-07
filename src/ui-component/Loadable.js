import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
// Project imports
import Loader from './Loader';
// Define the type for the Loadable component
const Loadable = (Component) => (props) => (_jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsx(Component, { ...props }) }));
export default Loadable;
