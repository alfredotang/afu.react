import type { FC, KeyboardEvent, ChangeEvent, FocusEvent } from 'react';
import type { SxProps } from '@material-ui/system';
import type { Theme } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { v4 as uuid } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';

type ChipData = {
  currentInputValue: string;
  value: Typing.KeyValue<string, string>[];
};

type ChipInputProps = {
  disabled?: boolean;
  value?: string[];
  placeholder?: string;
  sx?: SxProps<Theme>;
  onAdd?: (newItem: string) => void;
  onDelete?: (item: string) => void;
};

/**
 * 多個以標籤顯示的輸入元件
 * ╭―――――――――――――――――――――――――――╮
 * │ ┏━━━┓                     │
 * │ ┃ A ┃ 輸入按 enter         │
 * │ ┗━━━┛ ——————————————————  │
 * ╰―――――――――――――――――――――――――――╯
 * @param props ChipInputProps
 */
const ChipInput: FC<ChipInputProps> = ({
  disabled = false,
  placeholder = '',
  value = [],
  sx = {},
  onAdd,
  onDelete,
}) => {
  const [chipData, setChipData] = useState<ChipData>({
    currentInputValue: '',
    value: [],
  });

  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setChipData((preState) => {
      const stateCopy = cloneDeep(preState);
      return {
        ...stateCopy,
        currentInputValue: event.target.value,
      };
    });
  };

  /**
   * @name handleBlurInput
   * @description on blur 輸入匡時，要 clean input 上的輸入文字
   * @param {FocusEvent} event
   */
  const handleBlurInput = (
    event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setChipData((preState) => {
      const stateCopy = cloneDeep(preState);
      return {
        ...stateCopy,
        currentInputValue: '',
      };
    });
  };

  /**
   * @name handlePressEnter
   * @description 按下 "Enter" 時，要把 input 上的 文字 轉成 chip
   */
  const handlePressEnter = () => {
    // 檢查 input value 是否為空值
    // // 若為空值 則 不 set state
    if (!chipData.currentInputValue) {
      return;
    }

    // 檢查是否有重複的值已存在
    // 若有則 不 set state
    if (
      chipData.value.some((item) => item.value === chipData.currentInputValue)
    ) {
      return;
    }

    setChipData((preState) => {
      const stateCopy = cloneDeep(preState);
      const newState: ChipData = {
        ...stateCopy,
        currentInputValue: '',
      };
      newState.value.push({ key: uuid(), value: stateCopy.currentInputValue });
      return newState;
    });

    onAdd(chipData.currentInputValue);
  };

  /**
   * @name handlePressBackSpace
   * @description 使用者 按下 "<--"  backspace
   */
  const handlePressBackSpace = () => {
    onDelete(chipData.value[chipData.value.length - 1].value);
    setChipData((preState) => {
      const stateCopy = cloneDeep(preState);
      const newState: ChipData = {
        ...stateCopy,
        currentInputValue: '',
      };
      newState.value.pop();
      return newState;
    });
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // press backspace
    if (
      event.key?.toLowerCase() === 'backspace' &&
      !chipData.currentInputValue &&
      chipData.value.length > 0
    ) {
      handlePressBackSpace();
    }

    // Press Enter
    if (event.key?.toLowerCase() === 'enter') {
      handlePressEnter();
    }
  };

  /**
   * @name handleDeleteChip
   * @description 使用者刪除 指定 chip
   * @param {string} key uuid
   */
  const handleDeleteChip = (key: string) => {
    const deleteItemIndex = chipData.value.findIndex(
      (item) => item.key === key
    );
    onDelete(chipData.value[deleteItemIndex].value);
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

  /**
   * @name handleClickBody
   * @description 使用者點擊 component 任意位置，會 auto focus 在 輸入匡上
   */
  const handleClickBody = () => {
    inputRef?.current?.focus();
  };

  /**
   * 處理 default value
   */
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
    } else {
      setChipData({ currentInputValue: '', value: [] });
    }
  }, [value.toString()]);

  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: disabled ? '#F8F8F8' : '#FFFFFF',
        border: '1px solid #B9C4CE',
        boxSizing: 'border-box',
        borderRadius: '4px',
        padding: '8px 8px',
        width: '600px',
        marginRight: '16px',
        minHeight: '70px',
        cursor: disabled ? 'not-allowed' : 'text',
      }}
      onClick={handleClickBody}
    >
      {chipData.value?.length > 0 &&
        chipData.value.map((item) => (
          <Chip
            key={item.key}
            label={item.value}
            disabled={disabled}
            onDelete={() => {
              handleDeleteChip(item.key);
            }}
            sx={{
              marginRight: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              backgroundColor: (theme) => theme.palette.primary.main,
              color: '#fff',
            }}
          />
        ))}
      <Input
        onKeyDown={handleKeyDown}
        value={chipData.currentInputValue}
        onChange={handleInputChange}
        onBlur={handleBlurInput}
        disabled={disabled}
        placeholder={chipData.value.length === 0 ? placeholder : ''}
        sx={{
          width: chipData.value.length === 0 ? '100%' : 'unset',
          fontSize: '14px',
        }}
        disableUnderline
        inputRef={inputRef}
      />
    </Box>
  );
};

export default ChipInput;
