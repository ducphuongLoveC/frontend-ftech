import{an as n,b as p,j as o,a3 as c,b7 as d,b8 as h}from"./index-DtuYDPSp.js";import{u as E}from"./useMutation-C5-VvoSY.js";import{C as g}from"./CourseForm-BngFf3Pw.js";import{H as l}from"./Title-Dclmkqim.js";import{Q as C,B as s}from"./react-toastify.esm-DD5y5EMm.js";import{L as f}from"./Loading-D1RiXygG.js";import"./index.esm-C9xi55BF.js";import"./AccessTime-CbHPe3As.js";import"./Edit-CjcPeMPT.js";import"./index-DImqW_he.js";import"./Tabs-roGmpxYy.js";import"./KeyboardArrowRight-BU7d6Ho6.js";import"./Dialog-sKP9evu5.js";import"./Close-D6XoDyuS.js";import"./DialogContent-DHCgyAg-.js";import"./InputLabel-BVAKWLbX.js";import"./Select-CSJOTSL5.js";import"./Input-mc85NLb2.js";import"./MenuItem-DmcPV3X2.js";import"./TextField-BEQRZGco.js";import"./FormHelperText-d7SpJcIT.js";import"./TextEditor-BAbV68IJ.js";import"./Quiz-DB8ape9X.js";import"./learningPathApi-BjH4xMvG.js";import"./Autocomplete-CO_xy1OS.js";import"./Close-DUJc0Pu3.js";import"./TableRow-B6sheRFN.js";import"./TableCell-W4GJuMMo.js";const V=()=>{const{id:t}=n(),{data:a,isLoading:e,isError:u}=p({queryKey:["course",t],queryFn:()=>h(t||""),enabled:!!t}),i=E({mutationKey:["course",t],mutationFn:r=>d(t||"",r),onSuccess:async()=>{s.dismiss(),s.success("Cập nhật khóa học thành công.")},onError:r=>{console.log(r.response.data.message),s.dismiss(),s.error(r.response.data.message)}}),m=r=>{console.log(r),i.mutate(r)};return e?o.jsx("div",{children:"Loading..."}):u?o.jsx("div",{children:"Error fetching course data"}):o.jsxs(o.Fragment,{children:[o.jsx(l,{des:'Chức năng "Sửa khóa học" cho phép quản trị viên sửa nhanh các thông tin của một khóa học, bao gồm modules, resources.',titleButton:"Danh sách khóa học",link:c.admin.courses}),o.jsx(g,{onSubmit:m,datas:a}),o.jsx(C,{}),i.isPending&&o.jsx(f,{})]})};export{V as default};