import { ReactElement } from "react";
import { FormSelectProps } from "../types/props";

export default function FormSelect(props: FormSelectProps): ReactElement {
	return (
		<>
			<label className="block">{props.label}</label>
			<select
				className="w-full rounded-lg border-solid border-2 border-blue-400 focus:border-blue-500 outline-none"
				onChange={e => props.onChange(e.target.value)}>
				{props.children}
			</select>
		</>
	);
}
