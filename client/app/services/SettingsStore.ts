import { Store } from "pullstate";

interface SettingsInterface {
  isDarkMode: boolean;
  displayName: string,
  profilePicIndex: number,
  profileColor: string,
}

export const SettingStore = new Store<SettingsInterface>({
  isDarkMode: false, // TODO: isDarkMode not implemented, part of different issue from other three variables
  displayName: "Display Name",
  profilePicIndex: 0,
  profileColor: "#1199ff",
});

export const toggleTheme = async () => {
  SettingStore.update((store) => {
    store.isDarkMode = !store.isDarkMode;
  });
};

export const changeName = async (name: string) => {
  SettingStore.update((store) => {
    store.displayName = name;
  });
};

export const changeProfileIndex = async (index: number) => {
  SettingStore.update((store) => {
    store.profilePicIndex = index;
  });
};

export const changeProfileColor = async (color: string) => {
  SettingStore.update((store) => {
    store.profileColor = color;
  });
};
