import { ChangeEvent } from 'react';
import { IoSearch } from "react-icons/io5";

import useSearchbar from './useSearchbar';
import { SearchContainer, SearchInput } from './styles';

interface InputProps {
  name?: string,
  placeholder?: string,
  width?: string | undefined,
  onSearch?: (value: string) => void,
  className?: string,
}

export default function Searchbar({ width, onSearch, className }: InputProps) {
  const { inputRef, handleOnChange } = useSearchbar();

  return (
    <SearchContainer
      $width={width}
      className={className}
    >
      <div className="left-icon">
        <IoSearch />
      </div>

      <SearchInput
        ref={inputRef}
        placeholder="Buscar"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch ? handleOnChange(e, onSearch) : null}
      />

    </SearchContainer>
  );
}
