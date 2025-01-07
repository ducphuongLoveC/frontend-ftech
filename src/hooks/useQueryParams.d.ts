type QueryParams = {
    get: (key: string) => string | null;
    set: (key: string, value: string | null) => void;
};
declare const useQueryParams: () => QueryParams;
export default useQueryParams;
