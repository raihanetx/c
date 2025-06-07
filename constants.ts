
import { Product, ProductCategoryName, ProductCategory, WhyChooseUsItem, NavLinkItem } from './types';
import {
  CourseIcon, SubscriptionIcon, SoftwareIcon, EbookIcon,
  PremiumQualityIcon, SupportIcon, AffordablePricingIcon, SecurePaymentsIcon,
  HomeIcon, GridIcon, ListIcon, InfoIcon, PolicyIcon, RefundIcon
} from './components/icons';

export const CONTACT_INFO = {
  address: "123 Digital Street, Tech City",
  phone: "+880 1234 567890",
  email: "support@thinkplusbd.com",
  whatsapp: "+8801645-431905", // For FAB
  call: "+8801645-431905",     // For FAB
  fabEmail: "team.thinkplusbd@gmail.com" // For FAB
};

export const IMPORTANT_LINKS: NavLinkItem[] = [
  { label: "About Us", path: "/about", icon: InfoIcon },
  { label: "Terms & Conditions", path: "/terms", icon: PolicyIcon },
  { label: "Privacy Policy", path: "/privacy", icon: PolicyIcon },
  { label: "Refund Policy", path: "/refund", icon: RefundIcon },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { name: ProductCategoryName.COURSE, icon: CourseIcon, countLabel: "3 Premium Courses" },
  { name: ProductCategoryName.SUBSCRIPTION, icon: SubscriptionIcon, countLabel: "8 Premium Services" },
  { name: ProductCategoryName.SOFTWARE, icon: SoftwareIcon, countLabel: "2 Bundle Packages" },
  { name: ProductCategoryName.EBOOK, icon: EbookIcon, countLabel: "1 Digital Guide" },
];

export const ALL_PRODUCTS: Product[] = [
  // Courses
  { id: "course001", name: "Canva Owner Account Creation", category: ProductCategoryName.COURSE, description: "Learn how to create and manage Canva owner accounts professionally...", imageUrl: "https://picsum.photos/seed/course1/400/300", price: 500, details: "Full course on Canva account management, including advanced features and team collaboration." },
  { id: "course002", name: "Digital Product Business with Facebook Ads", category: ProductCategoryName.COURSE, description: "Discover building digital product business using Facebook Advertising...", imageUrl: "https://picsum.photos/seed/course2/400/300", price: 1200, isBestseller: true, details: "Comprehensive guide to marketing digital products using Facebook Ads, from strategy to execution." },
  { id: "course003", name: "Facebook Ads Mastery Course", category: ProductCategoryName.COURSE, description: "Master Facebook advertising with advanced strategies, targeting, and optimization...", imageUrl: "https://picsum.photos/seed/course3/400/300", price: 1500, details: "In-depth training on Facebook Ads, covering pixel setup, audience building, A/B testing, and scaling campaigns." },
  // Subscriptions
  { id: "sub001", name: "Canva Pro Subscription", category: ProductCategoryName.SUBSCRIPTION, description: "Get access to Canva Pro features for your design needs...", imageUrl: "https://picsum.photos/seed/sub1/400/300", price: 150, details: "Monthly access to Canva Pro with all its premium features, templates, and assets." },
  { id: "sub002", name: "Netflix Premium Plan", category: ProductCategoryName.SUBSCRIPTION, description: "Enjoy unlimited movies and TV shows with the Premium subscription...", imageUrl: "https://picsum.photos/seed/sub2/400/300", price: 300, isPopular: true, details: "Netflix Premium plan with 4K streaming and multiple screens." },
  { id: "sub003", name: "Spotify Premium", category: ProductCategoryName.SUBSCRIPTION, description: "Listen to ad-free music with Spotify Premium and enjoy offline playback...", imageUrl: "https://picsum.photos/seed/sub3/400/300", price: 120, details: "Ad-free music streaming, offline downloads, and high-quality audio with Spotify Premium." },
  // Software
  { id: "soft001", name: "Adobe Creative Cloud Suite", category: ProductCategoryName.SOFTWARE, description: "Access full suite of Adobe Creative Cloud apps for professionals...", imageUrl: "https://picsum.photos/seed/soft1/400/300", price: 2500, details: "Full Adobe Creative Cloud suite including Photoshop, Illustrator, Premiere Pro, and more." },
  { id: "soft002", name: "Microsoft Office 365", category: ProductCategoryName.SOFTWARE, description: "Get the latest Microsoft Office applications and cloud services...", imageUrl: "https://picsum.photos/seed/soft2/400/300", price: 800, details: "Microsoft Office 365 subscription with Word, Excel, PowerPoint, Outlook, and OneDrive storage." },
  { id: "soft003", name: "Antivirus Pro Package", category: ProductCategoryName.SOFTWARE, description: "Protect your devices with our comprehensive Antivirus Pro software bundle...", imageUrl: "https://picsum.photos/seed/soft3/400/300", price: 600, isPopular: true, details: "Advanced antivirus protection for multiple devices, including real-time scanning and threat removal." },
  // E-books
  { id: "ebook001", name: "The Digital Marketing Handbook", category: ProductCategoryName.EBOOK, description: "A comprehensive guide to mastering digital marketing strategies in 2024...", imageUrl: "https://picsum.photos/seed/ebook1/400/300", price: 350, details: "Complete guide covering SEO, SEM, content marketing, social media marketing, and email marketing." },
  { id: "ebook002", name: "Passive Income Streams Guide", category: ProductCategoryName.EBOOK, description: "Discover proven methods to build sustainable passive income online...", imageUrl: "https://picsum.photos/seed/ebook2/400/300", price: 250, details: "Explore various passive income models such as affiliate marketing, digital products, and online courses." },
  { id: "ebook003", name: "Freelancing Success Blueprint", category: ProductCategoryName.EBOOK, description: "Your step-by-step blueprint to launching and scaling a successful freelance career...", imageUrl: "https://picsum.photos/seed/ebook3/400/300", price: 300, isBestseller: true, details: "Actionable advice on finding clients, pricing services, managing projects, and growing your freelance business." },
];

export const WHY_CHOOSE_US_ITEMS: WhyChooseUsItem[] = [
  { id: "wc1", title: "Premium Quality", description: "We offer only the highest quality digital products and services.", icon: PremiumQualityIcon },
  { id: "wc2", title: "24/7 Support", description: "Our dedicated support team is always ready to help you.", icon: SupportIcon },
  { id: "wc3", title: "Affordable Pricing", description: "Get premium products at the most competitive prices.", icon: AffordablePricingIcon },
  { id: "wc4", title: "Secure Payments", description: "All transactions are 100% secure and encrypted.", icon: SecurePaymentsIcon },
];

export const MOBILE_NAV_LINKS: NavLinkItem[] = [
  { label: "Home", path: "/", icon: HomeIcon },
  { label: "All Products", path: "/products", icon: GridIcon },
  { label: "Orders", path: "/orders", icon: ListIcon },
];

export const DESKTOP_HEADER_NAV_LINKS: NavLinkItem[] = [
    { label: "All Products", path: "/products", icon: GridIcon },
    { label: "My Orders", path: "/orders", icon: ListIcon },
    // { label: "Menu", path: "#", icon: ThreeDotsIcon }, // Placeholder for potential dropdown
];

export const PAYMENT_METHODS = [
  { id: "nagad", name: "Nagad", instructions: "Please make your payment to Nagad account: 01XXXXXXXXX (Merchant). Use your Order ID as reference. After payment, enter the Transaction ID below." },
  { id: "bkash", name: "bKash", instructions: "Please make your payment to bKash account: 01YYYYYYYYY (Merchant). Use your Order ID as reference. After payment, enter the Transaction ID below." },
];

export const BANNER_IMAGE_URL = "https://picsum.photos/seed/banner/1200/400";
    