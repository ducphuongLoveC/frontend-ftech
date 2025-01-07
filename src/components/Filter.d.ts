import React from 'react';
type FilterProps = {
    filters: any;
    onFilter: (filters: any) => void;
};
declare const FilterComponent: React.FC<FilterProps>;
export default FilterComponent;
