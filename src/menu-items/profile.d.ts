declare const Profile: {
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
};
export default Profile;
