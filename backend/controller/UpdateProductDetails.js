const { v2: cloudinary } = require("cloudinary");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});
async function UpdateProductDetail(req, res, next) {
	try {
		const { removedImages, images, category } = req.body;
		if (removedImages.length > 0) {
			for (const image of removedImages) {
				const parts = image.split("/");

				const public_id = `${parts[7]}/${parts[8].split(".")[0]}`;
				const type = `${parts[5]}`;
				const resource_type = `${parts[4]}`;

				const result = await cloudinary.uploader.destroy([public_id], {
					type: type,
					resource_type: resource_type
				});
			}
		}
		const url = [];
		if (images.length > 0) {
			for (const image of images) {
				if (image.startsWith("https")) {
					url.push(image);
				} else {
					const newData = await cloudinary.uploader.upload(image, {
						folder: category,
						resource_type: "image"
					});
					url.push(newData.secure_url);
				}
			}
		}
        req.body = { ...req.body, images: url };
        next();
	} catch (error) {
		console.log(error);
	}
}

module.exports = UpdateProductDetail;
