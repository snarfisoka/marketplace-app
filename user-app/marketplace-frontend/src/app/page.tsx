import { getProducts } from "../../lib/api";
import ProductCard from '../../src/components/ProductCard'

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

export default async function HomePage() {
    const data = await getProducts();
    const products: Product[] = data?.products || [];

    return (
        <main className='container mx-auto p-4'>
            <h1 className='text-4xl font-bold text-center mb-8'>Product Catalog</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products found. Please add some from the admin panel!</p>
                )}
            </div>
        </main>
    );
}