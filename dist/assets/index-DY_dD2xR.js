import{r,j as e,B as j,P as m,a0 as k,A as v,ar as A,I as F,a as h}from"./index-DtuYDPSp.js";import{H as I}from"./Title-Dclmkqim.js";import{Q as S,B as E}from"./react-toastify.esm-DD5y5EMm.js";import{I as _}from"./InputLabel-BVAKWLbX.js";import{S as B}from"./Select-CSJOTSL5.js";import{M as f}from"./MenuItem-DmcPV3X2.js";import{T as L,a as R,b as H,c as d,d as K}from"./TableRow-B6sheRFN.js";import{T as s}from"./TableCell-W4GJuMMo.js";import{D as M}from"./Delete-D9yggPWV.js";import{T as X}from"./TablePagination-Cs2_-TJh.js";import"./Input-mc85NLb2.js";import"./KeyboardArrowRight-BU7d6Ho6.js";const Z=()=>{const[l,g]=r.useState([]),[C,D]=r.useState([]),[o,x]=r.useState(0),[i,b]=r.useState(5),[u,T]=r.useState("");r.useEffect(()=>{(async()=>{try{const a=await h.get("/api/courses");D(a.data.data)}catch(a){console.error("Lỗi khi lấy khóa học:",a)}})()},[]),r.useEffect(()=>{const n=async()=>{try{const t=await h.get("/api/comment",{params:{courseId:u}});g(t.data)}catch(t){console.error("Lỗi khi lấy bình luận:",t)}};n();const a=setInterval(n,5e3);return()=>clearInterval(a)},[i,u]);const P=async n=>{var t,p;if(window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?"))try{const c=await h.delete(`/api/comment/${n}`);g(y=>y.filter(w=>w._id!==n)),c.status===200&&E.success("Xóa bình luận thành công!")}catch(c){console.error("Lỗi khi xóa bình luận:",c),E.success(((p=(t=c==null?void 0:c.response)==null?void 0:t.data)==null?void 0:p.message)||"Lỗi khi xóa bình luận. Vui lòng thử lại.")}};return e.jsxs(j,{children:[e.jsx(I,{des:"Đây là trang quản lý bình luận"}),e.jsx(j,{sx:{mb:2,p:2},component:m,children:e.jsxs(k,{fullWidth:!0,sx:{marginBottom:2},children:[e.jsx(_,{children:"Chọn khóa học"}),e.jsxs(B,{label:"Chọn khóa học",value:u,onChange:n=>T(n.target.value),children:[e.jsx(f,{value:"",children:"Tất cả khóa học"}),C.map(n=>e.jsx(f,{value:n._id,children:n.title},n._id))]})]})}),e.jsx(L,{component:m,sx:{borderRadius:0},children:e.jsxs(R,{children:[e.jsx(H,{children:e.jsxs(d,{children:[e.jsx(s,{align:"center",children:"Avatar"}),e.jsx(s,{align:"center",children:"Tên người dùng"}),e.jsx(s,{align:"center",children:"Khóa học bình luận"}),e.jsx(s,{align:"center",children:"Nội dung"}),e.jsx(s,{align:"center",children:"Thời gian tạo"}),e.jsx(s,{align:"center",children:"Các hành động"})]})}),e.jsx(K,{children:l.length>0?l.slice(o*i,o*i+i).map(n=>e.jsxs(d,{children:[e.jsx(s,{align:"center",children:e.jsx(v,{src:n.user.profile_picture,alt:""})}),e.jsx(s,{align:"center",children:n.user.name}),e.jsx(s,{align:"center",children:n.course?n.course.title:"Không có khóa học"}),e.jsx(s,{align:"center",children:e.jsx("span",{dangerouslySetInnerHTML:{__html:n.content}})}),e.jsx(s,{align:"center",children:new Date(n.createdAt).toLocaleString()}),e.jsx(s,{align:"center",children:e.jsx(A,{title:"Xóa",children:e.jsx(F,{color:"secondary",onClick:()=>P(n._id),children:e.jsx(M,{})})})})]},n._id)):e.jsx(d,{children:e.jsx(s,{colSpan:6,align:"center",children:"Không có dữ liệu."})})})]})}),e.jsx(X,{rowsPerPageOptions:[5,10,25],component:"div",count:l.length,rowsPerPage:i,page:o,onPageChange:(n,a)=>x(a),onRowsPerPageChange:n=>{b(parseInt(n.target.value,10)),x(0)}}),e.jsx(S,{})]})};export{Z as default};