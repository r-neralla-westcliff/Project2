const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

const router = express.Router();

// Multer config for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

router.put('/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});


router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, color, size, brand } = req.body;

    const product = new Product({
      title,
      description,
      price,
      color,
      size,
      brand,
      image: `http://localhost:5000/uploads/${req.file.filename}`
    });

    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ message: 'Error saving product', error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.image) {
      const match = product.image.match(/\/uploads\/(.+)$/);
      if (match) {
        const filename = match[1];
        const filepath = path.join(__dirname, '..', 'uploads', filename);

        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        } else {
          console.warn(`⚠️ Image file not found on disk: ${filepath}`);
        }
      } else {
        console.warn('⚠️ Could not parse image path:', product.image);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});


module.exports = router;
