declare const posts: {
    id: string;
    title: string;
    type: string;
    children: {
        id: string;
        title: string;
        type: string;
        icon: import("react").ForwardRefExoticComponent<import("@tabler/icons-react").IconProps & import("react").RefAttributes<import("@tabler/icons-react").Icon>>;
        breadcrumbs: boolean;
        children: {
            id: string;
            title: string;
            type: string;
            url: string;
            target: boolean;
        }[];
    }[];
};
export default posts;
