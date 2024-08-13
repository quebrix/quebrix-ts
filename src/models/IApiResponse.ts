export interface IApiResponseData {
    is_success: boolean;
    data?: any;
    message:string | 'unknown error'
}
