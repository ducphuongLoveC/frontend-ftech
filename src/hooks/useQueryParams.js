import { useLocation, useNavigate } from 'react-router-dom';
const useQueryParams = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const get = (key) => queryParams.get(key);
    const set = (key, value) => {
        const currentValue = queryParams.get(key);
        if (currentValue === value)
            return;
        if (value) {
            queryParams.set(key, value);
        }
        else {
            queryParams.delete(key);
        }
        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    };
    return { get, set };
};
export default useQueryParams;
