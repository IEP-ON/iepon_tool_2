import { WritingType } from "@/types/writing";

export interface HistoryItem {
  id: string;
  type: WritingType;
  title: string; // e.g., "2024-02-04 그림일기"
  content: string;
  answers: Record<string, string>;
  createdAt: number;
}

const HISTORY_KEY = 'writing-history';
const MAX_HISTORY_ITEMS = 10;

export const getHistory = (): HistoryItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load history', e);
    return [];
  }
};

export const saveToHistory = (item: Omit<HistoryItem, 'id' | 'createdAt'>) => {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  const updated = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return newItem;
};

export const deleteHistoryItem = (id: string) => {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const updated = history.filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const getDraft = (type: string) => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(`writing-${type}`);
  return stored ? JSON.parse(stored) : null;
};

export const saveDraft = (type: string, data: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`writing-${type}`, JSON.stringify(data));
};
