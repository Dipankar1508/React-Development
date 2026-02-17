const express = require('express');
const multer = require('multer');

const router = express.Router();
const auth = require('../middleware/userMiddleware');
const Product = require('../models/Product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST ALL PRODUCTS - ADMIN
router.post("/add", auth, upload.single('image'), async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const { title, description, category } = req.body;
        const newProduct = new Product({
            title,
            description,
            category,
            image: req.file.filename,
            createdBy: req.user.id
        })
        await newProduct.save();
        return res.status(201).json({ message: 'File Saved', newProduct });
    }
    catch (err) {
        return res.status(400).json({ error: err.message, message: 'Error saving file' });
    }
});

// GET PRODUCTS BAED ON CATEGORY
router.get("/get/:category", async (req, res) => {
    try {
        const { category } = req.params;
        let allProducts;
        if (category === 'all') {
            allProducts = await Product.find().sort({ createdAt: -1 });
        } else {
            allProducts = await Product.find({ category: category }).sort({ createdAt: -1 });
        }
        res.status(200).json(allProducts);
    } catch (err) {
        res.status(400).json({ error: err.message, message: 'Error getting products' });
    }
});

router.delete("/delete/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const deleteProduct = await Product.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        return res.status(400).json({ error: err.message, message: 'Error deleting product' });
    }
});
// UPDATE PRODUCT
// UPDATE PRODUCT (with optional image)
router.put(
    "/update/:id",
    auth,
    upload.single("image"),
    async (req, res) => {
        try {
            if (req.user.role !== "admin") {
                return res.status(403).json({ message: "Unauthorized" });
            }

            const { title, description, category } = req.body;

            const updateData = {
                title,
                description,
                category,
            };

            // if a new image is uploaded
            if (req.file) {
                updateData.image = req.file.filename;
            }

            const updated = await Product.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

            res.json({ message: "Product updated", updated });
        } catch (err) {
            res.status(500).json({ message: "Error updating product" });
        }
    }
);


// Fetch single Data
router.get("/fetch/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message, message: 'Error getting product' });
    }
});
module.exports = router;