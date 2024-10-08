export interface hookVerbsInterface<Item> {
	del: () => void;
	put: (value: Item) => void;
	post: (value: Item) => void;
}
