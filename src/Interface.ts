export interface ProductInfo {
    currentUser: {
        image: string;
        name: string;
        username: string;
    }
    productRequests: ProductReqList[];
}

export interface ProductReqList{
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    comments: CommentList[]
}

export interface CommentList {
    id: number;
    content: string;
    user: User;
    replies?: Reply[]
}

export interface Reply {
    content: string;
    replyingTo: string;
    user: User
}

export interface User {
    image: string;
    name: string;
    username: string;
}

