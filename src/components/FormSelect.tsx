import { ReactElement } from "react";
import { FormSelectProps } from "../types/props";

export default function FormSelect(props: FormSelectProps): ReactElement {
	return (
		<>
			<label className="block">{props.label}</label>
			<select
				className="form-input"
				onChange={e => props.onChange(e.target.value)}>
				{props.children}
			</select>
		</>
	);
}
