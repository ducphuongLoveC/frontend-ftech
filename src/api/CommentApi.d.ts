import { CommentPayloadData } from '@/interfaces/Comment';
export declare const getCommentByResourceId: (resource_id: string) => Promise<any>;
export declare const createComment: (data: CommentPayloadData) => Promise<any>;
export declare const deleteComment: (id: string) => Promise<unknown>;
