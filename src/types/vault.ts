export interface VaultItemData {
  id?: string;
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
}

export interface VaultItemResponse {
  _id: string;
  encryptedData: string;
  createdAt: string;
  updatedAt: string;
}