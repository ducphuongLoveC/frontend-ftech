import React from 'react';
interface CertificateProp {
    user_id?: string;
    course_id?: string;
    name?: string;
    description?: string;
    certificate_code?: string;
    code?: string;
}
declare const Certificate: React.FC<CertificateProp>;
export default Certificate;
