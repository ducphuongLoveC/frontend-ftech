declare const transaction_history: {
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
        url: string;
        breadcrumbs: boolean;
    }[];
};
export default transaction_history;
