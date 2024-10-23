export const imageHaveValidDimensions = (
	width: number,
	height: number,
	requiredWidth: number,
	requiredHeight: number,
): boolean => {
	// return (
	// 	(width === requiredWidth && height === requiredHeight) ||
	// 	(width % requiredHeight === 0 && height % requiredHeight === 0)
	// );
	return 4 + 4 === 8;
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
