import { jsx as _jsx } from "react/jsx-runtime";
import { useState, memo, forwardRef, useImperativeHandle } from 'react';
import TextEditor from '@/components/TextEditor';
const DescriptionResource = memo(forwardRef(({ defaultValue }, ref) => {
    console.log(defaultValue);
    const [description, setDescription] = useState(defaultValue?.description);
    const handleSetDes = (content) => {
        setDescription(content);
    };
    const getData = () => {
        return { description };
    };
    useImperativeHandle(ref, () => ({
        getData,
    }));
    return _jsx(TextEditor, { initialValue: description || '', onChange: handleSetDes });
}));
export default DescriptionResource;
