import type { FC, KeyboardEvent, ChangeEvent, FocusEvent } from 'react';
import { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { v4 as uuid } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';

type ChipData = {
  currentValue: string;
  value: Typing.KeyValue<string, string>[];
};

type ChipInputProps = {
  disabled?: boolean;
  value?: string[];
  placeholder?: string;
};

const ChipInput: FC<ChipInputProps> = ({
  disabled = false,
  placeholder = '',
  value = [],
}) => {
  const [chipData, setChipData] = useState<ChipData>({
    currentValue: '',
    value: [],
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setChipData((preState) => {
      const stateCopy = cloneDeep(preState);
      return {
        ...stateCopy,
        currentValue: event.target.value,
      };
    });
  };

  const handleBlurInput = (
    event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setChipData((preState) => {
      const stateCopy = cloneDeep(preState);
      return {
        ...stateCopy,
        currentValue: '',
      };
    });
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // press backspace
    if (event.key?.toLowerCase() === 'backspace' && !chipData.currentValue) {
      setChipData((preState) => {
        const stateCopy = cloneDeep(preState);
        const newState: ChipData = {
          ...stateCopy,
          currentValue: '',
        };
        newState.value.pop();
        return newState;
      });
    }

    // Press Enter
    if (event.key?.toLowerCase() === 'enter') {
      // Input 為 空值時，不 set state
      if (!chipData.currentValue) {
        return;
      }

      // 若值已存在，不 set state
      if (chipData.value.some((item) => item.value === chipData.currentValue)) {
        return;
      }
      setChipData((preState) => {
        const stateCopy = cloneDeep(preState);
        const newState: ChipData = {
          ...stateCopy,
          currentValue: '',
        };
        newState.value.push({ key: uuid(), value: stateCopy.currentValue });
        return newState;
      });
    }
  };

  const handleDeleteChip = (key: string) => {
    setChipData((preState) => {
      const stateCopy = cloneDeep(preState);
      const newValue = stateCopy.value.filter((item) => item.key !== key);
      const newState: ChipData = {
        ...stateCopy,
        value: newValue,
      };

      return newState;
    });
  };

  useEffect(() => {
    if (value && value.length > 0) {
      setChipData((preState) => {
        const stateCopy = cloneDeep(preState);
        const newValue: Typing.KeyValue<string, string>[] = value.map(
          (item) => {
            return {
              key: uuid(),
              value: item,
            };
          }
        );
        const newState: ChipData = {
          ...stateCopy,
          value: newValue,
        };

        return newState;
      });
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        background: disabled ? '#F8F8F8' : '#FFFFFF',
        border: '1px solid #B9C4CE',
        boxSizing: 'border-box',
        borderRadius: '4px',
        padding: '8px 8px',
        width: '600px',
        marginRight: '16px',
        minHeight: '70px',
      }}
    >
      {chipData.value?.length > 0 &&
        chipData.value.map((item) => (
          <Chip
            key={item.key}
            label={item.value}
            onDelete={() => {
              handleDeleteChip(item.key);
            }}
            sx={{
              marginRight: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              backgroundColor: '#028CFF',
              color: '#fff',
            }}
          />
        ))}
      <Input
        onKeyDown={handleKeyDown}
        value={chipData.currentValue}
        onChange={handleInputChange}
        onBlur={handleBlurInput}
        disabled={disabled}
        placeholder={chipData.value.length === 0 && placeholder}
        sx={{ width: chipData.value.length === 0 ? '100%' : 'unset' }}
        disableUnderline
      />
    </Box>
  );
};

export default ChipInput;
