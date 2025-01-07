declare const dashboard: {
    id: string;
    title: string;
    type: string;
    children: {
        id: string;
        title: string;
        type: string;
        url: string;
        icon: import("react").ForwardRefExoticComponent<import("@tabler/icons-react").IconProps & import("react").RefAttributes<import("@tabler/icons-react").Icon>>;
        breadcrumbs: boolean;
    }[];
};
export default dashboard;
