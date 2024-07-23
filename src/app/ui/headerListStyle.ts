export type HeaderListStyle = {
  ul: string;
  li: string;
};

export const pcStyle: HeaderListStyle = {
  ul: "flex gap-4 justify-end flex-raw",
  li: "",
};

export const spStyle: HeaderListStyle = {
  ul: "flex gap-4 justify-end flex-col",
  li: "p-6 font-xl font-bold",
};
