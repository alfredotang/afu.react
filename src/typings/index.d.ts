declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.gif';
declare module '*.yaml';
declare module '*.yml';
declare module '*.css';

declare namespace Typing {
  export type KeyValue<K, V> = {
    key: K;
    value: V;
  };

  export type Dictionary<K, V> = {
    [key in K]: V;
  };

  export type Maybe<T> = T | null;

  export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
  };

  export type StringBoolean = 'true' | 'false';
  export type StringBooleanOrEmpty = StringBoolean | '';
}

type IKeyValuePair<K, V> = {
  key: K;
  value: V;
};
