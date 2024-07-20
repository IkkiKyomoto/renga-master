export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  image: string | null;
  likes: Like[];
};

export type Hokku = {
  id: string;
  description: string | null;
  userId: string;
  ikku: string;
  niku: string;
  sanku: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  tsukeku?: Tsukeku[];
  tsukekuNum?: number;
};

export type Tsukeku = {
  id: string;
  userId: string;
  hokkuId: string;
  yonku: string;
  goku: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Renga = {
  id: string;
  hokku_user_id: string;
  tsukeku_user_id: string;
  shoku: string;
  niku: string;
  sanku: string;
  shiku: string;
  goku: string;
  hokku_id: string;
  tsukeku_id: string;
  createdAt: string;
  good: number;
};

export type Like = {
  id: string;
  userId: string;
  rengaId: string;
  createdAt: Date;
  updatedAt: Date;
};
