import connectDb from '../../../utils/connectDb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDb();
    const { productId, stockStatus, size } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          stockStatus: stockStatus,
          size: size
        }
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
}
