export type fieldType =
	| "text"
	| "number"
	| "boolean"
	| "color"
	| "object"
	| "array"
	| "file";

export interface fieldMetadaInteface {
	type: fieldType;
	name: string;
	label: string;
	subItems?: fieldMetadaInteface[];
}

export interface groupOfFields {
	name?: string;
	fields: fieldMetadaInteface[];
}
