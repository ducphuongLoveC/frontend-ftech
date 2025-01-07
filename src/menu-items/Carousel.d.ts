declare const carousel: {
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
};
export default carousel;
