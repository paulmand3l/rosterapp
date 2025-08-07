import React, { createContext, useContext, useState, useEffect } from 'react';
import { Entry } from '../types/roster';
import { storage } from '../services/storage';
import { useApp } from './AppContext';

interface RosterContextType {
  entries: Entry[];
  addEntry: (entry: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Entry>;
  updateEntry: (id: string, entry: Partial<Entry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  isLoading: boolean;
}

const RosterContext = createContext<RosterContextType | undefined>(undefined);

export const RosterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Maintain roster state directly in this context
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshStats } = useApp();

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setIsLoading(true);
    try {
      const loadedEntries = await storage.getRoster();
      setEntries(loadedEntries || []);
    } catch (error) {
      console.error('Error loading roster entries:', error);
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addEntry = async (entry: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('RosterContext: addEntry called with', JSON.stringify(entry));
    try {
      const newEntry: Entry = {
        ...entry,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('RosterContext: created newEntry with id', newEntry.id);

      const updatedEntries = [...entries, newEntry];
      console.log('RosterContext: saving updated entries, total count:', updatedEntries.length);

      await storage.saveRoster(updatedEntries);
      console.log('RosterContext: storage.saveRoster completed');

      setEntries(updatedEntries);
      console.log('RosterContext: local state updated');

      // Update stats with the new entries
      console.log('RosterContext: updating stats');
      await refreshStats(updatedEntries);
      console.log('RosterContext: stats updated successfully');

      return newEntry; // Return the created entry
    } catch (error) {
      console.error('RosterContext: Error adding roster entry:', error);
      throw error; // Re-throw to allow caller to handle
    }
  };

  const updateEntry = async (id: string, entryUpdates: Partial<Entry>) => {
    try {
      const existingEntry = entries.find(e => e.id === id);
      if (!existingEntry) return;

      const updatedEntry = {
        ...existingEntry,
        ...entryUpdates,
        updatedAt: new Date().toISOString(),
      };

      const updatedEntries = entries.map(e =>
        e.id === id ? updatedEntry : e
      );

      await storage.saveRoster(updatedEntries);
      setEntries(updatedEntries);

      // Update stats with the updated entries
      await refreshStats(updatedEntries);
    } catch (error) {
      console.error('Error updating roster entry:', error);
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const updatedEntries = entries.filter(e => e.id !== id);
      await storage.saveRoster(updatedEntries);
      setEntries(updatedEntries);

      // Update stats with the filtered entries
      await refreshStats(updatedEntries);
    } catch (error) {
      console.error('Error deleting roster entry:', error);
    }
  };

  return (
    <RosterContext.Provider value={{ entries, addEntry, updateEntry, deleteEntry, isLoading }}>
      {children}
    </RosterContext.Provider>
  );
};

export const useRoster = () => {
  const context = useContext(RosterContext);
  if (context === undefined) {
    throw new Error('useRoster must be used within a RosterProvider');
  }
  return context;
};