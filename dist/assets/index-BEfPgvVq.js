import{r as t,a as P,j as e,B as d,T as m,P as p,A as w}from"./index-DtuYDPSp.js";import{H as b}from"./Title-Dclmkqim.js";import{T as C}from"./TextField-BEQRZGco.js";import{T as y,a as R,b as S,c as j,d as A}from"./TableRow-B6sheRFN.js";import{T as s}from"./TableCell-W4GJuMMo.js";import{T as v}from"./TablePagination-Cs2_-TJh.js";import"./InputLabel-BVAKWLbX.js";import"./Select-CSJOTSL5.js";import"./Input-mc85NLb2.js";import"./FormHelperText-d7SpJcIT.js";import"./KeyboardArrowRight-BU7d6Ho6.js";import"./MenuItem-DmcPV3X2.js";const B=()=>{const[u,h]=t.useState([]),[i,o]=t.useState(!1),[l,a]=t.useState(null),x=async()=>{o(!0),a(null);try{const n=await P.get("api/user");if(n.data.success){const g=n.data.data.filter(c=>c.role==="admin");h(g)}else a("No data found")}catch(n){a("Error fetching users"),console.error("Error fetching users:",n)}finally{o(!1)}};return t.useEffect(()=>{x()},[]),{rows:u,loading:i,error:l}},q=()=>{const{rows:u,loading:h,error:i}=B(),[o,l]=t.useState(0),[a,x]=t.useState(5),[n,g]=t.useState("");if(h)return e.jsx(d,{sx:{display:"flex",justifyContent:"center",padding:"20px"},children:e.jsx(m,{children:"Loading..."})});if(i)return e.jsx(d,{children:e.jsxs(m,{children:["Error: ",i]})});const c=u.filter(r=>r.name.toLowerCase().includes(n.toLowerCase())),f=c.slice(o*a,(o+1)*a),E=r=>{g(r.target.value)};return e.jsxs(d,{children:[e.jsx(b,{des:"Đây là trang danh sách admin"}),e.jsx(d,{sx:{mb:2,p:2},component:p,children:e.jsx(C,{label:"Tìm kiếm theo tên",variant:"outlined",fullWidth:!0,value:n,onChange:E,sx:{marginBottom:2}})}),e.jsx(y,{component:p,sx:{borderRadius:0},children:e.jsxs(R,{sx:{minWidth:650},"aria-label":"user table",children:[e.jsx(S,{children:e.jsxs(j,{children:[e.jsx(s,{children:"Avatar"}),e.jsx(s,{align:"center",children:"Tên"}),e.jsx(s,{align:"center",children:"Email"}),e.jsx(s,{align:"center",children:"Số điện thoại"}),e.jsx(s,{align:"center",children:"Quyền Quản Trị"})]})}),e.jsx(A,{children:f.map(r=>e.jsxs(j,{children:[e.jsx(s,{children:e.jsx(w,{src:r._id})}),e.jsx(s,{align:"center",children:r.name}),e.jsx(s,{align:"center",children:r.email}),e.jsx(s,{align:"center",children:r.phone}),e.jsx(s,{align:"center",children:r.role})]},r._id))})]})}),e.jsx(v,{rowsPerPageOptions:[5,10,25],component:"div",count:c.length,rowsPerPage:a,page:o,onPageChange:(r,T)=>l(T),onRowsPerPageChange:r=>{x(parseInt(r.target.value,10)),l(0)}})]})};export{q as default};
