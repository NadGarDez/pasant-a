export type fieldType =
	| "text"
	| "number"
	| "boolean"
	| "color"
	| "object"
	| "array"
	| "file"
	| "select"
	| "datetime"
	| "icon";

export interface fieldMetadaInteface {
	type: fieldType;
	name: string;
	label: string;
	subItems?: fieldMetadaInteface[];
	additionalProps?: {
		requiredWidth: number;
		requiredHeight: number;
		selectItems: Array<{
			label: string;
			value: string;
		}>;
	};
}

export interface groupOfFields {
	name?: string;
	fields: fieldMetadaInteface[];
}
