import { useState } from 'react';
import { TOOL_COMMANDS } from '../utils/constants';

export function useCommands() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [dropdownIndex, setDropdownIndex] = useState(0);

  const handleInputChange = (val: string) => {
    // Show dropdown if input starts with ':' and filter options
    const match = val.match(/^:(\w*)$/);
    if (match) {
      const filter = match[1].toLowerCase();
      const filtered = TOOL_COMMANDS.filter(cmd => cmd.startsWith(':' + filter));
      setDropdownOptions(filtered);
      setShowDropdown(filtered.length > 0);
      setDropdownIndex(0);
    } else {
      setShowDropdown(false);
    }
  };

  const handleDropdownSelect = (option: string) => {
    setShowDropdown(false);
    return option + ' ';
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, input: string) => {
    if (showDropdown && dropdownOptions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setDropdownIndex(i => (i + 1) % dropdownOptions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setDropdownIndex(i => (i - 1 + dropdownOptions.length) % dropdownOptions.length);
      } else if (e.key === 'Enter') {
        if (input.match(/^:(\w*)$/)) {
          e.preventDefault();
          return handleDropdownSelect(dropdownOptions[dropdownIndex]);
        }
      }
    }
    return null;
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  return {
    showDropdown,
    dropdownOptions,
    dropdownIndex,
    handleInputChange,
    handleDropdownSelect,
    handleInputKeyDown,
    handleInputBlur
  };
} 