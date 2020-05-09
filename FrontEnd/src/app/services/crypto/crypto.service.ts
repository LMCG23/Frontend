import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encryptPassword( value: string ) {

    let hash: string = CryptoJS.MD5( value ).toString();

    return hash;

  }

}
