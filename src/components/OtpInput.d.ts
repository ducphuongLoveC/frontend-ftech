import React from 'react';
declare const OTPInput: React.FC<{
    length?: number;
    onComplete: (otp: string) => void;
}>;
export default OTPInput;
