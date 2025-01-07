import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { hasAccess } from '@/api/accessApi';
import { useEffect, useState } from 'react';
const HasAccess = ({ children }) => {
    const { id: course_id } = useParams();
    const user = useSelector((state) => state.authReducer.user);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [hasAccessData, setHasAccessData] = useState(false);
    useEffect(() => {
        const fetchAccessData = async () => {
            if (!user || !course_id) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setIsError(false);
            try {
                const result = await hasAccess(user._id || '', course_id || '');
                setHasAccessData(result?.hasAccess || false);
            }
            catch (error) {
                setIsError(true);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchAccessData();
    }, [user, course_id]);
    if (isLoading)
        return _jsx("div", {});
    if (isError)
        return _jsx("div", { children: "Error fetching access data. Please try again." });
    if (!user || !hasAccessData) {
        return _jsx(Navigate, { to: `/courses/${course_id}`, replace: true });
    }
    return _jsx("div", { children: children });
};
export default HasAccess;
