import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey = '0123456789abcdef'; // Ensure this key is the same as the backend
  private iv = 'fedcba9876543210'; // Ensure this IV is the same as the backend

  constructor() { }

  // Encrypt data
  encryptData(data: any): string {
    const dataToEncrypt = typeof data === 'string' ? data : JSON.stringify(data);

    // Encrypt with PKCS7 padding
    const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, CryptoJS.enc.Utf8.parse(this.secretKey), {
      iv: CryptoJS.enc.Utf8.parse(this.iv),
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  // Decrypt data
  decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(this.secretKey), {
      iv: CryptoJS.enc.Utf8.parse(this.iv),
      padding: CryptoJS.pad.Pkcs7
    });

    return bytes.toString(CryptoJS.enc.Utf8); // Return the decrypted string
  }


  decryptJobEventId(hexStr: string): number {
    let result = '';
    
    // Each Unicode char = 2 bytes = 4 hex chars
    for (let i = 0; i < hexStr.length; i += 4) {
      const lowByte = parseInt(hexStr.substr(i, 2), 16);
      const highByte = parseInt(hexStr.substr(i + 2, 2), 16);
  
      const charCode = (highByte << 8) + lowByte; // little-endian
      if (charCode === 0) continue; // skip nulls
      result += String.fromCharCode(charCode);
    }
  
    return parseInt(result, 10); // convert to number
  }
}
