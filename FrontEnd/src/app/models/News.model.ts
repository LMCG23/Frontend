export class News {
    constructor(
        public titulo:string,
        public descripcion:string,
        public fileToUpload:string,
        public expired:string,
        public Active?:boolean
    ) { }
}