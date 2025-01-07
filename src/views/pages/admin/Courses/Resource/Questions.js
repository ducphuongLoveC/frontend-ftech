import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import TextEditor from '@/components/TextEditor';
// interface Quiz {
//   _id?: string;
//   resource_id?: string;
//   question: string;
//   options: { A: string; B: string; C: string; D: string };
//   correctAnswer: string;
//   hint: string;
// }
// const QuizCreation: React.FC = forwardRef(({ defaultValue }: any, ref) => {
//   console.log(defaultValue);
//   const [quizzes, setQuizzes] = useState<Quiz[]>(defaultValue?.questions || []);
//   const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
//   const { control, reset, getValues, setValue } = useForm<Quiz>({
//     defaultValues: {},
//   });
//   const handleQuestion = () => {
//     const cloneQuizzes = [...quizzes];
//     const currentQuiz = getValues();
//     // Remove `_id` and `resource_id` for new quizzes if they are not already defined
//     if (!cloneQuizzes[currentQuizIndex]?._id) {
//       delete currentQuiz._id;
//       delete currentQuiz.resource_id;
//     }
//     cloneQuizzes[currentQuizIndex] = currentQuiz;
//     setQuizzes(cloneQuizzes);
//     reset();
//     setCurrentQuizIndex((pre) => pre + 1);
//   };
//   const handleNextQuiz = () => {
//     if (currentQuizIndex < quizzes.length) {
//       setCurrentQuizIndex((pre) => pre + 1);
//     }
//   };
//   const handlePreQuiz = () => {
//     if (currentQuizIndex > 0) {
//       setCurrentQuizIndex((pre) => pre - 1);
//     }
//   };
//   const handleRemoveQuiz = () => {
//     const cloneQuizzes = [...quizzes];
//     // Remove quiz at current index
//     cloneQuizzes.splice(currentQuizIndex, 1);
//     // If we removed the last quiz, go to the previous one, else stay on the current index
//     setQuizzes(cloneQuizzes);
//     setCurrentQuizIndex((prevIndex) => {
//       // Adjust index after deletion
//       if (cloneQuizzes.length === 0) {
//         return 0; // If no quizzes left, set index to 0
//       } else if (prevIndex >= cloneQuizzes.length) {
//         return cloneQuizzes.length - 1;
//       }
//       return prevIndex;
//     });
//   };
//   useEffect(() => {
//     const currentQuiz = quizzes[currentQuizIndex];
//     if (!currentQuiz) {
//       setValue('question', '');
//       setValue('correctAnswer', '');
//       setValue('options.A', '');
//       setValue('options.B', '');
//       setValue('options.C', '');
//       setValue('options.D', '');
//     } else {
//       reset(currentQuiz);
//     }
//   }, [currentQuizIndex]);
//   console.log(defaultValue);
//   const getData = () => {
//     return { _id: defaultValue._id, questions: quizzes, duration: 0, resource_type: 'Question' };
//   };
//   useImperativeHandle(ref, () => ({
//     getData,
//   }));
//   return (
//     <Box>
//       <Box mb={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
//         <Typography variant="h4">Thêm câu quiz thứ {currentQuizIndex + 1}</Typography>
//         <Button
//           variant="outlined"
//           color="error" // Red color for delete button
//           onClick={handleRemoveQuiz}
//         >
//           Xóa câu hỏi
//         </Button>
//       </Box>
//       <Controller
//         name="question"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextEditor {...field} initialValue="Câu hỏi?" />}
//       />
//       <Controller
//         name="options.A"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án A" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="options.B"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án B" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="options.C"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án C" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="options.D"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án D" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="correctAnswer"
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Đáp án đúng</InputLabel>
//             <Select {...field} label="Đáp án đúng">
//               <MenuItem value="A">A</MenuItem>
//               <MenuItem value="B">B</MenuItem>
//               <MenuItem value="C">C</MenuItem>
//               <MenuItem value="D">D</MenuItem>
//             </Select>
//           </FormControl>
//         )}
//       />
//       <Controller
//         name="hint"
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <TextField {...field} fullWidth label="Gợi í khi người dùng trả lời sai" variant="outlined" margin="normal" />
//         )}
//       />
//       <Box>
//         <Button sx={{ my: 2 }} fullWidth variant="outlined" onClick={handleQuestion}>
//           Lưu quiz
//         </Button>
//       </Box>
//       {/* Các nút điều hướng */}
//       <Box display={'flex'} justifyContent={'space-between'}>
//         <Button disabled={currentQuizIndex === 0} variant="outlined" onClick={handlePreQuiz}>
//           Câu trước
//         </Button>
//         <Button disabled={currentQuizIndex === quizzes.length} variant="outlined" onClick={handleNextQuiz}>
//           Câu tiếp theo
//         </Button>
//       </Box>
//     </Box>
//   );
// });
// export default QuizCreation;
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import TextEditor from '@/components/TextEditor';
const QuizCreation = forwardRef(({ defaultValue }, ref) => {
    console.log(defaultValue);
    const [quizzes, setQuizzes] = useState(defaultValue?.questions || []);
    console.log(quizzes);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const { control, reset, getValues, setValue, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {},
    });
    const handleQuestion = () => {
        const cloneQuizzes = [...quizzes];
        const currentQuiz = getValues();
        // Remove `_id` and `resource_id` for new quizzes if they are not already defined
        if (!cloneQuizzes[currentQuizIndex]?._id) {
            delete currentQuiz._id;
            delete currentQuiz.resource_id;
        }
        cloneQuizzes[currentQuizIndex] = currentQuiz;
        setQuizzes(cloneQuizzes);
        reset();
        setCurrentQuizIndex((pre) => pre + 1);
    };
    const handleNextQuiz = () => {
        if (currentQuizIndex < quizzes.length) {
            setCurrentQuizIndex((pre) => pre + 1);
        }
    };
    const handlePreQuiz = () => {
        if (currentQuizIndex > 0) {
            setCurrentQuizIndex((pre) => pre - 1);
        }
    };
    const handleRemoveQuiz = () => {
        const cloneQuizzes = [...quizzes];
        // Remove quiz at current index
        cloneQuizzes.splice(currentQuizIndex, 1);
        // If we removed the last quiz, go to the previous one, else stay on the current index
        setQuizzes(cloneQuizzes);
        setCurrentQuizIndex((prevIndex) => {
            // Adjust index after deletion
            if (cloneQuizzes.length === 0) {
                return 0; // If no quizzes left, set index to 0
            }
            else if (prevIndex >= cloneQuizzes.length) {
                return cloneQuizzes.length - 1;
            }
            return prevIndex;
        });
    };
    useEffect(() => {
        const currentQuiz = quizzes[currentQuizIndex];
        if (!currentQuiz) {
            setValue('question', '');
            setValue('correctAnswer', '');
            setValue('options.A', '');
            setValue('options.B', '');
            setValue('options.C', '');
            setValue('options.D', '');
            setValue('hint', '');
        }
        else {
            reset(currentQuiz);
        }
    }, [currentQuizIndex]);
    const getData = () => {
        return { _id: defaultValue._id, questions: quizzes, duration: 0, resource_type: 'Question' };
    };
    useImperativeHandle(ref, () => ({
        getData,
    }));
    return (_jsxs(Box, { children: [_jsxs(Box, { mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', children: [_jsxs(Typography, { variant: "h4", children: ["Th\u00EAm c\u00E2u quiz th\u1EE9 ", currentQuizIndex + 1] }), _jsx(Button, { variant: "outlined", color: "error" // Red color for delete button
                        , onClick: handleRemoveQuiz, children: "X\u00F3a c\u00E2u h\u1ECFi" })] }), _jsxs("form", { onSubmit: handleSubmit(handleQuestion), children: [_jsx(Controller, { name: "question", control: control, rules: { required: 'Câu hỏi không được để trống' }, render: ({ field }) => _jsx(TextEditor, { ...field, initialValue: "C\u00E2u h\u1ECFi?" }) }), errors.question && _jsx(Typography, { color: "error", children: errors.question.message }), _jsx(Controller, { name: "options.A", control: control, rules: { required: 'Đáp án A không được để trống' }, render: ({ field }) => _jsx(TextField, { ...field, fullWidth: true, label: "\u0110\u00E1p \u00E1n A", variant: "outlined", margin: "normal" }) }), errors.options?.A && _jsx(Typography, { color: "error", children: errors.options.A.message }), _jsx(Controller, { name: "options.B", control: control, rules: { required: 'Đáp án B không được để trống' }, render: ({ field }) => _jsx(TextField, { ...field, fullWidth: true, label: "\u0110\u00E1p \u00E1n B", variant: "outlined", margin: "normal" }) }), errors.options?.B && _jsx(Typography, { color: "error", children: errors.options.B.message }), _jsx(Controller, { name: "options.C", control: control, rules: { required: 'Đáp án C không được để trống' }, render: ({ field }) => _jsx(TextField, { ...field, fullWidth: true, label: "\u0110\u00E1p \u00E1n C", variant: "outlined", margin: "normal" }) }), errors.options?.C && _jsx(Typography, { color: "error", children: errors.options.C.message }), _jsx(Controller, { name: "options.D", control: control, rules: { required: 'Đáp án D không được để trống' }, render: ({ field }) => _jsx(TextField, { ...field, fullWidth: true, label: "\u0110\u00E1p \u00E1n D", variant: "outlined", margin: "normal" }) }), errors.options?.D && _jsx(Typography, { color: "error", children: errors.options.D.message }), _jsx(Controller, { name: "correctAnswer", control: control, rules: { required: 'Vui lòng chọn đáp án đúng' }, defaultValue: '', render: ({ field }) => (_jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { children: "\u0110\u00E1p \u00E1n \u0111\u00FAng" }), _jsxs(Select, { ...field, label: "\u0110\u00E1p \u00E1n \u0111\u00FAng", children: [_jsx(MenuItem, { value: "A", children: "A" }), _jsx(MenuItem, { value: "B", children: "B" }), _jsx(MenuItem, { value: "C", children: "C" }), _jsx(MenuItem, { value: "D", children: "D" })] })] })) }), errors.correctAnswer && _jsx(Typography, { color: "error", children: errors.correctAnswer.message }), _jsx(Controller, { name: "hint", control: control, rules: { required: 'Gợi ý không được để trống' }, render: ({ field }) => _jsx(TextField, { ...field, fullWidth: true, label: "G\u1EE3i \u00FD", variant: "outlined", margin: "normal" }) }), errors.hint && _jsx(Typography, { color: "error", children: errors.hint.message }), _jsx(Box, { children: _jsx(Button, { sx: { my: 2 }, fullWidth: true, variant: "outlined", type: "submit", children: "L\u01B0u quiz" }) })] }), _jsxs(Box, { display: 'flex', justifyContent: 'space-between', children: [_jsx(Button, { disabled: currentQuizIndex === 0, variant: "outlined", onClick: handlePreQuiz, children: "C\u00E2u tr\u01B0\u1EDBc" }), _jsx(Button, { disabled: currentQuizIndex === quizzes.length, variant: "outlined", onClick: handleNextQuiz, children: "C\u00E2u ti\u1EBFp theo" })] })] }));
});
export default QuizCreation;
