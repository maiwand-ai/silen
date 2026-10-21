"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year, resolved in the visitor's browser so it never goes stale. */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => null);
  return <>{year}</>;
}
