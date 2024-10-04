export type fieldType =
	| "text"
	| "number"
	| "boolean"
	| "color"
	| "object"
	| "array";

export interface fieldMetadaInteface {
	type: fieldType;
	name: string;
	label: string;
}
