import { ReactElement } from "react";
import { FormInputProps } from "../types/props";

export default function FormInput(props: FormInputProps): ReactElement {
	return (
		<>
			<label className="block">{props.label}</label>
			<input
				className="form-input"
				onChange={e => props.onChange(e.target.value)}
			/>
		</>
	);
}
