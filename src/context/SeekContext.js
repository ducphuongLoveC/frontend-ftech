import { createContext } from 'react';
export const SeekContext = createContext({ value: 0, onSeek: (_val, _id) => { } });