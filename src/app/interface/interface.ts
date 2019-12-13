export class Visitor {
    id: number;
    userName: string;
    userSurname: string;
    userLogin: string;
    userMail: string;
    userPhone: string;
    userPassword: string;
    userPass2?: string;
    isLogin?: boolean;
    userGender?: string;
    firstLogin: boolean;
}

export class News {
    id?: number;
    author: null | string;
    content: null | string;
    description: null | string;
    publishedAt: null | string;
    source: null | string;
    title: null | string;
    url: null | string;
    urlToImage: null | string;
}
