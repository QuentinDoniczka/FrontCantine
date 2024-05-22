export const resizeAndFormatImage = (file: File): Promise<Blob | null> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event: ProgressEvent<FileReader>) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				let width = img.width;
				let height = img.height;

				if (width > height) {
					if (width > 300) {
						height = Math.round((height * 300) / width);
						width = 300;
					}
				} else {
					if (height > 300) {
						width = Math.round((width * 300) / height);
						height = 300;
					}
				}

				canvas.width = width;
				canvas.height = height;

				ctx?.drawImage(img, 0, 0, width, height);
				canvas.toBlob(blob => {
					resolve(blob ?? null);
				}, 'image/bmp');
			};
			img.src = (event.target?.result as string) ?? '';
		};
		reader.onerror = error => {
			reject(error);
		};
		reader.readAsDataURL(file);
	});
};
