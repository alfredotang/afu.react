declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.gif';
declare module '*.yaml';
declare module '*.yml';
declare module '*.css';

type Dictionary<K, V> = {
  [key in K]: V;
};

type Maybe<T> = T | null;

type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};

type StringBoolean = 'true' | 'false';

type StringBooleanOrEmpty = StringBoolean | '';

type IKeyValuePair<K, V> = {
  key: K;
  value: V;
};
