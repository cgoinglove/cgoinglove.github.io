type Setter<T> = ((prev: T) => T) | T;

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type Func<Args extends any[] = any[], ReturnValue = any> = (
  ...args: Args
) => ReturnValue;

type ElementType<T> = T extends (infer U)[] ? U : never;

type InferProps<T> = T extends React.ComponentType<infer P> ? P : never;

type ValueOf<T extends object> = T[keyof T];

type Override<T, R> = Omit<T, keyof R> & R;

type UnWrapArray<T> = T extends (infer U)[] ? U : T;

type PostMetadata = {
  title: string;
  thumbnail: string;
  date: string;
  summary: string;
  timestamp: number;
};

type Post = {
  content: string;
  slug: string;
  metadata: PostMetadata;
};
