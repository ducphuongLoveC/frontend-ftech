import React from 'react';
import { Resource } from '@/interfaces/course';
interface LearningListProps {
    modules: {
        title: string;
        resources: Resource;
    }[];
    onClose: () => void;
}
declare const LearningList: React.FC<LearningListProps>;
export default LearningList;
