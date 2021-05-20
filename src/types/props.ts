import { MouseEventHandler, ReactNode } from "react";
import {
	Class as OriginalClass,
	ClassEnrollment as OriginalClassEnrollment,
	ClassInvites as OriginalClassInvites,
	ClassPosts as OriginalClassPosts,
	User
} from "@prisma/client";
import { ParsedUrlQuery } from "querystring";

export interface LayoutProps {
	children: ReactNode;
}

export interface ModalProps extends LayoutProps {
	title: string;
}

export interface AddClassModalProps {
	addClass: (enrollment: ClassEnrollment) => void;
	close: () => void;
}

export interface InviteModalProps {
	class: Class;
	close: () => void;
}

export interface ButtonProps extends LayoutProps {
	className?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface FormInputProps {
	label: string;
	onChange: (value: string) => void;
}

export interface FormSelectProps extends FormInputProps, LayoutProps {}

export interface HomePageProps {
	enrollment: ClassEnrollment[];
}

export interface InvitePageProps {
	invite: ClassInvites;
}

export interface SSRClassPageParams extends ParsedUrlQuery {
	id: string;
}

export interface SSRInvitePageParams extends ParsedUrlQuery {
	invite: string;
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

export type Class = OriginalClass & {
	enrollment: ClassEnrollment[];
	posts: ClassPosts[];
	invites: ClassInvites[];
};
export type ClassEnrollment = OriginalClassEnrollment &
	ClassHolder &
	UserHolder;
export type ClassPosts = OriginalClassPosts & ClassHolder & UserHolder;
export type ClassInvites = OriginalClassInvites & ClassHolder;

export interface ClassHolder {
	class: Class;
}

export interface UserHolder {
	user: User;
}
