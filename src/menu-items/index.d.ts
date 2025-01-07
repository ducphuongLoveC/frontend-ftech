declare const menuItems: {
    items: ({
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
    } | {
        id: string;
        title: string;
        caption: string;
        type: string;
        children: {
            id: string;
            title: string;
            type: string;
            icon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
                muiName: string;
            };
            children: {
                id: string;
                title: string;
                type: string;
                url: string;
                target: boolean;
            }[];
        }[];
    } | {
        id: string;
        title: string;
        caption: string;
        type: string;
        children: {
            id: string;
            title: string;
            type: string;
            url: string;
            icon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
                muiName: string;
            };
            breadcrumbs: boolean;
        }[];
    })[];
};
export default menuItems;
