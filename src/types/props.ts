import React, { MouseEventHandler } from "react";
import { Class, ClassEnrollment, ClassPosts } from "@prisma/client";
import { User } from "next-auth";

export interface LayoutProps {
	children: React.ReactNode;
}

export interface ClassPostsProps {
	class: Class & {
		enrollment: ClassEnrollment[];
		posts: (ClassPosts & { user: User })[];
	};
}

export interface ClassCardProps {
	class: Class & {
		enrollment: (ClassEnrollment & { user: User })[];
	};
}

export interface ModalProps extends LayoutProps {
	isOpen: boolean;
	title: string;
}

export interface AddClassModalProps {
	isOpen: boolean;
	addClass: (_class: Class) => void;
	close: () => void;
}

export interface ButtonProps extends LayoutProps {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
	disabled?: boolean;
}

export interface FormInputProps {
	label: string;
	onChange: (value: string) => any;
}
