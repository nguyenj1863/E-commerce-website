import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

function CategoryPreview({ title, products }) {
    console.log(title, products);
    return (
        <div className='category-preview-container'>
            <h2>
                <span className='title'>{title.toUpperCase()}</span>
            </h2>
            <div className='preview'>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                }
            </div>
        </div>
    );
}

export default CategoryPreview;