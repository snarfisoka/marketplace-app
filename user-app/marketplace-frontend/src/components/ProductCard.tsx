import Image from 'next/image';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105'>
            <div className='relative w-full h-48'>
                <Image
                    src={product.image_url || '/placeholder.png'}
                    alt={product.name}
                    layout='fill'
                    objectFit='cover'
                />
            </div>
            <div className='p-4'>
                <h2 className='text-xl font-semibold text-gray-800'>{product.name}</h2>
                <p className='mt-2 text-sm text-gray-600 line-clamp-2'>{product.description}</p>
                <div className='mt-4 flex items-center justify-between'>
                    <span className='text-lg font-bold text-gray-900'>${product.price.toFixed(2)}</span>
                    <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;