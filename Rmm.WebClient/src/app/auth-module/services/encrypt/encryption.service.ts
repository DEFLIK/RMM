import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {

    constructor() {
    }

    public encryptString(str: string): string {
        return Md5.hashStr(str).toString();
    }
}
