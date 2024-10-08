export interface hookVerbsInterface<Item> {
	delete: () => void;
	put: (value: Item) => void;
	post: (value: Item) => void;
}
