import { MouseEventHandler, ReactNode } from "react";
import {
	Class as OriginalClass,
	ClassEnrollment as OriginalClassEnrollment,
	ClassInvites as OriginalClassInvites,
	ClassPosts as OriginalClassPosts,
	User
} from "@prisma/client";

export interface LayoutProps {
	children: ReactNode;
}

export interface ModalProps extends LayoutProps {
	isOpen: boolean;
	title: string;
}

export interface AddClassModalProps {
	isOpen: boolean;
	addClass: (enrollment: ClassEnrollment) => void;
	close: () => void;
}

export interface ButtonProps extends LayoutProps {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
	disabled?: boolean;
}

export interface FormInputProps {
	label: string;
	onChange: (value: string) => void;
}

export interface HomePageProps {
	enrollment: ClassEnrollment[];
}

export interface InvitePageProps {
	invite: ClassInvites;
}

export interface SSRErrorProps {
	props: {
		error: string;
	};
}

export interface SSRRequestLoginProps {
	props: {
		request_login: boolean;
	};
}

type Class = OriginalClass & {
	enrollment: ClassEnrollment[];
	posts: ClassPosts[];
	invites: ClassInvites[];
};
type ClassEnrollment = OriginalClassEnrollment & ClassHolder & UserHolder;
type ClassPosts = OriginalClassPosts & ClassHolder & UserHolder;
type ClassInvites = OriginalClassInvites & ClassHolder;

export interface ClassHolder {
	class: Class;
}

export interface UserHolder {
	user: User;
}
