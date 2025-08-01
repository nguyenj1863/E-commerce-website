import './directory.styles.scss'
import CategoryItem from "../category-item/category-item.component";

function Directory({ categories }) {
    return (
        <div className='directory-container'>
        {categories.map((category) => (
            <CategoryItem key={CategoryItem.id} category={category} />
        ))}
        </div>
    )
}

export default Directory;