import { useDispatch, useSelector } from "react-redux";

/**
 * Reusable type-safe-ready custom hook wrappers for useDispatch and useSelector.
 */
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
