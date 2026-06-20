import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Heart,
  Star,
  ChevronDown,
  X,
  Shirt,
  Footprints,
  Gem,
  Plus,
  Check,
} from "lucide-react";
import "./shop.css";
import { useShop } from "./context/ShopContext";

const CATEGORIES = ["All", "Dresses", "Tops", "Bottoms", "Outerwear", "Shoes", "Accessories"];

const PRICE_RANGES = [
  { id: "all", label: "All", test: () => true },
  { id: "under50", label: "Under $50", test: (p) => p < 50 },
  { id: "50to100", label: "$50 – $100", test: (p) => p >= 50 && p <= 100 },
  { id: "100to200", label: "$100 – $200", test: (p) => p > 100 && p <= 200 },
  { id: "over200", label: "Over $200", test: (p) => p > 200 },
];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
  { id: "reviews", label: "Most Reviewed" },
];

const PRODUCTS = [
  { id: 1, name: "Floral Midi Dress", category: "Dresses", price: 89, rating: 4, reviews: 124 },
  { id: 2, name: "Tailored Blazer", category: "Outerwear", price: 145, rating: 4, reviews: 89 },
  { id: 3, name: "High-Waist Jeans", category: "Bottoms", price: 68, rating: 4, reviews: 203 },
  { id: 4, name: "Silk Wrap Blouse", category: "Tops", price: 72, rating: 5, reviews: 156 },
  { id: 5, name: "Wool Trench Coat", category: "Outerwear", price: 210, rating: 4, reviews: 67 },
  { id: 6, name: "Leather Ankle Boots", category: "Shoes", price: 128, rating: 4, reviews: 142 },
  { id: 7, name: "Pleated Mini Skirt", category: "Bottoms", price: 54, rating: 4, reviews: 98 },
  { id: 8, name: "Cashmere Sweater", category: "Tops", price: 95, rating: 5, reviews: 211 },
  { id: 9, name: "Statement Drop Earrings", category: "Accessories", price: 32, rating: 4, reviews: 76 },
];

const CATEGORY_ICON = {
  Dresses: Shirt,
  Tops: Shirt,
  Bottoms: Shirt,
  Outerwear: Shirt,
  Shoes: Footprints,
  Accessories: Gem,
};

function StarRow({ rating, reviews }) {
  return (
    <div className="ss-card-stars">
      <div className="ss-star-group">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} size={14} className={n <= rating ? "ss-star filled" : "ss-star"} />
        ))}
      </div>
      <span className="ss-review-count">({reviews})</span>
    </div>
  );
}

function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart, justAdded }) {
  const Icon = CATEGORY_ICON[product.category] || Shirt;
  return (
    <div className="ss-card">
      <div className="ss-card-image">
        <Icon size={40} className="ss-card-icon" />

        <button
          onClick={() => onToggleWishlist(product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="ss-card-wishlist"
        >
          <Heart size={17} className={isWishlisted ? "ss-heart filled" : "ss-heart"} />
        </button>

        <button onClick={() => onAddToCart(product.id)} className="ss-card-addcart">
          {justAdded ? (
            <>
              <Check size={15} /> Added
            </>
          ) : (
            <>
              <Plus size={15} /> Add to Cart
            </>
          )}
        </button>
      </div>

      <div className="ss-card-body">
        <p className="ss-card-category">{product.category}</p>
        <h3 className="ss-card-title">{product.name}</h3>
        <StarRow rating={product.rating} reviews={product.reviews} />
        <p className="ss-card-price">${product.price}</p>
      </div>
    </div>
  );
}

export default function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRangeId, setPriceRangeId] = useState("all");
  const [sortId, setSortId] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { wishlist, toggleWishlist, addToCart, justAddedId } = useShop();

  const priceRange = PRICE_RANGES.find((r) => r.id === priceRangeId);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        priceRange.test(p.price) &&
        p.name.toLowerCase().includes(search.trim().toLowerCase())
    );
    if (sortId === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortId === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortId === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortId === "reviews") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [category, priceRange, search, sortId]);

  const categoryCounts = useMemo(() => {
    const counts = { All: PRODUCTS.length };
    CATEGORIES.slice(1).forEach((c) => {
      counts[c] = PRODUCTS.filter((p) => p.category === c).length;
    });
    return counts;
  }, []);

  function resetFilters() {
    setCategory("All");
    setPriceRangeId("all");
    setSearch("");
  }

  const filtersPanel = (
    <div className="ss-filters">
      <div>
        <h3 className="ss-filter-heading">Category</h3>
        <div className="ss-filter-list">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={category === c ? "ss-filter-btn active" : "ss-filter-btn"}
            >
              <span>{c}</span>
              <span className="ss-filter-count">{categoryCounts[c]}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="ss-filter-heading">Price Range</h3>
        <div className="ss-filter-list">
          {PRICE_RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setPriceRangeId(r.id)}
              className={priceRangeId === r.id ? "ss-filter-btn active" : "ss-filter-btn"}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <button onClick={resetFilters} className="ss-clear-btn">
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="ss-app">
      <div className="ss-main">
   
        <div className="ss-toolbar">
          <div className="ss-search">
            <Search size={18} className="ss-search-icon" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="ss-search-input"
            />
          </div>

          <button onClick={() => setMobileFiltersOpen(true)} className="ss-filter-toggle">
            <SlidersHorizontal size={16} /> Filters
          </button>

          <div className="ss-sort">
            <select value={sortId} onChange={(e) => setSortId(e.target.value)} className="ss-sort-select">
              {SORT_OPTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  Sort by: {s.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="ss-sort-chevron" />
          </div>
        </div>

        <div className="ss-layout">
        
          <aside className="ss-sidebar">
            <div className="ss-sidebar-title">
              <SlidersHorizontal size={18} />
              <h2>Filters</h2>
            </div>
            {filtersPanel}
          </aside>

  
          <div className="ss-results">
            <p className="ss-results-count">
              Showing {filtered.length} of {PRODUCTS.length} products
            </p>

            {filtered.length === 0 ? (
              <div className="ss-empty">
                <p className="ss-empty-title">No products match your filters</p>
                <p className="ss-empty-text">Try a different category, price range, or search term.</p>
                <button onClick={resetFilters} className="ss-btn-primary">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="ss-grid">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isWishlisted={wishlist.has(p.id)}
                    onToggleWishlist={toggleWishlist}
                    onAddToCart={addToCart}
                    justAdded={justAddedId === p.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    
      {mobileFiltersOpen && (
        <div className="ss-mobile-drawer">
          <div className="ss-drawer-overlay" onClick={() => setMobileFiltersOpen(false)} />
          <div className="ss-drawer-panel">
            <div className="ss-drawer-header">
              <h2>Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="ss-drawer-close">
                <X size={18} />
              </button>
            </div>
            {filtersPanel}
            <button onClick={() => setMobileFiltersOpen(false)} className="ss-btn-primary ss-drawer-cta">
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
