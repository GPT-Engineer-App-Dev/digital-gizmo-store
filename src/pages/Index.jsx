import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";

const allProducts = [
  { id: 1, name: "Smartphone X", price: 799.99, image: "/placeholder.svg" },
  { id: 2, name: "Laptop Pro", price: 1299.99, image: "/placeholder.svg" },
  { id: 3, name: "Wireless Earbuds", price: 149.99, image: "/placeholder.svg" },
  { id: 4, name: "4K Smart TV", price: 699.99, image: "/placeholder.svg" },
  { id: 5, name: "Smartwatch", price: 249.99, image: "/placeholder.svg" },
  { id: 6, name: "Bluetooth Speaker", price: 79.99, image: "/placeholder.svg" },
  { id: 7, name: "Gaming Console", price: 499.99, image: "/placeholder.svg" },
  { id: 8, name: "Tablet", price: 349.99, image: "/placeholder.svg" },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
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
  <section className="mb-8">
    <Input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={handleSearch}
      className="w-full max-w-md mx-auto"
    />
  </section>
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