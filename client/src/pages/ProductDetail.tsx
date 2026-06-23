import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, ChevronRight, Heart, Star, Share2, ShoppingCart, 
  Truck, Shield, RotateCcw, MessageCircle 
} from "lucide-react";

/**
 * Product Detail Page - Interactive Demo
 * Features: Image gallery carousel, detailed descriptions, customer reviews
 */

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
  helpful: number;
}

interface ProductData {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  sku: string;
  inStock: boolean;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  reviews_list: Review[];
}

const PRODUCTS_DATA: Record<number, ProductData> = {
  1: {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviews: 324,
    category: "Electronics",
    sku: "PWH-001",
    inStock: true,
    description: "Experience premium sound quality with our flagship wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding for all-day listening.",
    features: [
      "Active Noise Cancellation (ANC) technology",
      "30-hour battery life",
      "Premium memory foam ear cushions",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Foldable design with carrying case",
      "Touch controls for easy navigation"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32 Ohms",
      "Bluetooth Version": "5.0",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Weight": "250g",
      "Color": "Matte Black"
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop"
    ],
    reviews_list: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        date: "2024-06-15",
        title: "Best headphones I've ever owned!",
        text: "The sound quality is incredible, and the noise cancellation is top-notch. Battery life easily lasts me a week of daily use. Highly recommend!",
        verified: true,
        helpful: 245
      },
      {
        id: 2,
        author: "Michael Chen",
        rating: 4,
        date: "2024-06-10",
        title: "Great quality, minor comfort issue",
        text: "Sound is excellent and they're very durable. The only downside is they can feel a bit tight after 3+ hours of use, but overall very satisfied.",
        verified: true,
        helpful: 128
      },
      {
        id: 3,
        author: "Emma Davis",
        rating: 5,
        date: "2024-06-05",
        title: "Perfect for travel",
        text: "I use these for flights and they're perfect. The ANC blocks out engine noise beautifully, and the battery lasts the entire trip.",
        verified: true,
        helpful: 89
      },
      {
        id: 4,
        author: "James Wilson",
        rating: 4,
        date: "2024-05-28",
        title: "Good value for money",
        text: "Solid headphones at a great price point. The build quality feels premium and they sound fantastic. Worth every penny.",
        verified: true,
        helpful: 156
      }
    ]
  },
  2: {
    id: 2,
    name: "Minimalist Watch",
    price: 89.99,
    rating: 4.6,
    reviews: 156,
    category: "Accessories",
    sku: "MW-002",
    inStock: true,
    description: "A timeless minimalist watch designed for the modern professional. Clean lines, premium materials, and precise Japanese movement make this the perfect everyday accessory.",
    features: [
      "Japanese quartz movement",
      "Sapphire crystal glass",
      "Water resistant up to 50m",
      "Stainless steel case",
      "Genuine leather strap",
      "Date window",
      "Minimalist dial design"
    ],
    specifications: {
      "Case Material": "Stainless Steel",
      "Case Diameter": "40mm",
      "Case Thickness": "8mm",
      "Strap": "Genuine Leather",
      "Movement": "Japanese Quartz",
      "Water Resistance": "50m",
      "Crystal": "Sapphire",
      "Warranty": "2 Years"
    },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop"
    ],
    reviews_list: [
      {
        id: 1,
        author: "Alex Turner",
        rating: 5,
        date: "2024-06-12",
        title: "Elegant and timeless",
        text: "This watch is absolutely beautiful. The minimalist design goes with everything, and the build quality is exceptional for the price.",
        verified: true,
        helpful: 203
      },
      {
        id: 2,
        author: "Lisa Anderson",
        rating: 4,
        date: "2024-06-08",
        title: "Great everyday watch",
        text: "Looks premium, keeps accurate time, and the leather strap is comfortable. Only wish it came with more strap options.",
        verified: true,
        helpful: 94
      }
    ]
  },
  3: {
    id: 3,
    name: "Leather Backpack",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 89,
    category: "Accessories",
    sku: "LB-003",
    inStock: true,
    description: "Premium leather backpack designed for professionals and travelers. Durable construction, multiple compartments, and timeless style make this the perfect companion for any journey.",
    features: [
      "Premium full-grain leather",
      "Laptop compartment (fits up to 15\")",
      "Multiple organizational pockets",
      "Padded shoulder straps",
      "YKK zippers",
      "Waterproof interior lining",
      "Lifetime warranty"
    ],
    specifications: {
      "Material": "Full-grain Leather",
      "Dimensions": "18\" x 12\" x 8\"",
      "Weight Capacity": "25 lbs",
      "Laptop Compartment": "Up to 15 inches",
      "Color": "Cognac Brown",
      "Closure": "YKK Zippers",
      "Warranty": "Lifetime"
    },
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop"
    ],
    reviews_list: [
      {
        id: 1,
        author: "David Martinez",
        rating: 5,
        date: "2024-06-14",
        title: "Investment piece that lasts",
        text: "This backpack is worth every penny. The leather is beautiful and getting better with age. Perfect for business travel.",
        verified: true,
        helpful: 167
      }
    ]
  }
};

export default function ProductDetail() {
  const [, params] = useRoute("/projects/ecommerce/product/:id");
  const productId = params?.id ? parseInt(params.id) : 1;
  
  const product = PRODUCTS_DATA[productId] || PRODUCTS_DATA[1];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [sortBy, setSortBy] = useState("helpful");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const sortedReviews = [...product.reviews_list].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "rating-high") return b.rating - a.rating;
    if (sortBy === "rating-low") return a.rating - b.rating;
    return 0;
  });

  const averageRating = product.reviews_list.length > 0
    ? (product.reviews_list.reduce((sum, r) => sum + r.rating, 0) / product.reviews_list.length).toFixed(1)
    : product.rating;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <a href="/projects/ecommerce" className="flex items-center gap-2 text-accent hover:text-accent/80">
            <ChevronLeft className="w-5 h-5" />
            Back to Store
          </a>
          <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Product Details
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-secondary rounded-lg overflow-hidden aspect-square">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index
                      ? "border-accent"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold">{product.rating}</span>
                <a href="#reviews" className="text-accent hover:underline">
                  ({product.reviews} reviews)
                </a>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-accent">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-accent font-bold">
                  Save ${(product.originalPrice - product.price).toFixed(2)} (33% off)
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className={`flex items-center gap-2 text-sm font-bold ${
              product.inStock ? "text-green-600" : "text-red-600"
            }`}>
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-600" : "bg-red-600"}`} />
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-secondary transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-2 border-l border-r border-border">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
              <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart
              </Button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? "fill-accent text-accent" : "text-muted-foreground"
                  }`}
                />
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck className="w-6 h-6 text-accent" />
                <span className="text-sm font-bold">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Shield className="w-6 h-6 text-accent" />
                <span className="text-sm font-bold">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw className="w-6 h-6 text-accent" />
                <span className="text-sm font-bold">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pb-16 border-b border-border">
          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Key Features
            </h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Specifications
            </h2>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Customer Reviews
            </h2>
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Write a Review
            </Button>
          </div>

          {/* Review Summary */}
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-accent mb-2">{averageRating}</div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(parseFloat(averageRating as string))
                          ? "fill-accent text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {product.reviews_list.length} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = product.reviews_list.filter(r => r.rating === rating).length;
                  const percentage = (count / product.reviews_list.length) * 100;
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-8">{rating}★</span>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-card rounded-lg border border-border p-8 space-y-4">
              <h3 className="text-lg font-bold">Share Your Experience</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <textarea
                  placeholder="Write your review..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="flex gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Submit Review
                  </Button>
                  <Button
                    onClick={() => setShowReviewForm(false)}
                    variant="outline"
                    className="border-border"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Sort Reviews */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">All Reviews</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="helpful">Most Helpful</option>
              <option value="rating-high">Highest Rating</option>
              <option value="rating-low">Lowest Rating</option>
            </select>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {sortedReviews.map(review => (
              <div key={review.id} className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{review.author}</h4>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h5 className="font-bold mb-2">{review.title}</h5>
                <p className="text-muted-foreground mb-4">{review.text}</p>

                <div className="flex items-center gap-4 text-sm">
                  <button className="text-muted-foreground hover:text-accent transition-colors">
                    👍 Helpful ({review.helpful})
                  </button>
                  <button className="text-muted-foreground hover:text-accent transition-colors">
                    👎 Not Helpful
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
