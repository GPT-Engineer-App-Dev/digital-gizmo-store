import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

const allProducts = [
  { id: 1, name: "Smartphone X", price: 799.99, image: "/placeholder.svg", category: "Smartphones" },
  { id: 2, name: "Laptop Pro", price: 1299.99, image: "/placeholder.svg", category: "Laptops" },
  { id: 3, name: "Wireless Earbuds", price: 149.99, image: "/placeholder.svg", category: "Audio" },
  { id: 4, name: "4K Smart TV", price: 699.99, image: "/placeholder.svg", category: "TVs" },
  { id: 5, name: "Smartwatch", price: 249.99, image: "/placeholder.svg", category: "Wearables" },
  { id: 6, name: "Bluetooth Speaker", price: 79.99, image: "/placeholder.svg", category: "Audio" },
  { id: 7, name: "Gaming Console", price: 499.99, image: "/placeholder.svg", category: "Gaming" },
  { id: 8, name: "Tablet", price: 349.99, image: "/placeholder.svg", category: "Tablets" },
];

const categories = [...new Set(allProducts.map(product => product.category))];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, priceRange, selectedCategories]);

  const filterProducts = () => {
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      (selectedCategories.length === 0 || selectedCategories.includes(product.category))
    );
    setFilteredProducts(filtered);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <div className="flex justify-between items-center mb-8">
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <FilterButton
          priceRange={priceRange}
          handlePriceRangeChange={handlePriceRangeChange}
          categories={categories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
      <FeaturedProducts products={filteredProducts} />
      <PromotionalSection />
    </div>
  );
};

const HeroSection = () => (
  <section className="mb-16">
    <div className="relative">
      <img src="/placeholder.svg" alt="Featured Product" className="w-full h-[400px] object-cover rounded-lg" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to TechMart</h1>
        <p className="text-xl text-white mb-6">Discover the latest in electronics and gadgets</p>
        <Button size="lg">Shop Now</Button>
      </div>
    </div>
  </section>
);

const SearchBar = ({ searchQuery, handleSearch }) => (
  <Input
    type="text"
    placeholder="Search products..."
    value={searchQuery}
    onChange={handleSearch}
    className="w-full max-w-md"
  />
);

const FilterButton = ({ priceRange, handlePriceRangeChange, categories, selectedCategories, handleCategoryChange }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Filter Products</SheetTitle>
        <SheetDescription>
          Adjust filters to refine your product search.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="price-range">Price Range</Label>
          <Slider
            id="price-range"
            min={0}
            max={1500}
            step={10}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Categories</Label>
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

const FeaturedProducts = ({ products }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
    {products.length === 0 ? (
      <p className="text-center text-gray-500">No products found.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )}
  </section>
);

const PromotionalSection = () => (
  <section className="bg-primary text-primary-foreground rounded-lg p-8">
    <h2 className="text-3xl font-bold mb-4">Special Offer!</h2>
    <p className="text-xl mb-6">Get 20% off on all smartphones this week. Use code: PHONE20</p>
    <Button variant="secondary">Shop Smartphones</Button>
  </section>
);

export default Index;