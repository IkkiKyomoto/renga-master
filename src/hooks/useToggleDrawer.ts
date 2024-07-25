import { useState } from "react";

export default function useToggleDrawer() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
