import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
interface Option {
    A: string;
    B: string;
    C: string;
    D: string;
}
interface Question {
    question: string;
    correctAnswer: string;
    options: Option;
    _id: string;
    hint: string;
}
interface QuestionProps {
    onCompleted: () => void;
    questions: Question[];
}
declare const Question: React.FC<QuestionProps>;
export default Question;
