export class ApiResError {

    constructor(
        public code: number,
        public title: string,
        public message: string,
        public data?: any
    ) { }

}