import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid, MenuItem, Select, FormControl, InputLabel, Fade, Zoom, IconButton, Tooltip, Snackbar, Alert, } from '@mui/material';
import { Code as CodeIcon, AddCircleOutline as AddIcon, Delete as DeleteIcon, Save as SaveIcon, } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Editor, { loader } from '@monaco-editor/react';
loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' } });
const problemTypes = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
];
const difficultyLevels = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
];
export default function CreateCodePractice() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [codeTemplate, setCodeTemplate] = useState('// Start coding here...');
    const [difficulty, setDifficulty] = useState('easy');
    const [problemType, setProblemType] = useState('javascript');
    const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    useEffect(() => {
        setCodeTemplate(getDefaultCodeTemplate(problemType));
    }, [problemType]);
    const handleAddTestCase = () => {
        setTestCases([...testCases, { input: '', output: '' }]);
    };
    const handleRemoveTestCase = (index) => {
        const newTestCases = testCases.filter((_, i) => i !== index);
        setTestCases(newTestCases);
    };
    const handleTestCaseChange = (index, field, value) => {
        const newTestCases = [...testCases];
        newTestCases[index][field] = value;
        setTestCases(newTestCases);
    };
    const handleSubmit = () => {
        if (!title || !description || !codeTemplate || testCases.some((tc) => !tc.input || !tc.output)) {
            setSnackbar({ open: true, message: 'Please fill in all fields', severity: 'error' });
            return;
        }
        const problemData = {
            title,
            description,
            codeTemplate,
            difficulty,
            problemType,
            testCases,
        };
        console.log('Problem created:', problemData);
        setSnackbar({ open: true, message: 'Problem created successfully!', severity: 'success' });
    };
    const getDefaultCodeTemplate = (type) => {
        switch (type) {
            case 'javascript':
                return 'function solution() {\n  // Your code here\n}';
            case 'python':
                return 'def solution():\n    # Your code here\n    pass';
            case 'java':
                return 'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}';
            case 'csharp':
                return 'public class Solution {\n    public static void Main(string[] args) {\n        // Your code here\n    }\n}';
            case 'cpp':
                return '#include <iostream>\n\nint main() {\n    // Your code here\n    return 0;\n}';
            case 'html':
                return '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Your Title</title>\n</head>\n<body>\n    <!-- Your code here -->\n</body>\n</html>';
            case 'css':
                return '/* Your CSS code here */';
            default:
                return '// Start coding here...';
        }
    };
    return (_jsxs(Box, { children: [_jsx(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: _jsxs(Typography, { variant: "h4", gutterBottom: true, sx: { display: 'flex', alignItems: 'center' }, children: [_jsx(CodeIcon, { sx: { mr: 2, fontSize: 40 } }), "Create a New Coding Problem"] }) }), _jsx(Paper, { elevation: 3, sx: { p: 4, mt: 4 }, children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { label: "Problem Title", fullWidth: true, value: title, onChange: (e) => setTitle(e.target.value), variant: "outlined" }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { label: "Problem Description", fullWidth: true, multiline: true, rows: 4, value: description, onChange: (e) => setDescription(e.target.value), variant: "outlined" }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsxs(FormControl, { fullWidth: true, variant: "outlined", children: [_jsx(InputLabel, { children: "Problem Type" }), _jsx(Select, { value: problemType, onChange: (e) => setProblemType(e.target.value), label: "Problem Type", children: problemTypes.map((type) => (_jsx(MenuItem, { value: type.value, children: type.label }, type.value))) })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsxs(FormControl, { fullWidth: true, variant: "outlined", children: [_jsx(InputLabel, { children: "Difficulty" }), _jsx(Select, { value: difficulty, onChange: (e) => setDifficulty(e.target.value), label: "Difficulty", children: difficultyLevels.map((level) => (_jsx(MenuItem, { value: level.value, children: level.label }, level.value))) })] }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Code m\u1EABu cho tr\u01B0\u1EDBc" }), _jsx(Paper, { sx: { bgcolor: 'background.default' }, children: _jsx(Editor, { height: "300px", language: problemType, value: codeTemplate, onChange: (value) => setCodeTemplate(value || ''), theme: "vs-dark", options: {
                                            fontSize: 14,
                                            minimap: { enabled: true },
                                            suggestOnTriggerCharacters: true,
                                            quickSuggestions: true,
                                        } }) })] }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Cases" }), testCases.map((testCase, index) => (_jsx(Fade, { in: true, children: _jsx(Paper, { elevation: 2, sx: { p: 2, mb: 2, bgcolor: 'background.default' }, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, sm: 5, children: _jsx(TextField, { label: `Input ${index + 1}`, fullWidth: true, multiline: true, rows: 1, value: testCase.input, onChange: (e) => handleTestCaseChange(index, 'input', e.target.value), variant: "outlined" }) }), _jsx(Grid, { item: true, xs: 12, sm: 5, children: _jsx(TextField, { label: `Expected Output ${index + 1}`, fullWidth: true, multiline: true, rows: 1, value: testCase.output, onChange: (e) => handleTestCaseChange(index, 'output', e.target.value), variant: "outlined" }) }), _jsx(Grid, { item: true, xs: 12, sm: 2, sx: { display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(Tooltip, { title: "X\u00F3a case", children: _jsx(IconButton, { onClick: () => handleRemoveTestCase(index), color: "error", children: _jsx(DeleteIcon, {}) }) }) })] }) }) }, index))), _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', mt: 2 }, children: _jsx(Zoom, { in: true, children: _jsx(Button, { variant: "outlined", startIcon: _jsx(AddIcon, {}), onClick: handleAddTestCase, children: "Add Test Case" }) }) })] }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Zoom, { in: true, children: _jsx(Button, { variant: "contained", color: "primary", size: "large", startIcon: _jsx(SaveIcon, {}), onClick: handleSubmit, sx: { minWidth: 200 }, children: "Create Problem" }) }) })] }) }), _jsx(Snackbar, { open: snackbar.open, autoHideDuration: 6000, onClose: () => setSnackbar({ ...snackbar, open: false }), anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { onClose: () => setSnackbar({ ...snackbar, open: false }), severity: snackbar.severity, sx: { width: '100%' }, children: snackbar.message }) })] }));
}
