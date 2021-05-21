import create from "zustand";

export const useNavbarStore = create<NavbarState>(set => ({
	classId: undefined,
	setClassId: classId => set({ classId })
}));

type NavbarState = {
	classId?: string;
	setClassId: (classId: string) => void;
};
