import { Dispatch, SetStateAction, useCallback, useState } from "react";

export function useToggle(
  initialState: boolean
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [flag, setFlag] = useState(initialState);
  const toggle = useCallback(() => setFlag((f) => !f), [setFlag]);
  return [flag, toggle, setFlag];
}
