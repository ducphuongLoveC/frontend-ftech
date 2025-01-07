export type FilterOption = {
    name: string;
    values: string[];
};
export type FilterProps = {
    filters: FilterOption[];
    onFilter: (filters: {
        search: any;
        [key: string]: string[];
    }) => void;
};
