import { ReactElement } from "react";
import { FormInputProps } from "../types/props";

export default function FormInput(props: FormInputProps): ReactElement {
	return (
		<>
			<label className="block">{props.label}</label>
			<input
				className="w-full rounded-lg border-solid border-2 border-blue-400 focus:border-blue-500 outline-none"
				onChange={e => props.onChange(e.target.value)}
			/>
		</>
	);
}
