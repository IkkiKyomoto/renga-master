export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  image: string;
};

export type Hokku = {
  id: string;
  user_id: string;
  shoku: string;
  niku: string;
  sanku: string;
  createdAt: string;
};

export type Tsukeku = {
  id: string;
  user_id: string;
  hokku_id: string;
  shiku: string;
  goku: string;
  createdAt: string;
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

export type Good = {
  id: string;
  user_id: string;
  renga_id: string;
  createdAt: string;
};
