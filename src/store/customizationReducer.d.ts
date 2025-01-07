export declare const initialState: {
    isOpen: never[];
    defaultId: string;
    fontFamily: string;
    borderRadius: number;
    opened: boolean;
    theme: string;
};
declare const customizationReducer: (state: {
    isOpen: never[];
    defaultId: string;
    fontFamily: string;
    borderRadius: number;
    opened: boolean;
    theme: string;
} | undefined, action: any) => {
    isOpen: any[];
    defaultId: string;
    fontFamily: string;
    borderRadius: number;
    opened: boolean;
    theme: string;
} | {
    opened: any;
    isOpen: never[];
    defaultId: string;
    fontFamily: string;
    borderRadius: number;
    theme: string;
} | {
    fontFamily: any;
    isOpen: never[];
    defaultId: string;
    borderRadius: number;
    opened: boolean;
    theme: string;
} | {
    borderRadius: any;
    isOpen: never[];
    defaultId: string;
    fontFamily: string;
    opened: boolean;
    theme: string;
} | {
    theme: any;
    isOpen: never[];
    defaultId: string;
    fontFamily: string;
    borderRadius: number;
    opened: boolean;
};
export default customizationReducer;
