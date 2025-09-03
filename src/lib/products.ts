import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'luxury-tshirt-1',
    name: 'Luxury T-Shirt',
    price: 35,
    category: 'Clothes',
    description: 'Premium cotton t-shirt crafted with attention to detail. Features a minimalist design with the NADER signature subtle branding. Perfect for everyday luxury.',
    image: 'https://placehold.co/600x600?text=Luxury+Premium+Cotton+T-Shirt+Black+Minimalist+Design+NADER+Brand',
    images: [
      'https://placehold.co/600x600?text=Luxury+Premium+Cotton+T-Shirt+Black+Minimalist+Design+NADER+Brand',
      'https://placehold.co/600x600?text=Luxury+T-Shirt+Back+View+Minimalist+Black+Cotton',
      'https://placehold.co/600x600?text=Luxury+T-Shirt+Detail+Close+Up+Premium+Cotton+Fabric'
    ],
    inStock: true,
    stockQuantity: 50,
    features: ['100% Premium Cotton', 'Minimalist Design', 'Machine Washable', 'Available in Multiple Sizes']
  },
  {
    id: 'black-mug-1',
    name: 'Black Mug',
    price: 15,
    category: 'Mugs',
    description: 'Elegant matte black ceramic mug with subtle NADER branding. Perfect for your morning coffee or evening tea. Dishwasher and microwave safe.',
    image: 'https://placehold.co/600x600?text=Elegant+Black+Ceramic+Mug+Matte+Finish+NADER+Brand+Coffee',
    images: [
      'https://placehold.co/600x600?text=Elegant+Black+Ceramic+Mug+Matte+Finish+NADER+Brand+Coffee',
      'https://placehold.co/600x600?text=Black+Mug+With+Coffee+Steam+Morning+Luxury+Ceramic',
      'https://placehold.co/600x600?text=Black+Mug+Handle+Detail+Premium+Ceramic+Craftsmanship'
    ],
    inStock: true,
    stockQuantity: 100,
    features: ['Premium Ceramic', 'Matte Black Finish', 'Dishwasher Safe', 'Microwave Safe', '350ml Capacity']
  },
  {
    id: 'insulated-bottle-1',
    name: 'Insulated Bottle',
    price: 25,
    category: 'Bottles',
    description: 'Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold for 24 hours or hot for 12 hours. Features leak-proof design with premium finish.',
    image: 'https://placehold.co/600x600?text=Premium+Insulated+Steel+Water+Bottle+Black+NADER+Luxury+Design',
    images: [
      'https://placehold.co/600x600?text=Premium+Insulated+Steel+Water+Bottle+Black+NADER+Luxury+Design',
      'https://placehold.co/600x600?text=Insulated+Bottle+Lifestyle+Outdoor+Adventure+Premium+Steel',
      'https://placehold.co/600x600?text=Water+Bottle+Cap+Detail+Leak+Proof+Design+Stainless+Steel'
    ],
    inStock: true,
    stockQuantity: 75,
    features: ['Double-Wall Vacuum Insulation', 'Leak-Proof Design', 'BPA-Free', '500ml Capacity', '24h Cold / 12h Hot']
  },
  {
    id: 'minimalist-notebook-1',
    name: 'Minimalist Notebook',
    price: 20,
    category: 'Notebooks',
    description: 'Premium hardcover notebook with dotted pages. Perfect for journaling, note-taking, or creative work. Features high-quality paper and minimalist design.',
    image: 'https://placehold.co/600x600?text=Premium+Minimalist+Hardcover+Notebook+Black+NADER+Dotted+Pages',
    images: [
      'https://placehold.co/600x600?text=Premium+Minimalist+Hardcover+Notebook+Black+NADER+Dotted+Pages',
      'https://placehold.co/600x600?text=Notebook+Open+Pages+Dotted+Paper+Premium+Quality+Minimalist',
      'https://placehold.co/600x600?text=Notebook+Cover+Detail+Hardcover+Luxury+Black+Finish'
    ],
    inStock: true,
    stockQuantity: 80,
    features: ['Premium Paper Quality', 'Hardcover Design', 'Dotted Pages', 'Ribbon Bookmark', '192 Pages']
  },
  {
    id: 'phone-cover-1',
    name: 'Phone Cover',
    price: 18,
    category: 'Phone Covers',
    description: 'Minimalist phone case providing excellent protection with style. Available for various phone models. Features precise cutouts and premium materials.',
    image: 'https://placehold.co/600x600?text=Minimalist+Black+Phone+Case+Premium+Protection+NADER+Design',
    images: [
      'https://placehold.co/600x600?text=Minimalist+Black+Phone+Case+Premium+Protection+NADER+Design',
      'https://placehold.co/600x600?text=Phone+Case+On+Device+Lifestyle+Premium+Black+Protection',
      'https://placehold.co/600x600?text=Phone+Case+Corner+Protection+Detail+Premium+Material'
    ],
    inStock: true,
    stockQuantity: 120,
    features: ['Drop Protection', 'Precise Cutouts', 'Wireless Charging Compatible', 'Premium Materials', 'Multiple Models Available']
  },
  {
    id: 'luxury-hoodie-1',
    name: 'Premium Hoodie',
    price: 65,
    category: 'Clothes',
    description: 'Ultra-soft premium cotton hoodie with minimalist design. Features subtle NADER branding and perfect fit. Ideal for casual luxury comfort.',
    image: 'https://placehold.co/600x600?text=Premium+Cotton+Hoodie+Black+Minimalist+NADER+Luxury+Comfort',
    images: [
      'https://placehold.co/600x600?text=Premium+Cotton+Hoodie+Black+Minimalist+NADER+Luxury+Comfort',
      'https://placehold.co/600x600?text=Hoodie+Detail+Premium+Cotton+Soft+Comfort+Minimalist',
      'https://placehold.co/600x600?text=Hoodie+Lifestyle+Casual+Luxury+Premium+Black+Design'
    ],
    inStock: true,
    stockQuantity: 30,
    features: ['Premium Cotton Blend', 'Ultra-Soft Interior', 'Adjustable Hood', 'Kangaroo Pocket', 'Machine Washable']
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getCategories = () => {
  const categories = Array.from(new Set(products.map(product => product.category)));
  return categories.map(category => ({
    category,
    count: products.filter(product => product.category === category).length,
    active: false
  }));
};