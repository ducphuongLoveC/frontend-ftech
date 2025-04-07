import TextEditor from '@/components/TextEditor';
import { Course } from '@/interfaces/course';
import { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';

interface DescriptionTabProps {
  datas?: Course;
  defaultValue?: Course;
}

const DescriptionTab = memo(
  forwardRef(({ datas, defaultValue }: DescriptionTabProps, ref) => {
    const [description, setDescription] = useState<string>(datas ? datas.description : defaultValue?.description || '');

    useEffect(() => {
      if (defaultValue?.description) {
        setDescription(defaultValue.description);
      }
    }, [defaultValue]);

    const handleSetDes = (content: string) => {
      setDescription(content);
    };

    const getData = () => {
      return { description };
    };

    useImperativeHandle(ref, () => ({
      getData,
    }));

    return <TextEditor value={description} onChange={handleSetDes} />;
  }),
);

export default DescriptionTab;
