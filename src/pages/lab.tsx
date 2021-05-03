import type { FC } from 'react';
import { ChipInput } from '@src/components';

const Home: FC = () => {
  return (
    <div>
      <ChipInput
        placeholder={`請輸入項目，如S,M,L，鍵入"enter"隔開`}
        value={['1', '2']}
      />
    </div>
  );
};

export default Home;
