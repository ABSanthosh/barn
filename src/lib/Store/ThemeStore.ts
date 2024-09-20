import { writable } from "svelte/store";
import { browser } from "$app/environment";

const initialValue = browser
  ? window.localStorage.getItem("theme") ?? "light"
  : "light";
export const theme = writable<Theme>(initialValue as Theme);

export const setTheme = (value: Theme) => {
  if (browser) {
    window.localStorage.setItem("theme", value);
    document.documentElement.dataset.theme = value;
    theme.set(value)
  }
};
