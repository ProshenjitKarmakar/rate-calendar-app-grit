export interface WithPagination<T> {
    responseCode: number;
    success: true;
    message: string;
    data: T[];
    extraData: {
        total: number;
        totalPages: number;
        currentPage: number;
    };
}

export interface SuccessResponseIn<T> {
    responseCode: number;
    success: true;
    message: string;
    data: T;
}

export interface ErrorResponseInterface {
    responseCode: number;
    success: false;
    message: string;
}

export type ResponseInterface<T> = SuccessResponseIn<T> | ErrorResponseInterface;

export default ResponseInterface;
