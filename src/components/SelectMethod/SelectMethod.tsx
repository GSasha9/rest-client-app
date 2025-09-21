import { SelectChangeEvent, Select, MenuItem } from '@mui/material';

interface SelectMethodProps {
  method: string;
  handleSelect: (e: SelectChangeEvent) => void;
  options: Record<string, string>;
}

const SelectMethod = ({ method, handleSelect, options }: SelectMethodProps) => {
  return (
    <Select
      className="select-field"
      value={method}
      onChange={(e: SelectChangeEvent) => handleSelect(e)}
      variant="standard"
    >
      {Object.values(options).map((method, index) => (
        <MenuItem
          key={method}
          value={method}
          selected={index === 0 ? true : false}
        >
          {method}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectMethod;
