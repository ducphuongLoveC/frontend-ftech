import{j as s,B as o,T as n,G as i,A as C,P as j,ai as k,an as D,y as T,r,u as F,x as w,a as E}from"./index-DtuYDPSp.js";import{T as S}from"./index-DImqW_he.js";import{H as A}from"./Title-Dclmkqim.js";import"./Tabs-roGmpxYy.js";import"./KeyboardArrowRight-BU7d6Ho6.js";const R=({user:t})=>s.jsxs(o,{sx:{padding:"20px"},children:[s.jsx(n,{variant:"h5",sx:{marginBottom:"20px",fontWeight:"bold"},children:"Thông Tin Người Dùng"}),s.jsxs(i,{container:!0,spacing:3,children:[s.jsx(i,{item:!0,xs:12,sm:4,display:"flex",justifyContent:"center",alignItems:"center",children:s.jsx(C,{src:t.profile_picture||"/default-avatar.png",alt:t.name||"User Avatar",sx:{width:120,height:120,borderRadius:"50%",boxShadow:3}})}),s.jsx(i,{item:!0,xs:12,sm:8,children:s.jsxs(j,{sx:{padding:"20px",borderRadius:"10px",boxShadow:3,transition:"all 0.3s ease","&:hover":{boxShadow:6}},children:[s.jsx(n,{variant:"h6",sx:{marginBottom:"10px",fontWeight:"bold"},children:"Thông Tin Cá Nhân"}),s.jsxs(n,{variant:"body1",sx:{marginBottom:"10px"},children:[s.jsx("strong",{children:"Tên:"})," ",t.name||"Không có dữ liệu"]}),s.jsxs(n,{variant:"body1",sx:{marginBottom:"10px"},children:[s.jsx("strong",{children:"Email:"})," ",t.email||"Không có dữ liệu"]}),s.jsxs(n,{variant:"body1",sx:{marginBottom:"10px"},children:[s.jsx("strong",{children:"Số Điện thoại:"})," ",t.phone||"Không có dữ liệu"]}),s.jsxs(n,{variant:"body1",sx:{marginBottom:"10px"},children:[s.jsx("strong",{children:"Địa chỉ:"})," ",t.address||"Không có dữ liệu"]})]})})]})]}),K=({courses:t})=>s.jsxs(o,{sx:{padding:"20px"},children:[s.jsxs(n,{variant:"h4",sx:{marginBottom:"20px",fontWeight:"bold"},children:["Số khóa học tham gia: ",t.length]}),t.length>0?s.jsx(i,{container:!0,spacing:3,children:t.map((e,h)=>s.jsx(i,{item:!0,xs:12,sm:6,md:4,children:s.jsxs(j,{sx:{padding:"20px",borderRadius:"12px",boxShadow:3,transition:"all 0.3s ease","&:hover":{boxShadow:6,transform:"translateY(-5px)"}},children:[s.jsx(n,{variant:"h4",sx:{fontWeight:"bold",marginBottom:"15px"},children:e.title||"Không có tiêu đề"}),s.jsx(o,{sx:{position:"relative",paddingBottom:"56.25%",overflow:"hidden",borderRadius:"8px",boxShadow:"0 4px 10px rgba(0, 0, 0, 0.15)"},children:s.jsx("img",{src:e.thumbnail,alt:e.title,style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",objectFit:"cover"}})}),s.jsxs(n,{variant:"h5",sx:{fontWeight:"bold"},mt:1,children:["Hoàn thành chương: ",`${e.completedModules} / ${e.totalModules}`," "]}),s.jsxs(n,{variant:"h5",sx:{fontWeight:"bold"},mt:1,children:["Hoàn thành bài học: ",` ${e.completedResources} / ${e.totalResources}`," "]}),s.jsxs(n,{variant:"body2",sx:{marginBottom:"10px",fontWeight:"bold"},mt:1,children:["Tiến độ hoàn thành: ",`${e.progress||0}%`]}),s.jsx(k,{variant:"determinate",value:e.progress||0,sx:{height:"10px",borderRadius:"5px",backgroundColor:"#e0e0e0","& .MuiLinearProgress-bar":{backgroundColor:e.progress===0?"#e0e0e0":"#76c7c0"}}})]})},h))}):s.jsx(n,{variant:"body1",sx:{marginTop:"20px"},children:"Tài khoản này chưa đăng ký khóa học nào."})]}),H=()=>{const{id:t}=D(),e=T(),[h,b]=r.useState(null),[x,g]=r.useState([]),[f,p]=r.useState(!0),[u,m]=r.useState(null),[l,d]=r.useState(null),v=F();if(r.useEffect(()=>{(async()=>{try{p(!0),console.log("Fetching user details for userId:",t);const a=await E.get(`/api/user/${t}`);console.log("User response:",a),a.data.success?b(a.data.data):m("Không tìm thấy thông tin người dùng.");const c=await E.get(`/api/user/${t}/courses`);console.log("Courses response:",c),c.status===200?(g(c.data.courses||[]),d(null)):(g([]),d("Tài khoản này chưa đăng ký khóa học nào."))}catch(a){console.error("Error fetching data:",a),m("Lỗi khi lấy thông tin người dùng."),d("Lỗi khi lấy danh sách khóa học.")}finally{p(!1)}})()},[t]),f)return s.jsx("div",{children:"Đang tải..."});if(u||l)return s.jsxs(o,{children:[u&&s.jsx(n,{color:"error",children:u}),l&&s.jsx(n,{color:"error",children:l}),s.jsx(w,{variant:"contained",onClick:()=>window.history.back(),sx:{marginTop:"20px"},children:"Quay lại"})]});const y=h?s.jsx(R,{user:h}):s.jsx(n,{color:"error",children:"Không tìm thấy thông tin người dùng"}),B=x.length>0?s.jsx(K,{courses:x}):s.jsx(n,{children:"Tài khoản này chưa đăng ký khóa học nào."});return s.jsxs(o,{children:[s.jsx(A,{des:"Đây là trang chi tiết người dùng",onClick:()=>e(-1),titleButton:"Quay lại"}),s.jsx(o,{sx:{backgroundColor:v.palette.background.paper},children:s.jsx(S,{onChange:()=>{},labels:["Thông tin người dùng","Khóa học tham gia"],contents:[y,B]})})]})};export{H as default};