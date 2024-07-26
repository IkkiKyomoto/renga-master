export type User = {
  id: string;
  name: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string | null;
  likes?: Like[];
  emailVerified?: boolean;
};

export type Hokku = {
  id: string;
  description: string | null;
  userId: string;
  user?: User;
  ikku: string;
  niku: string;
  sanku: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  tsukeku?: Tsukeku[];
  tsukekuNum?: number;
};

export type Tsukeku = {
  id: string;
  userId: string;
  user?: User;
  hokkuId: string;
  description: string | null;
  yonku: string;
  goku: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Renga = {
  id: string;
  hokkuId: string;
  hokku?: Hokku;

  tsukekuId: string;
  tsukeku?: Tsukeku;
  likes: Like[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type Like = {
  id: string;
  userId: string;
  rengaId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Token = {
  id: string;
  identifier: string;
  expires: Date;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
};
