'use client';

import { useState, useEffect } from 'react';
import { VaultItemData, VaultItemResponse } from '@/types/vault';
import { encryptVaultItem, decryptVaultItem } from '@/lib/clientCrypto';

export const useVault = () => {
  const [items, setItems] = useState<(VaultItemData & { _id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/vault');
      
      if (!response.ok) {
        throw new Error('Failed to fetch vault items');
      }
      
      const data = await response.json();
      const decryptedItems = data.items.map((item: VaultItemResponse) => {
        try {
          const decryptedData = decryptVaultItem(item.encryptedData);
          return {
            ...decryptedData,
            _id: item._id,
          };
        } catch (error) {
          console.error('Failed to decrypt item:', error);
          return null;
        }
      }).filter(Boolean);
      
      setItems(decryptedItems);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (itemData: VaultItemData) => {
    try {
      const encryptedData = encryptVaultItem(itemData);
      
      const response = await fetch('/api/vault', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ encryptedData }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add vault item');
      }
      
      await fetchItems(); // Refresh the list
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const updateItem = async (id: string, itemData: VaultItemData) => {
    try {
      const encryptedData = encryptVaultItem(itemData);
      
      const response = await fetch(`/api/vault/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ encryptedData }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update vault item');
      }
      
      await fetchItems(); // Refresh the list
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/vault/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete vault item');
      }
      
      await fetchItems(); // Refresh the list
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    refetch: fetchItems,
  };
};