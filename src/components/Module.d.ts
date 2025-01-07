interface ModuleProps {
    isCompleted?: boolean;
    isRedirect?: boolean;
    styleM?: 'one' | 'two';
    title: string;
    items: any;
    expanded?: boolean;
    onClick: (e: any) => void;
}
declare const _default: import("react").NamedExoticComponent<ModuleProps>;
export default _default;
