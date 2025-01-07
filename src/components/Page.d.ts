interface PageProps {
    page: null | number;
    count: number;
    rowsPerPageOptions: number[];
    onChange: (page: number, rowsPerPage: number) => void;
}
declare const Page: React.FC<PageProps>;
export default Page;
