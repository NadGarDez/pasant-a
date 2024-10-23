export const imageHaveValidDimensions = (
	width: number,
	height: number,
): boolean => {
	return (
		(width === 300 && height === 900) ||
		(width % 300 === 0 && height % 900 === 0)
	);
};

export const getImageInfoFromFile = async (
	item: File,
): Promise<{
	width: number;
	height: number;
	url: string;
}> => {
	return await new Promise(resolve => {
		const url = URL.createObjectURL(item);
		const image = new Image();
		image.onload = item => {
			const { naturalHeight, naturalWidth } = item.target as HTMLImageElement;
			resolve({
				width: naturalWidth,
				height: naturalHeight,
				url,
			});
		};
		image.src = url;
	});
};
