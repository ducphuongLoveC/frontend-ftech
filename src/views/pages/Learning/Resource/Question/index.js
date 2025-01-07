import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, Button, CardActions, LinearProgress, Alert, } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
const Question = ({ questions, onCompleted }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showHint, setShowHint] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [width, height] = useWindowSize(); // Get the window size for confetti
    const handleAnswerChange = (event, questionIndex) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: event.target.value,
        }));
    };
    const submitAnswer = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedAnswer = answers[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer) {
            toast.success('Đáp án đúng! 🎉');
            setIsAnswerCorrect(true);
        }
        else {
            toast.error('Đáp án sai! 😞');
            setIsAnswerCorrect(false);
            setShowHint(true);
        }
    };
    const nextQuestion = () => {
        if (currentQuestionIndex === questions.length - 1) {
            setQuizCompleted(true);
            onCompleted();
        }
        else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowHint(false); // Reset hint for the next question
            setIsAnswerCorrect(false); // Reset answer correctness for the next question
        }
    };
    // Set timer for confetti display on quiz completion
    useEffect(() => {
        let timer;
        if (quizCompleted) {
            timer = setTimeout(() => setQuizCompleted(false), 3000);
        }
        return () => clearTimeout(timer);
    }, [quizCompleted]);
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    return (_jsxs(Box, { sx: { padding: 3, margin: 'auto' }, children: [_jsxs(Typography, { variant: "h2", mb: 2, children: ["C\u00E2u h\u1ECFi ", currentQuestionIndex + 1] }), _jsx(LinearProgress, { variant: "determinate", value: progress, sx: { marginBottom: 2 } }), _jsxs(Card, { sx: { marginBottom: 3 }, children: [_jsx(CardContent, { children: _jsx(Typography, { variant: "h4", dangerouslySetInnerHTML: { __html: questions[currentQuestionIndex].question } }) }), _jsx(FormControl, { component: "fieldset", sx: { paddingLeft: 2 }, children: _jsx(RadioGroup, { "aria-label": "question-options", name: "question-options", value: answers[currentQuestionIndex] || '', onChange: (event) => handleAnswerChange(event, currentQuestionIndex), children: Object.entries(questions[currentQuestionIndex].options).map(([key, value]) => (_jsx(FormControlLabel, { value: key, control: _jsx(Radio, {}), label: value, sx: { marginBottom: 1 } }, key))) }) }), showHint && (_jsxs(Alert, { severity: "info", sx: { marginTop: 2 }, children: ["G\u1EE3i \u00FD: ", questions[currentQuestionIndex].hint] }))] }), _jsx(CardActions, { sx: { justifyContent: 'flex-end', p: 0 }, children: isAnswerCorrect ? (_jsx(Button, { sx: { px: 10 }, variant: "outlined", onClick: nextQuestion, children: currentQuestionIndex === questions.length - 1 ? 'Kết thúc' : 'Câu tiếp theo' })) : (_jsx(Button, { sx: { px: 10 }, variant: "outlined", onClick: submitAnswer, disabled: !answers[currentQuestionIndex], children: "Tr\u1EA3 l\u1EDDi" })) }), _jsxs(Typography, { variant: "body2", color: "textSecondary", align: "center", children: ["C\u00E2u h\u1ECFi ", currentQuestionIndex + 1, " / ", questions.length] }), quizCompleted && _jsx(Confetti, { width: width, height: height })] }));
};
export default Question;
