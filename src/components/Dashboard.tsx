'use client';

import { useState, useMemo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useVault } from '@/hooks/useVault';
import { VaultItemData } from '@/types/vault';
import PasswordGenerator from '@/components/PasswordGenerator';
import VaultItem from '@/components/VaultItem';
import VaultItemForm from '@/components/VaultItemForm';
import { Search, Plus, LogOut, Shield } from 'lucide-react';

export default function Dashboard() {
  const { data: session } = useSession();
  const { items, loading, error, addItem, updateItem, deleteItem } = useVault();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<(VaultItemData & { _id: string }) | undefined>();
  const [generatedPassword, setGeneratedPassword] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    
    const query = searchQuery.toLowerCase();
    return items.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query) ||
      item.url.toLowerCase().includes(query) ||
      item.notes.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  const handleSave = async (itemData: VaultItemData) => {
    try {
      if (editingItem) {
        await updateItem(editingItem._id, itemData);
      } else {
        await addItem(itemData);
      }
      setShowForm(false);
      setEditingItem(undefined);
      setGeneratedPassword('');
    } catch (error) {
      console.error('Error saving item:', error);
      // In a real app, show a toast/notification
    }
  };

  const handleEdit = (item: VaultItemData & { _id: string }) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        console.error('Error deleting item:', error);
        // In a real app, show a toast/notification
      }
    }
  };

  const handleAddNew = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handlePasswordGenerated = (password: string) => {
    setGeneratedPassword(password);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">Password Vault</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                Welcome, {session?.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Password Generator */}
        <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />

        {/* Vault Controls */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Your Vault</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search vault..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 placeholder-gray-400"
                />
              </div>
              
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-md p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Vault Items */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-12 text-center">
              <Shield className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                {searchQuery ? 'No items found' : 'Your vault is empty'}
              </h3>
              <p className="text-gray-300 mb-4">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Generate a password and save your first item'
                }
              </p>
              {!searchQuery && (
                <button
                  onClick={handleAddNew}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Add Your First Item
                </button>
              )}
            </div>
          ) : (
            filteredItems.map((item) => (
              <VaultItem
                key={item._id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <VaultItemForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
            setGeneratedPassword('');
          }}
          generatedPassword={generatedPassword}
        />
      )}
    </div>
  );
}