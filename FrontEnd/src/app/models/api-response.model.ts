import { ApiResError } from './api-res-error.model';

export class ApiResponse {

    constructor(
        public status: boolean,
        public message: string,
        public result?: any,
        public error?: ApiResError
    ) { }

}