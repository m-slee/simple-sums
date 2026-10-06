import CategorySelect from "./CategorySelect";

export default function Nav(props) {
    const { categories, selectedCategory, handleCategoryChange } = props;
    return (
        <nav className="border-bottom py-1">
            <div className="side-margin d-flex justify-between align-center">
                <p>
                    Simple<b>Sums</b>
                </p>
                <CategorySelect
                    categories={categories}
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                />
            </div>
        </nav>
    );
}
