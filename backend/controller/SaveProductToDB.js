const ProductModel = require("../models/ProductModel");
async function SaveProductToDB(req, response) {
	try {
		const {
			productName,
			description,
			price,
			images,
			category,
			quantity,
			brandName,
			signature,
			_id
		} = req.body;
		let deleteProduct;
		try {
			if (_id) {
				updateProduct = await ProductModel.findByIdAndUpdate(_id);
				if (updateProduct) {
					response.status(201).json({
						success: true,
						message: "Product updated Successfully!"
					});
				}
			} else {
				if (
					!productName ||
					!description ||
					!brandName ||
					!price ||
					!images
				) {
					return response
						.status(400)
						.json({ message: "All fields are required" });
				}
				const userId = req.userID;
				const lowercaseProductName = productName.toLowerCase();
				const lowrcaseCategory = category.toLowerCase();
				const lowercaseBrandName = brandName.toLowerCase();
				const productData = {
					userId,
					productName: lowercaseProductName,
					description,
					price,
					images,
					brandName: lowercaseBrandName,
					category: lowrcaseCategory,
					quantity,
					signature
				};
				const newProduct = new ProductModel(productData);
				await newProduct.save().then(() => {
					response.status(201).json({
						data: newProduct,
						success: true,
						message: "Product uploaded Successfully!"
					});
				});
			}
		} catch (err) {
			console.log(err);
		}
	} catch (error) {
		console.error(error);
	}
}

module.exports = SaveProductToDB;
