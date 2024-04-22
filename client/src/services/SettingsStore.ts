import { Store } from "pullstate";

interface SettingsInterface {
  isDarkMode: boolean;
}

export const SettingStore = new Store<SettingsInterface>({
  isDarkMode: false,
});

export const toggleTheme = async () => {
  SettingStore.update((store) => {
    store.isDarkMode = !store.isDarkMode;
  });
};
