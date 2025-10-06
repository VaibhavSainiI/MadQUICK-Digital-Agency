'use client';

import CryptoJS from 'crypto-js';
import { VaultItemData } from '@/types/vault';

// Client-side encryption key - in production, this should be derived from user password
const getEncryptionKey = (): string => {
  // For demo purposes, using a fixed key. In production, derive from user's master password
  return 'user-specific-encryption-key-32-chars';
};

export const encryptVaultItem = (data: VaultItemData): string => {
  const key = getEncryptionKey();
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

export const decryptVaultItem = (encryptedData: string): VaultItemData => {
  const key = getEncryptionKey();
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const copyToClipboard = async (text: string, clearAfterMs: number = 15000): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    
    // Auto-clear clipboard after specified time
    setTimeout(async () => {
      try {
        const currentClipboard = await navigator.clipboard.readText();
        if (currentClipboard === text) {
          await navigator.clipboard.writeText('');
        }
      } catch (error) {
        // Ignore errors when clearing clipboard
      }
    }, clearAfterMs);
  } catch (error) {
    throw new Error('Failed to copy to clipboard');
  }
};