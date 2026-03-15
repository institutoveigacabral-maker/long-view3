
import { create } from 'https://esm.sh/zustand';
import { persist } from 'https://esm.sh/zustand/middleware';
import { Message } from '../types';

interface StoreState {
  // Chat
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (msg: Message) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;

  // SMQ
  scores: Record<string, number>;
  setScore: (id: string, value: number) => void;

  // Prefs
  theme: 'light' | 'dark';
  reducedMotion: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleReducedMotion: () => void;

  // Checkout
  activeCheckout: any | null;
  subscriptionTier: 'none' | 'monthly' | 'quarterly' | 'annual';
  setCheckout: (product: any | null) => void;
  setSubscription: (tier: 'none' | 'monthly' | 'quarterly' | 'annual') => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Chat
      messages: [{ role: 'model', text: 'Instância de Auditoria Ativa. Submeta sua tese para teste de realidade.' }],
      isLoading: false,
      error: null,
      addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearChat: () => set({ messages: [] }),

      // SMQ
      scores: {
        observer: 10,
        direction: 10,
        competence: 10,
        sacrifice: 10,
        expansion: 10
      },
      setScore: (id, value) => set((state) => ({
        scores: { ...state.scores, [id]: value }
      })),

      // Prefs
      theme: 'light',
      reducedMotion: false,
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),

      // Checkout
      activeCheckout: null,
      subscriptionTier: 'none',
      setCheckout: (product) => set({ activeCheckout: product }),
      setSubscription: (tier) => set({ subscriptionTier: tier }),
    }),
    {
      name: 'lv3-storage',
      partialize: (state) => ({ 
        scores: state.scores, 
        theme: state.theme,
        reducedMotion: state.reducedMotion, 
        subscriptionTier: state.subscriptionTier
      }),
    }
  )
);
