import { RefObject, useCallback, useRef } from 'react';

type UseSearchbarReturn = {
  inputRef: RefObject<HTMLInputElement>

  handleOnChange: (e:  React.ChangeEvent<HTMLInputElement>,
   onSearch: (value: string) => void) => Promise<void>
}

export default function useSearchbar(): UseSearchbarReturn {
  const inputRef = useRef<HTMLInputElement>(null);

  let timeoutId: NodeJS.Timeout | null = null;
  const handleOnChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>,
    onSearch: (value: string) => void) => {
    clearTimeout(timeoutId != null ? timeoutId : 0);

    timeoutId = setTimeout(() => onSearch(e.target.value), 500);
  }, []);

  return {
    inputRef,
    handleOnChange,
  };
}
