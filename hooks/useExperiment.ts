
import { useState, useEffect } from 'react';

type Variant = 'A' | 'B';

export const useExperiment = (experimentId: string): Variant => {
  const [variant, setVariant] = useState<Variant>('A');

  useEffect(() => {
    const key = `lv3-exp-${experimentId}`;
    const stored = localStorage.getItem(key) as Variant;

    if (stored) {
      if (stored !== variant) setVariant(stored);
    } else {
      const assigned = Math.random() > 0.5 ? 'B' : 'A';
      localStorage.setItem(key, assigned);
      if (assigned !== variant) setVariant(assigned);
    }
  }, [experimentId, variant]);

  return variant;
};
