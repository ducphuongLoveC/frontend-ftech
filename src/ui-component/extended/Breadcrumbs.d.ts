import { FC, ReactNode } from 'react';
interface BreadcrumbsProps {
    sx?: object;
    custom?: boolean;
    heading?: string;
    card?: boolean;
    divider?: boolean;
    icon?: boolean;
    icons?: boolean;
    maxItems?: number;
    navigation?: object;
    rightAlign?: boolean;
    separator?: React.ComponentType | ReactNode;
    title?: boolean;
    titleBottom?: boolean;
    links?: Array<{
        to?: string;
        title: string;
        icon?: React.ComponentType;
    }>;
}
declare const Breadcrumbs: FC<BreadcrumbsProps>;
export default Breadcrumbs;
