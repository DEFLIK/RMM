import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {

    constructor() {
    }

    public async encryptStringAsync(str: string): Promise<string> {
        const msgUint8: Uint8Array = new TextEncoder().encode(str);
        const hashBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray: number[] = Array.from(new Uint8Array(hashBuffer));
        const hashHex: string = hashArray.map((b: number) => b.toString(16).padStart(2, '0')).join('');

        return hashHex;
    }
}
