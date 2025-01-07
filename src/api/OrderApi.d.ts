export declare const createOrder: ({ user_id, course_id, payment_method, amount, code, email, }: {
    user_id: string;
    course_id: string;
    payment_method: string;
    amount: number;
    code?: string;
    email: string;
}) => Promise<any>;
export declare const getOrders: () => Promise<any>;
