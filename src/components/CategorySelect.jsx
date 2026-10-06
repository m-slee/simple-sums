export default function CategorySelect(props) {
    const { categories, selectedCategory, handleCategoryChange } = props;

    const handleChange = (e) => {
        handleCategoryChange(e.target.value);
    };

    return (
        <select
            className="category-select"
            value={selectedCategory}
            onChange={handleChange}
        >
            {categories.map((category, i) => {
                return (
                    <option key={i} value={category}>
                        {category}
                    </option>
                );
            })}
        </select>
    );
}
