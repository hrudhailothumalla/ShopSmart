import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ShoppingCart,
  Route,
  Settings,
  Plus,
  Minus,
  Trash2,
  MapPin,
  DollarSign,
  Clock,
  Camera,
  User,
  Bell,
  Home,
  Store,
  MessageCircle,
  Phone,
  Navigation,
  TrendingUp,
  Leaf,
  Star,
  ChevronRight,
  LogIn,
  UserPlus,
  Send,
  Bot,
  Timer,
  Target,
} from 'lucide-react';
import './App.css';
import SearchBar from './components/ui/search-bar';

// Enhanced mock data
const mockStores = [
  { id: 1, name: 'Walmart Supercenter', brand: 'Walmart', address: '123 Main St, Springfield, IL', distance: 2.1, rating: 4.2, coordinates: { lat: 39.8017, lng: -89.6436 }, hours: { monday: { open: '6:00 AM', close: '11:00 PM' } }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 0.95 },
  { id: 2, name: 'Target', brand: 'Target', address: '456 Oak Ave, Springfield, IL', distance: 1.8, rating: 4.5, coordinates: { lat: 39.7983, lng: -89.6540 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' } }, crowdLevel: 'Low', waitTime: 2, priceMultiplier: 1.05 },
  { id: 3, name: 'Kroger', brand: 'Kroger', address: '789 Pine Rd, Springfield, IL', distance: 3.2, rating: 4.3, coordinates: { lat: 39.8025, lng: -89.6500 }, hours: { monday: { open: '7:00 AM', close: '10:00 PM' } }, crowdLevel: 'High', waitTime: 8, priceMultiplier: 0.90 },
  { id: 4, name: 'Whole Foods Market', brand: 'Whole Foods', address: '321 Elm St, Springfield, IL', distance: 2.7, rating: 4.6, coordinates: { lat: 39.8050, lng: -89.6400 }, hours: { monday: { open: '8:00 AM', close: '9:00 PM' } }, crowdLevel: 'Medium', waitTime: 4, priceMultiplier: 1.25 },
  { id: 5, name: 'Aldi', brand: 'Aldi', address: '1010 S Dirksen Pkwy, Springfield, IL', distance: 3.0, rating: 4.0, coordinates: { lat: 39.7800, lng: -89.6505 }, hours: { monday: { open: '9:00 AM', close: '9:00 PM' } }, crowdLevel: 'Low', waitTime: 3, priceMultiplier: 0.85 },
  { id: 6, name: 'Trader Joe\'s', brand: 'Trader Joe\'s', address: '1201 E Clear Lake Ave, Springfield, IL', distance: 2.5, rating: 4.4, coordinates: { lat: 39.8100, lng: -89.6350 }, hours: { monday: { open: '8:00 AM', close: '9:00 PM' } }, crowdLevel: 'Medium', waitTime: 4, priceMultiplier: 1.10 },
  { id: 7, name: 'Casey\'s General Store', brand: 'Casey\'s', address: '555 Wabash Ave, Springfield, IL', distance: 1.5, rating: 4.1, coordinates: { lat: 39.8070, lng: -89.6502 }, hours: { monday: { open: '6:00 AM', close: '10:00 PM' } }, crowdLevel: 'Low', wait: 1, priceMultiplier: 0.95 },
  { id: 8, name: 'Piggly Wiggly', brand: 'Piggly Wiggly', address: '888 Lincoln St, Springfield, IL', distance: 2.9, rating: 4.3, coordinates: { lat: 39.7990, lng: -89.6420 }, hours: { monday: { open: '7:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 0.90 },
  { id: 9, name: 'Food 4 Less', brand: 'Food 4 Less', address: '234 Market St, Springfield, IL', distance: 3.5, rating: 4.0, coordinates: { lat: 39.7950, lng: -89.6550 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' } }, crowdLevel: 'High', waitTime: 7, priceMultiplier: 0.88 },
  { id: 10, name: 'Hy-Vee', brand: 'Hy-Vee', address: '777 Capital Ave, Springfield, IL', distance: 2.2, rating: 4.5, coordinates: { lat: 39.8030, lng: -89.6450 }, hours: { monday: { open: '7:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 4, priceMultiplier: 1.00 },
  { id: 11, name: 'Meijer', brand: 'Meijer', address: '1500 S Dirksen Pkwy, Springfield, IL', distance: 3.1, rating: 4.2, coordinates: { lat: 39.7820, lng: -89.6480 }, hours: { monday: { open: '6:00 AM', close: '11:00 PM' } }, crowdLevel: 'High', waitTime: 6, priceMultiplier: 0.97 },
  { id: 12, name: 'Safeway', brand: 'Safeway', address: '1600 Stevenson Dr, Springfield, IL', distance: 2.6, rating: 4.1, coordinates: { lat: 39.7880, lng: -89.6390 }, hours: { monday: { open: '7:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 4, priceMultiplier: 1.02 },
  { id: 13, name: 'Stop & Shop', brand: 'Stop & Shop', address: '900 W Lake St, Springfield, IL', distance: 2.4, rating: 4.3, coordinates: { lat: 39.8055, lng: -89.6415 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 1.05 },
  { id: 14, name: 'Giant Food', brand: 'Giant', address: '1200 W Jefferson St, Springfield, IL', distance: 2.9, rating: 4.0, coordinates: { lat: 39.8012, lng: -89.6470 }, hours: { monday: { open: '7:00 AM', close: '11:00 PM' } }, crowdLevel: 'High', waitTime: 7, priceMultiplier: 0.92 },
  { id: 15, name: 'Food Lion', brand: 'Food Lion', address: '2100 S 6th St, Springfield, IL', distance: 3.3, rating: 4.1, coordinates: { lat: 39.7795, lng: -89.6532 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 0.98 },
  { id: 16, name: 'Vons', brand: 'Vons', address: '1800 E Madison St, Springfield, IL', distance: 2.7, rating: 4.2, coordinates: { lat: 39.8075, lng: -89.6398 }, hours: { monday: { open: '7:00 AM', close: '10:00 PM' } }, crowdLevel: 'Low', waitTime: 3, priceMultiplier: 1.03 },
  { id: 17, name: 'Sprouts Farmers Market', brand: 'Sprouts', address: '1900 E Monroe St, Springfield, IL', distance: 2.8, rating: 4.4, coordinates: { lat: 39.8090, lng: -89.8090 }, hours: { monday: { open: '8:00 AM', out: '9:00 PM' } }, crowdLevel: 'Medium', waitTime: 4, priceMultiplier: 1.10 },
  { id: 18, name: 'Grocery Outlet', brand: 'Grocery Outlet', address: '1700 E Adams St, Springfield, IL', distance: 3.0, rating: 4.0, coordinates: { lat: 39.8035, lng: -89.6385 }, hours: { monday: { open: '9:00 AM', close: '9:00 PM' } }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 0.90 },
  { id: 19, name: 'WinCo Foods', brand: 'WinCo', address: '2000 E Washington St, Springfield, IL', distance: 3.5, rating: 4.3, coordinates: { lat: 39.8060, lng: -89.6340 }, hours: { monday: { open: '6:00 AM', close: '11:00 PM' } }, crowdLevel: 'High', waitTime: 8, priceMultiplier: 0.87 },
  { id: 20, name: 'H-E-B', brand: 'H-E-B', address: '2200 E Carpenter St, Springfield, IL', distance: 3.2, rating: 4.5, coordinates: { lat: 39.8105, lng: -89.6360 }, hours: { monday: { open: '7:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 1.00 },
  { id: 21, name: '7-Eleven', brand: '7-Eleven', address: '1235 S Grand Ave, Springfield, IL', distance: 1.7, rating: 4.0, coordinates: { lat: 39.7992, lng: -89.6485 }, hours: { monday: { open: '24 HRS', close: '24 HRS' } }, crowdLevel: 'Low', waitTime: 1, priceMultiplier: 1.05 },
  { id: 22, name: 'Circle K', brand: 'Circle K', address: '1300 S 5th St, Springfield, IL', distance: 1.8, rating: 4.1, coordinates: { lat: 39.8000, lng: -89.6470 }, hours: { monday: { open: '24 HRS', close: '24 HRS' }, }, crowdLevel: 'Low', waitTime: 2, priceMultiplier: 1.02 },
  { id: 23, name: 'Costco', brand: 'Costco', address: '2500 S Dirksen Pkwy, Springfield, IL', distance: 3.8, rating: 4.6, coordinates: { lat: 39.7780, lng: -89.6490 }, hours: { monday: { open: '10:00 AM', close: '8:30 PM' } }, crowdLevel: 'High', waitTime: 10, priceMultiplier: 1.00 },
  { id: 24, name: 'BJ\'s Wholesale', brand: 'BJ\'s', address: '2600 W Carpenter St, Springfield, IL', distance: 4.0, rating: 4.5, coordinates: { lat: 39.7765, lng: -89.6520 }, hours: { monday: { start: '9:00 AM', end: '9:00 PM' } }, crowdLevel: 'Medium', waitTime: 6, priceMultiplier: 0.98 },
  { id: 25, name: 'Giant', brand: 'Giant Eagle', address: '2700 W Jefferson St, Springfield, IL', distance: 3.9, rating: 4.3, coordinates: { lat: 39.7790, lng: -89.6450 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 1.02 },
  { id: 26, name: 'Vons Market', brand: 'Vons', address: '3000 W Adams St, Springfield, IL', distance: 3.6, rating: 4.2, coordinates: { lat: 39.7805, lng: -89.6450 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' } }, crowdLevel: 'Low', waitTime: 3, priceMultiplier: 1.05 },
  { id: 27, name: 'Hannaford', brand: 'Hannaford', address: '2900 W Monroe St, Springfield, IL', distance: 3.7, rating: 4.1, coordinates: { lat: 39.7820, lng: -89.6450 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 4, priceMultiplier: 1.00 },
  { id: 28, name: 'Fresh Thyme', brand: 'Fresh Thyme', address: '3000 W Madison St, Springfield, IL', distance: 3.5, rating: 4.4, coordinates: { lat: 39.7835, lng: -89.6450 }, hours: { monday: { open: '8:00 AM', close: '9:00 PM' } }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 1.10 },
  { id: 29, name: 'Ralphs', brand: 'Ralphs', address: '3100 W Washington St, Springfield, IL', distance: 4.0, rating: 4.3, coordinates: { lat: 39.7850, lng: -89.6450 }, hours: { monday: { open: '7:00 AM', close: '11:00 PM' } }, crowdLevel: 'High', waitTime: 7, priceMultiplier: 1.00 },
  { id: 30, name: 'Safeway Market', brand: 'Safeway', address: '3200 W Jefferson St, Springfield, IL', distance: 3.8, rating: 4.2, coordinates: { lat: 39.7865, lng: -89.6450 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' } }, kind: 'Medium', waitTime: 4, priceMultiplier: 1.00 },
  { id: 31, name: 'Lucky Supermarket', brand: 'Lucky', address: '3300 W Adams St, Springfield, IL', distance: 4.1, rating: 4.1, coordinates: { lat: 39.7880, lng: -89.6450 }, hours: { monday: { open: '7:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 0.98 },
  { id: 32, name: 'Pavilions', brand: 'Pavilions', address: '3400 W Monroe St, Springfield, IL', distance: 3.9, rating: 4.2, coordinates: { lat: 39.7895, lng: -89.6450 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' } }, crowdLevel: 'Low', waitTime: 3, priceMultiplier: 1.05 },
  { id: 33, name: 'Grocery Warehouse', brand: 'Grocery Warehouse', address: '3500 W Madison St, Springfield, IL', distance: 4.0, rating: 4.3, coordinates: { lat: 39.7910, lng: -89.6450 }, hours: { monday: { open: '7:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 0.97 },
  { id: 34, name: 'FoodMax', brand: 'FoodMax', address: '3600 W Washington St, Springfield, IL', distance: 4.2, rating: 4.1, coordinates: { lat: 39.7925, lng: -89.6450 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' } }, crowdLevel: 'Medium', waitTime: 4, priceMultiplier: 0.99 },
  { id: 35, name: 'Lucky\'s Market', brand: 'Lucky\'s', address: '3700 W Jefferson St, Springfield, IL', distance: 4.3, rating: 4.4, coordinates: { lat: 39.7940, lng: -89.6450 }, hours: { monday: { open: '8:00 AM', close: '10:00 PM' }, }, crowdLevel: 'Medium', waitTime: 5, priceMultiplier: 1.05 },
  { id: 36, name: 'SuperValu', brand: 'SuperValu', address: '3800 W Adams St, Springfield, IL', distance: 4.1, rating: 4.2, coordinates: { lat: 39.7955, lng: -89.6450 }, hours: { monday: { open: '7:00 AM', close: '10:00 PM' } }, crowdLevel: 'Low', waitTime: 3, priceMultiplier: 1.00 }
];

const mockProducts = [
  { id: 1, name: 'Milk', brand: 'Great Value', size: '1 gallon', category: 'Dairy', basePrice: 3.49, image: '/api/placeholder/100/100' },
  { id: 2, name: 'Bread', brand: 'Wonder', size: '20 oz loaf', category: 'Bakery', basePrice: 2.99, image: '/api/placeholder/100/100' },
  { id: 3, name: 'Carrots', brand: 'Organic Valley', size: '2 lbs bag', category: 'Produce', basePrice: 1.89, image: '/api/placeholder/100/100' },
  { id: 4, name: 'Bananas', brand: 'Chiquita', size: '1 lb', category: 'Produce', basePrice: 0.59, image: '/api/placeholder/100/100' },
  { id: 5, name: 'Apples', brand: 'Gala', size: '3 lbs', category: 'Produce', basePrice: 2.49, image: '/api/placeholder/100/100' },
  { id: 6, name: 'Chicken Breast', brand: 'Tyson', size: '2 lbs', category: 'Meat', basePrice: 5.99, image: '/api/placeholder/uploads/chicken.png' },
  { id: 7, name: 'Yogurt', brand: 'Dannon', size: '6 pack', category: 'Dairy', basePrice: 4.99, image: '/api/placeholder/100/100' },
  { id: 8, name: 'Pasta', brand: 'Barilla', size: '1 lb', category: 'Pantry', basePrice: 1.99, image: '/api/placeholder/100/100' },
  { id: 9, name: 'Rice', brand: 'Uncle Ben\'s', size: '2 lbs', category: 'Pantry', basePrice: 3.49, image: '/api/placeholder/100/100' },
  { id: 10, name: 'Tomatoes', brand: 'Local Farm', size: '2 lbs', category: 'Produce', basePrice: 2.99, image: '/api/placeholder/100/100' },
  { id: 11, name: 'Cheese', brand: 'Kraft', size: '8 oz', category: 'Dairy', basePrice: 4.49, image: '/api/placeholder/100/100' },
  { id: 12, name: 'Orange Juice', brand: 'Tropicana', size: '64 oz', category: 'Beverages', basePrice: 3.99, image: '/api/placeholder/100/100' },
  { id: 13, name: 'Eggs', brand: 'Eggland\'s Best', size: '12 count', category: 'Dairy', basePrice: 2.99, image: '/api/placeholder/100/100' },
  { id: 14, name: 'Butter', brand: 'Land O\'Lakes', size: '1 lb', category: 'Dairy', basePrice: 3.49, image: '/api/placeholder/100/00' },
  { id: 15, name: 'Ground Beef', brand: 'Local Farm', size: '1 lb', category: 'Meat', basePrice: 4.99, image: '/api/placeholder/100/100' },
  { id: 16, name: 'Lettuce', brand: 'Fresh Garden', size: '1 head', category: 'Produce', basePrice: 1.49, image: '/api/placeholder/100/100' },
  { id: 17, name: 'Cereal', brand: 'Kellogg', size: '18 oz', category: 'Pantry', basePrice: 3.99, image: '/api/placeholder/100/100' },
  { id: 18, name: 'Peanut Butter', brand: 'Jif', size: '16 oz', category: 'Pantry', basePrice: 2.99, image: '/api/placeholder/100/100' },
  { id: 19, name: 'Strawberries', brand: 'Driscoll', size: '1 lb', category: 'Produce', basePrice: 3.99, image: '/api/placeholder/100/100' },
  { id: 20, name: 'Bagels', brand: 'Thomas', size: '6 pack', category: 'Bakery', basePrice: 2.49, image: '/api/placeholder/100/100' },
  { id: 21, name: 'Spinach', brand: 'Fresh Garden', size: '1 lb', category: 'Produce', basePrice: 2.99, image: '/api/placeholder/100/100' },
  { id: 22, name: 'Soda', brand: 'Coca-Cola', size: '12 pack', category: 'Beverages', basePrice: 5.49, image: '/api/placeholder/100/100' },
  { id: 23, name: 'Chips', brand: 'Lay\'s', size: '10 oz', category: 'Snacks', image: '/api/placeholder/100/100' },
  { id: 24, name: 'Tomato Soup', brand: 'Campbell\'s', size: '10.7 oz', category: 'Pantry', basePrice: 1.99, image: '/api/placeholder/100/100' },
  { id: 25, name: 'Ice Cream', brand: 'Ben & Jerry\'s', size: '1 pint', category: 'Desserts', basePrice: 4.99, image: '/api/placeholder/100/100' },
  { id: 26, name: 'Pork Chops', brand: 'Smithfield', size: '1 lb', category: 'Meat', basePrice: 3.99, image: '/api/placeholder/100/100' },
  { id: 27, name: 'Cucumbers', brand: 'Local Farm', size: '1 lb', category: 'Produce', basePrice: 1.29, image: '/api/placeholder/100/100' },
  { id: 28, name: 'Onions', brand: 'Vidalia', size: '2 lbs', category: 'Produce', basePrice: 1.99, image: '/api/placeholder/100/100' },
  { id: 29, 'name': 'Garlic', 'brand': 'Spice World', 'size': '1 head', 'category': 'Produce', 'basePrice': 0.99, 'image': '/api/placeholder/100/100' },
  { id: 30, 'name': 'Potatoes', 'brand': 'Russet', 'size': '5 lbs', 'category': 'Produce', 'basePrice': 3.49, 'image': '/api/placeholder/100/100' },
  { id: 31, 'name': 'Muffins', 'brand': 'Dunkin', 'size': '4 pack', 'category': 'Bakery', 'basePrice': 3.99, 'image': '/api/placeholder/100/100' },
  { id: 32, 'name': 'Tomato Soup', 'brand': 'Campbell', 'size': '10.5 oz', 'category': 'Pantry', 'basePrice': 1.49, 'image': '/api/placeholder/100/100' },
  { id: 33, 'name': 'Green Beans', 'brand': 'Del Monte', 'size': '15 oz', 'category': 'Produce', 'basePrice': 1.29, 'image': '/api/placeholder/100/100' },
  { id: 34, 'name': 'Frozen Pizza', 'brand': 'DiGiorno', 'size': '23.5 oz', 'category': 'Frozen', 'basePrice': 5.99, 'image': '/api/placeholder/100/100' },
  { id: 35, 'name': 'Cantaloupe', 'brand': 'Fresh Farms', 'size': '1 each', 'category': 'Produce', 'basePrice': 2.99, 'image': '/api/placeholder/100/100' },
  { id: 36, 'name': 'Watermelon', 'brand': 'Seedless', 'size': '1 each', 'category': 'Produce', 'basePrice': 4.99, 'image': '/api/placeholder/100/100' },
  { id: 37, 'name': 'Grapes', 'brand': 'Red Globe', 'size': '1 lb', 'category': 'Produce', 'basePrice': 3.99, 'image': '/api/placeholder/100/100' },
  { id: 38, 'name': 'Broccoli', 'brand': 'Green Giant', 'size': '1 lb', 'category': 'Produce', 'basePrice': 2.49, 'image': '/api/placeholder/100/100' },
  { id: 39, 'name': 'Salmon', 'brand': 'Fresh Catch', 'size': '1 lb', 'category': 'Meat', 'basePrice': 9.99, 'image': '/api/placeholder/100/100' },
  { id: 40, 'name': 'Avocado', 'brand': 'Organic', 'size': '1 each', 'category': 'Produce', 'basePrice': 1.79, 'image': '/api/placeholder/100/100' },
  { id: 41, 'name': 'Oranges', 'brand': 'Sunkist', 'size': '3 lbs', 'category': 'Produce', 'basePrice': 3.49, 'image': '/api/placeholder/100/100' },
  { id: 42, 'name': 'Pears', 'brand': 'Green Delish', 'size': '2 lbs', 'category': 'Produce', 'basePrice': 2.79, 'image': '/api/placeholder/100/100' },
  { id: 43, 'name': 'Peppers', 'brand': 'Colorful', 'size': '1 each', 'category': 'Produce', 'basePrice': 1.29, 'image': '/etc/apps/assets/images/red_pepper.png' },
  { id: 44, 'name': 'Mushrooms', 'brand': 'Organic', 'size': '8 oz', 'category': 'Produce', 'basePrice': 2.99, 'image': '/api/placeholder/100/100' },
  { id: 45, 'name': 'Corn', 'brand': 'Sweet Harvest', 'size': '4 ears', 'category': 'Produce', 'basePrice': 3.99, 'image': '/api/placeholder/100/100' },
  { id: 46, 'name': 'Blueberries', 'brand': 'Driscoll', 'size': '6 oz', 'category': 'Produce', 'basePrice': 3.49, 'image': '/home/user/app_data/blueberries.jpg' },
  { id: 47, 'name': 'Raspberries', 'brand': 'Driscoll', 'size': '6 oz', 'category': 'Produce', 'basePrice': 3.99, 'image': '/api/placeholder/100/100' },
  { id: 48, 'name': 'Blackberries', 'brand': 'Driscoll', 'size': '6 oz', 'category': 'Produce', 'basePrice': 3.79, 'image': '/api/placeholder/100/100' },
  { id: 49, 'name': 'Cherries', 'brand': 'Bing', 'size': '1 lb', 'category': 'Produce', 'basePrice': 4.99, 'image': '/api/placeholder/100/100' },
  { id: 50, 'name': 'Lemons', 'brand': 'Sunkist', 'size': '2 lbs', 'category': 'Produce', 'basePrice': 2.99, 'image': '/api/placeholder/100/100' },
  { id: 51, 'name': 'Limes', 'brand': 'Persian', 'size': '1 lb', 'category': 'Produce', 'basePrice': 1.99, 'image': '/api/placeholder/100/100' },
  { id: 52, 'name': 'Mangoes', 'brand': 'Honey', 'size': '1 each', 'category': 'Produce', 'basePrice': 1.99, 'image': '/api/placeholder/100/100' },
  { id: 53, 'name': 'Pineapple', 'brand': 'Dole', 'size': '1 each', 'category': 'Produce', 'basePrice': 3.99, 'image': '/api/placeholder/100/100' },
  { id: 54, 'name': 'Kiwi', 'brand': 'Zespri', 'size': '6 pack', 'category': 'Produce', 'basePrice': 4.49, 'image': '/api/placeholder/100/100' },
  { id: 55, 'name': 'Plums', 'brand': 'Black Splendor', 'size': '1 lb', 'category': 'Produce', 'basePrice': 2.49, 'image': '/api/placeholder/100/100' },
  { id: 56, 'name': 'Peaches', 'brand': 'Georgia Belle', 'size': '1 lb', 'category': 'Produce', 'basePrice': 2.99, 'image': '/api/placeholder/100/100' },
  { id: 57, 'name': 'Apricots', 'brand': 'Royal Blenheim', 'size': '1 lb', 'category': 'Produce', 'basePrice': 3.49, 'image': '/api/placeholder/100/100' },
  { id: 58, 'name': 'Pomegranates', 'brand': 'Wonderful', 'size': '1 each', 'category': 'Produce', 'basePrice': 3.99, 'image': '/api/placeholder/100/100' },
  { id: 59, 'name': 'Dates', 'brand': 'Medjool', 'size': '1 lb', 'category': 'Produce', 'basePrice': 5.99, 'image': '/api/placeholder/100/100' },
  { id: 60, 'name': 'Figs', 'brand': 'Black Mission', 'size': '1 lb', 'category': 'Produce', 'basePrice': 4.99, 'image': '/api/placeholder/100/100' },
  { id: 61, 'name': 'Artichokes', 'brand': 'Green Globe', 'size': '1 each', 'category': 'Produce', 'basePrice': 2.49, 'image': '/api/placeholder/100/100' },
  { id: 66, 'name': 'Asparagus', 'brand': 'Fresh', 'size': '1 lb', 'category': 'Produce', 'basePrice': 3.99, 'image': '/api/placeholder/100/100' },
  { id: 67, 'name': 'Brussels Sprouts', 'brand': 'Organic', 'size': '1 lb', 'category': 'Produce', 'basePrice': 3.49, 'image': '/api/placeholder/100/100' },
  { id: 68, 'name': 'Cabbage', 'brand': 'Green', 'size': '1 head', 'category': 'Produce', 'basePrice': 1.99, 'image': '/api/placeholder/100/100' },
  { id: 69, 'name': 'Cauliflower', 'brand': 'White', 'size': '1 head', 'category': 'Produce', 'basePrice': 2.99, 'image': '/etc/apps/images/cauliflower.jpg' },
  { id: 70, 'name': 'Celery', 'brand': 'Fresh', 'size': '1 bunch', 'category': 'Produce', 'basePrice': 1.79, 'image': '/api/placeholder/100/100' },
  { id: 71, 'name': 'Collard Greens', 'brand': 'Organic', 'size': '1 bunch', 'category': 'Produce', 'basePrice': 2.99, 'image': '/api/placeholder/100/100' },
  { id: 72, 'name': 'Corn on the Cob', 'brand': 'Sweet', 'size': '1 each', 'category': 'Produce', 'basePrice': 0.79, 'image': '/api/placeholder/images/corn.jpg' },
  { id: 73, 'name': 'Eggplant', 'brand': 'Organic', 'size': '1 each', 'category': 'Produce', 'basePrice': 2.49, 'image': '/api/docs/images/eggplant.jpg' },
  { id: 74, 'name': 'Kale', 'brand': 'Organic', 'size': '1 bunch', 'category': 'Produce', 'basePrice': 2.99, 'image': '/api/placeholder/kale.jpg' },
  { id: 75, 'name': 'Leeks', 'brand': 'Fresh', 'size': '1 bunch', 'category': 'Produce', 'basePrice': 3.49, 'image': '/api/placeholder/leeks.jpg' },
  { id: 76, 'name': 'Okra', 'brand': 'Organic', 'size': '1 lb', 'category': 'Produce', 'basePrice': 3.99, 'image': '/api/placeholder/okra.jpg' },
  { id: 77, 'name': 'Peas', 'brand': 'Sweet', 'size': '1 lb', 'category': 'Produce', 'basePrice': 2.99, 'image': '/api/placeholder/peas.jpg' },
  { id: 78, 'name': 'Radishes', 'brand': 'Fresh', 'size': '1 bunch', 'category': 'Produce', 'basePrice': 1.49, 'image': '/api/placeholder/radishes.jpg' },
  { id: 79, 'name': 'Spinach', 'brand': 'Organic', 'size': '1 lb', 'category': 'Produce', 'basePrice': 2.99, 'image': '/api/placeholder/spinach.jpg' },
  { id: 80, 'name': 'Sweet Potatoes', 'brand': 'Organic', 'size': '1 lb', 'category': 'Produce', 'basePrice': 1.99, 'image': '/api/placeholder/sweet_potatoes.jpg' },
  { id: 81, 'name': 'Zucchini', 'brand': 'Organic', 'size': '1 lb', 'category': 'Produce', 'basePrice': 1.79, 'image': '/api/placeholder/zucchini.jpg' },
  { id: 82, 'name': 'Bell Pepper', 'brand': 'Colorful', 'size': '1 each', 'category': 'Produce', 'basePrice': 1.29, 'image': '/mnt/data/bell_pepper.jpg' },
  { id: 83, 'name': 'Cucumber', 'brand': 'Fresh', 'size': '1 each', 'category': 'Produce', 'basePrice': 0.99, 'image': '/mnt/data/cucumber.jpg' },
  { id: 84, 'name': 'Lettuce', 'brand': 'Crisp', 'size': '1 head', 'category': 'Produce', 'basePrice': 1.49, 'image': '/mnt/data/lettuce.jpg' },
  { id: 85, 'name': 'Tomato', 'brand': 'Vine Ripe', 'size': '1 lb', 'category': 'Produce', 'basePrice': 2.49, 'image': '/mnt/data/tomato.jpg' },
  { id: 86, 'name': 'Onion', 'brand': 'Yellow', 'size': '1 lb', 'category': 'Produce', 'basePrice': 0.99, 'image': '/mnt/data/onion.jpg' },
  { id: 87, 'name': 'Carrot', 'brand': 'Sweet', 'size': '1 lb', 'category': 'Produce', 'basePrice': 1.29, 'image': '/mnt/data/carrot.jpg' },
  { id: 88, 'name': 'Broccoli', 'brand': 'Fresh', 'size': '1 lb', 'category': 'Produce', 'basePrice': 1.79, 'image': '/mnt/data/broccoli.jpg' },
  { id: 89, 'name': 'Corn', 'brand': 'Sweet', 'size': '1 each', 'category': 'Produce', 'basePrice': 0.79, 'image': '/mnt/data/corn.jpg' },
  { id: 90, 'name': 'Potato', 'brand': 'Russet', 'size': '5 lbs', 'category': 'Produce', 'basePrice': 3.99, 'image': '/mnt/data/potato.jpg' },
  { id: 91, 'name': 'Apple', 'brand': 'Gala', 'size': '1 each', 'category': 'Fruit', 'basePrice': 0.79, 'image': '/mnt/data/apple.jpg' },
  { id: 92, 'name': 'Banana', 'brand': 'Chiquita', 'size': '1 lb', 'category': 'Fruit', 'basePrice': 0.69, 'image': '/mnt/data/banana.jpg' },
  { id: 93, 'name': 'Orange', 'brand': 'Sunkist', 'size': '1 each', 'category': 'Fruit', 'basePrice': 0.89, 'image': '/mnt/data/orange.jpg' },
  { id: 94, 'name': 'Grape', 'brand': 'Red Globe', 'size': '1 lb', 'category': 'Fruit', 'basePrice': 2.99, 'image': '/mnt/data/grape.jpg' },
  { id: 95, 'name': 'Strawberry', 'brand': 'Driscoll', 'size': '1 lb', 'category': 'Fruit', 'basePrice': 3.99, 'image': '/mnt/py/strawberry.jpg' },
  { id: 96, 'name': 'Blueberry', 'brand': 'Driscoll', 'size': '6 oz', 'category': 'Fruit', 'basePrice': 3.49, 'image': '/mnt/py/blueberry.jpg' },
  { id: 97, 'name': 'Raspberry', 'brand': 'Driscoll', 'size': '6 oz', 'category': 'Fruit', 'basePrice': 3.99, 'image': '/mnt/py/raspberry.jpg' },
  { id: 98, 'name': 'Mango', 'brand': 'Honey', 'size': '1 each', 'category': 'Fruit', 'basePrice': 1.99, 'image': '/mnt/py/mango.jpg' },
  { id: 99, 'name': 'Pineapple', 'brand': 'Dole', 'size': '1 each', 'category': 'Fruit', 'basePrice': 3.99, 'image': '/mnt/py/pineapple.jpg' },
  { id: 100, 'name': 'Watermelon', 'brand': 'Seedless', 'size': '1 each', 'category': 'Fruit', 'basePrice': 4.99, 'image': '/mnt/py/watermelon.jpg' },
  { id: 101, 'name': 'Milk', 'brand': 'Dairy Fresh', 'size': '1 gallon', 'category': 'Dairy', 'basePrice': 3.29, 'image': '/mnt/py/milk.jpg' },
  { id: 102, 'name': 'Eggs', 'brand': 'Cage Free', 'size': '1 dozen', 'category': 'Dairy', 'basePrice': 2.79, 'image': '/mnt/py/eggs.jpg' },
  { id: 103, 'name': 'Cheese', 'brand': 'Cheddar', 'size': '8 oz', 'category': 'Dairy', 'basePrice': 3.99, 'image': '/mnt/py/cheese.jpg' },
  { id: 104, 'name': 'Yogurt', 'brand': 'Greek', 'size': '5.3 oz', 'category': 'Dairy', 'basePrice': 1.29, 'image': '/mnt/py/yogurt.jpg' },
  { id: 105, 'name': 'Butter', 'brand': 'Salted', 'size': '1 lb', 'category': 'Dairy', 'basePrice': 3.49, 'image': '/mnt/py/butter.jpg' },
  { id: 106, 'name': 'Chicken Breast', 'brand': 'Organic', 'size': '1 lb', 'category': 'Meat', 'basePrice': 6.99, 'image': '/mnt/py/chicken.jpg' },
  { id: 107, 'name': 'Ground Beef', 'brand': 'Grass-fed', 'size': '1 lb', 'category': 'Meat', 'basePrice': 5.99, 'image': '/mnt/py/ground_beef.jpg' },
  { id: 108, 'name': 'Salmon', 'brand': 'Wild-caught', 'size': '6 oz', 'category': 'Meat', 'basePrice': 8.99, 'image': '/mnt/py/salmon.jpg' },
  { id: 109, 'name': 'Pork Chops', 'brand': 'Boneless', 'size': '1 lb', 'category': 'Meat', 'basePrice': 4.99, 'image': '/mnt/py/pork_chops.jpg' },
  { id: 110, 'name': 'Sausage', 'brand': 'Italian', 'size': '1 lb', 'category': 'Meat', 'basePrice': 3.99, 'image': '/mnt/py/sausage.jpg' },
  { id: 111, 'name': 'Bread', 'brand': 'Whole Wheat', 'size': '24 oz', 'category': 'Bakery', 'basePrice': 2.79, 'image': '/mnt/py/bread.jpg' },
  { id: 112, 'name': 'Bagels', 'brand': 'Plain', 'size': '6 count', 'category': 'Bakery', 'basePrice': 2.29, 'image': '/mnt/py/bagels.jpg' },
  { id: 113, 'name': 'Muffins', 'brand': 'Blueberry', 'size': '4 count', 'category': 'Bakery', 'basePrice': 3.49, 'image': '/mnt/py/muffins.jpg' },
  { id: 114, 'name': 'Croissants', 'brand': 'Butter', 'size': '4 count', 'category': 'Bakery', 'basePrice': 4.29, 'image': '/mnt/py/croissants.jpg' },
  { id: 115, 'name': 'Cookies', 'brand': 'Chocolate Chip', 'size': '1 dozen', 'category': 'Bakery', 'basePrice': 3.99, 'image': '/mnt/py/cookies.jpg' },
  { id: 116, 'name': 'Pasta', 'brand': 'Spaghetti', 'size': '1 lb', 'category': 'Pantry', 'basePrice': 1.79, 'image': '/mnt/py/pasta.jpg' },
  { id: 117, 'name': 'Rice', 'brand': 'Basmati', 'size': '2 lb', 'category': 'Pantry', 'basePrice': 3.99, 'image': '/mnt/py/rice.jpg'}, 
  { 'id': 118, 'name': 'Cereal', 'brand': 'Cheerios', 'size': '12 oz', 'category': 'Pantry', 'basePrice': 3.79, 'image': '/mnt/py/cereal.jpg' },
  { 'id': 119, 'name': 'Canned Tomatoes', 'brand': 'Muir Glen', 'size': '28 oz', 'category': 'Pantry', 'basePrice': 2.49, 'image': '/mnt/py/canned_tomatoes.jpg' },
  { 'id': 120, 'name': 'Olive Oil', 'brand': 'Bertolli', 'size': '25 oz', 'category': 'Pantry', 'basePrice': 8.99, 'image': '/mnt/py/olive_oil.jpg' },
  { 'id': 121, 'name': 'Coffee', 'brand': 'Starbucks', 'size': '12 oz', 'category': 'Beverages', 'basePrice': 9.99, 'image': '/mnt/py/coffee.jpg' },
  { 'id': 122, 'name': 'Tea', 'brand': 'Lipton', 'size': '20 count', 'category': 'Beverages', 'basePrice': 3.49, 'image': '/mnt/py/tea.jpg' },
  { 'id': 123, 'name': 'Juice', 'brand': 'Minute Maid', 'size': '59 oz', 'category': 'Beverages', 'basePrice': 2.99, 'image': '/mnt/py/juice.jpg' },
  { 'id': 124, 'name': 'Soda', 'brand': 'Coca-Cola', 'size': '12 pack', 'category': 'Beverages', 'basePrice': 6.99, 'image': '/mnt/py/soda.jpg' },
  { 'id': 125, 'name': 'Water', 'brand': 'Dasani', 'size': '24 pack', 'category': 'Beverages', 'basePrice': 4.99, 'image': '/mnt/py/water.jpg' },
  { 'id': 126, 'name': 'Chips', 'brand': 'Lay\'s', 'size': '8 oz', 'category': 'Snacks', 'basePrice': 3.29, 'image': '/mnt/py/chips.jpg' },
  { 'id': 127, 'name': 'Pretzels', 'brand': 'Snyder\'s', 'size': '10 oz', 'category': 'Snacks', 'basePrice': 2.79,  'image': '/mnt/py/pretzels.jpg' },
  { 'id': 128, 'name': 'Popcorn', 'brand': 'Orville Redenbacher', 'size': '6 pack', 'category': 'Snacks', 'basePrice': 4.49, 'image': '/mnt/py/popcorn.jpg' },
  { 'id': 129, 'name': 'Nuts', 'brand': 'Planters', 'size': '10 oz', 'category': 'Snacks', 'basePrice': 5.99, 'image': '/mnt/py/nuts.jpg' },
  { 'id': 130, 'name': 'Candy', 'brand': 'Hershey\'s', 'size': 'standard', 'category': 'Snacks', 'basePrice': 1.99, 'image': '/mnt/py/candy.jpg' },
  { 'id': 131, 'name': 'Ice Cream', 'brand': 'Haagen-Dazs', 'size': '1 pint', 'category': 'Frozen', 'basePrice': 5.49, 'image': '/mnt/py/ice_cream.jpg' },
  { 'id': 132, 'name': 'Frozen Pizza', 'brand': 'DiGiorno', 'size': 'large', 'category': 'Frozen', 'basePrice': 6.99, 'image': '/mnt/py/frozen_pizza.jpg' },
  { 'id': 133, 'name': 'Frozen Vegetables', 'brand': 'Birds Eye', 'size': '12 oz', 'category': 'Frozen', 'basePrice': 2.29, 'image': '/mnt/py/frozen_vegetables.jpg' },
  { 'id': 134, 'name': 'Frozen Fruit', 'brand': 'Dole', 'size': '16 oz', 'category': 'Frozen', 'basePrice': 3.99, 'image': '/mnt/py/frozen_fruit.jpg' },
  { 'id': 135, 'name': 'Frozen Meals', 'brand': 'Healthy Choice', 'size': '1 each', 'category': 'Frozen', 'basePrice': 4.99, 'image': '/mnt/py/frozen_meals.jpg' },
  { 'id': 136, 'name': 'Ground Beef', 'brand': '80/20', 'size': '1 lb', 'category': 'Meat', 'basePrice': 5.49, 'image': '/mnt/py/ground_beef_2.jpg' },
  { 'id': 137, 'name': 'Steak', 'brand': 'Ribeye', 'size': '12 oz', 'category': 'Meat', 'basePrice': 12.99, 'image': '/mnt/py/steak.jpg' },
  { 'id': 138, 'name': 'Pork Loin', 'brand': 'Boneless', 'size': '1.5 lbs', 'category': 'Meat', 'basePrice': 7.99, 'image': '/mnt/py/pork_loin.jpg' },
  { 'id': 139, 'name': 'Sausage Links', 'brand': 'Breakfast', 'size': '12 oz', 'category': 'Meat', 'basePrice': 3.49, 'image': '/mnt/py/sausage_links.jpg' },
  { 'id': 140, 'name': 'Bacon', 'brand': 'Smoked', 'size': '12 oz', 'category': 'Meat', 'basePrice': 4.99, 'image': '/mnt/py/bacon.jpg' },
  { 'id': 141, 'name': 'Deli Meat', 'brand': 'Turkey Breast', 'size': '8 oz', 'category': 'Deli', 'basePrice': 4.29, 'image': '/mnt/py/deli_meat.jpg' },
  { 'id': 142, 'name': 'Deli Cheese', 'brand': 'Provolone', 'size': '8 oz', 'category': 'Deli', 'basePrice': 3.79, 'image': '/mnt/py/deli_cheese.jpg' },
  { 'id': 143, 'name': 'Salad Kit', 'brand': 'Fresh Express', 'size': '10 oz', 'category': 'Produce', 'basePrice': 3.99, 'image': '/mnt/py/salad_kit.jpg' },
  { 'id': 144, 'name': 'Hummus', 'brand': 'Sabra', 'size': '10 oz', 'category': 'Deli', 'basePrice': 3.49, 'image': '/mnt/py/hummus.jpg' },
  { 'id': 145, 'name': 'Guacamole', 'brand': 'Wholly Guacamole', 'size': '8 oz', 'category': 'Deli', 'basePrice': 4.99, 'image': '/mnt/py/guacamole.jpg' },
  { 'id': 146, 'name': 'Salsa', 'brand': 'Pace', 'size': '16 oz', 'category': 'Pantry', 'basePrice': 2.99, 'image': '/mnt/py/salsa.jpg' },
  { 'id': 147, 'name': 'Tortilla Chips', 'brand': 'Mission', 'size': '13 oz', 'category': 'Snacks', 'basePrice': 2.49, 'image': '/mnt/py/tortilla_chips.jpg' },
  { 'id': 148, 'name': 'Crackers', 'brand': 'Ritz', 'size': '10 oz', 'category': 'Snacks', 'basePrice': 2.99, 'image': '/mnt/py/crackers.jpg' },
  { 'id': 149, 'name': 'Cookies', 'brand': 'Oreo', 'size': '15 oz', 'category': 'Snacks', 'basePrice': 3.79, 'image': '/mnt/py/cookies.jpg' },
  { 'id': 150, 'name': 'Ice Cream', 'brand': 'Talenti', 'size': '1 pint', 'category': 'Frozen', 'basePrice': 5.99, 'image': '/mnt/py/ice_cream_2.jpg' },
  { 'id': 151, 'name': 'Frozen Pizza', 'brand': 'California Pizza Kitchen', 'size': 'large', 'category': 'Frozen', 'basePrice': 7.99, 'image': '/mnt/py/frozen_pizza_2.jpg' },
  { 'id': 152, 'name': 'Frozen Burrito', 'brand': 'Amy\'s', 'size': '1 each', 'category': 'Frozen', 'basePrice': 3.49, 'image': '/mnt/py/frozen_burrito.jpg' },
  { 'id': 153, 'name': 'Frozen Fries', 'brand': 'Ore-Ida', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 3.29, 'image': 'm/n/frozen_fries.jpg' },
  { 'id': 154, 'name': 'Frozen Chicken', 'brand': 'Tyson', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 7.99, 'image': 'm/n/frozen_chicken.jpg' },
  { 'id': 155, 'name': 'Frozen Fish', 'brand': 'Gorton\'s', 'size': '1.5 lbs', 'category': 'Frozen', 'basePrice': 6.99, 'image': 'm/n/frozen_fish.jpg' },
  { 'id': 156, 'name': 'Frozen Berries', 'brand': 'Dole', 'size': '12 oz', 'category': 'Frozen', 'basePrice': 3.99, 'image': 'm/n/frozen_berries.jpg' },
  { 'id': 157, 'name': 'Frozen Meal', 'brand': 'Lean Cuisine', 'size': '1 each', 'category': 'Frozen', 'basePrice': 4.49, 'image': '/mnt/py/frozen_meal.jpg' },
  { 'id': 158, 'name': 'Frozen Dessert', 'brand': 'Marie Callender\'s', 'size': '1 each', 'category': 'Frozen', 'basePrice': 5.99, 'image': '/mnt/py/frozen_dessert.jpg' },
  { 'id': 159, 'name': 'Frozen Pizza Rolls', 'brand': 'Totino\'s', 'size': '40 count', 'category': 'Frozen', 'basePrice': 4.79, 'image': '/mnt/py/pizza_rolls.jpg' },
  { 'id': 160, 'name': 'Frozen Waffles', 'brand': 'Eggo', 'size': '10 count', 'category': 'Frozen', 'basePrice': 2.99, 'image': '/mnt/py/waffles.jpg' },
  { 'id': 161, 'name': 'Frozen Pancakes', 'brand': 'Hungry Jack', 'size': '12 count', 'category': 'Frozen', 'basePrice': 3.49, 'image': '/mnt/py/pancakes.jpg' },
  { 'id': 162, 'name': 'Frozen Hash Browns', 'brand': 'Ore-Ida', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 2.79, 'image': '/mnt/py/hash_browns.jpg' },
  { 'id': 163, 'name': 'Frozen Breakfast Sandwich', 'brand': 'Jimmy Dean', 'size': '4 count', 'category': 'Frozen', 'basePrice': 5.99, 'image': '/mnt/py/breakfast_sandwich.jpg' },
  { 'id': 164, 'name': 'Frozen Burrito Bowl', 'brand': 'Healthy Choice', 'size': '1 each', 'category': 'Frozen', 'basePrice': 4.99, 'image': '/mnt/py/burrito_bowl.jpg' },
  { 'id': 165, 'name': 'Frozen Chicken Strips', 'brand': 'Tyson', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 7.99, 'image': '/mnt/py/chicken_strips.jpg' },
  { 'id': 166, 'name': 'Frozen Pot Pie', 'brand': 'Marie Callender\'s', 'size': '1 each', 'category': 'Frozen', 'basePrice': 3.99, 'image': '/mnt/py/pot_pie.jpg' },
  { 'id': 167, 'name': 'Frozen Fruit Bar', 'brand': 'Outshine', 'size': '6 count', 'category': 'Frozen', 'basePrice': 4.29, 'image': '/mnt/py/fruit_bar.jpg' },
  { 'id': 168, 'name': 'Frozen Smoothie Mix', 'brand': 'Dole', 'size': '16 oz', 'category': 'Frozen', 'basePrice': 4.99, 'image': '/mnt/py/smoothie_mix.jpg' },
  { 'id': 169, 'name': 'Frozen Appetizers', 'brand': 'TGI Fridays', 'size': '10 oz', 'category': 'Frozen', 'basePrice': 6.99, 'image': '/mnt/py/appetizers.jpg' },
  { 'id': 170, 'name': 'Frozen Dessert Bars', 'brand': 'Klondike', 'size': '6 count', 'category': 'Frozen', 'basePrice': 5.49, 'image': '/mnt/py/dessert_bars.jpg' },
  { 'id': 171, 'name': 'Frozen Breakfast Bowl', 'brand': 'Jimmy Dean', 'size': '1 each', 'category': 'Frozen', 'basePrice': 4.99, 'image': '/mnt/py/breakfast_bowl.jpg' },
  { 'id': 172, 'name': 'Frozen Pizza Bites', 'brand': 'Totino\'s', 'size': '60 count', 'category': 'Frozen', 'basePrice': 4.79, 'image': '/mnt/py/pizza_bites.jpg' },
  { 'id': 173, 'name': 'Frozen Waffle Fries', 'brand': 'Ore-Ida', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 3.29, 'image': '/mnt/py/waffle_fries.jpg' },
  { 'id': 174, 'name': 'Frozen Chicken Wings', 'brand': 'Tyson', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 7.99, 'image': '/mnt/py/chicken_wings.jpg' },
  { 'id': 175, 'name': 'Frozen Fish Fillets', 'brand': 'Gorton\'s', 'size': '1.5 lbs', 'category': 'Frozen', 'basePrice': 6.99, 'image': '/mnt/py/fish_fillets.jpg' },
  { 'id': 176, 'name': 'Frozen Fruit Medley', 'brand': 'Dole', 'size': '16 oz', 'category': 'Frozen', 'basePrice': 3.99, 'image': '/mnt/py/fruit_medley.jpg' },
  { 'id': 177, 'name': 'Frozen Dessert Pizza', 'brand': 'Freschetta', 'size': '1 each', 'category': 'Frozen', 'basePrice': 5.99, 'image': '/mnt/py/dessert_pizza.jpg' },
  { 'id': 178, 'name': 'Frozen Breakfast Burrito', 'brand': 'Amy\'s', 'size': '1 each', 'category': 'Frozen', 'basePrice': 3.49, 'image': '/mnt/py/breakfast_burrito.jpg' },
  { 'id': 179, 'name': 'Frozen Chicken Nuggets', 'brand': 'Tyson', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 7.99, 'image': '/mnt/py/chicken_nuggets.jpg' },
  { 'id': 180, 'name': 'Frozen Fish Sticks', 'brand': 'Gorton\'s', 'size': '1.5 lbs', 'category': 'Frozen', 'basePrice': 6.99, 'image': '/mnt/py/fish_sticks.jpg' },
  { 'id': 181, 'name': 'Frozen Fruit Smoothie', 'brand': 'Dole', 'size': '16 oz', 'category': 'Frozen', 'basePrice': 3.99, 'image': '/mnt/py/fruit_smoothie.jpg' },
  { 'id': 182, 'name': 'Frozen Dessert Bites', 'brand': 'Marie Callender\'s', 'size': '1 box', 'category': 'Frozen', 'basePrice': 5.99, 'image': '/mnt/py/dessert_bites.jpg' },
  { 'id': 183, 'name': 'Frozen Breakfast Sandwich', 'brand': 'Jimmy Dean', 'size': '1 each', 'category': 'Frozen', 'basePrice': 5.99, 'image': '/mnt/uploads/image_breakfast_sandwich.jpg' },
  { 'id': 184, 'name': 'Frozen Chicken Patty', 'brand': 'Tyson', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 7.99, 'image': '/mnt/uploads/chicken_patty.jpg' },
  { 'id': 185, 'name': 'Frozen Fish Fillet', 'brand': 'Gorton\'s', 'size': '1.5 lbs', 'category': 'Frozen', 'basePrice': 6.99, 'image': '/mnt/uploads/fish_fillet.jpg' },
  { 'id': 186, 'name': 'Frozen Fruit Blend', 'brand': 'Dole', 'size': '16 oz', 'category': 'Frozen', 'basePrice': 3.99, 'image': '/mnt/uploads/fruit_blend.jpg' },
  { 'id': 187, 'name': 'Frozen Dessert Bar', 'brand': 'Klondike', 'size': '6 count', 'category': 'Frozen', 'basePrice': 5.49, 'image': '/mnt/uploads/dessert_bar.jpg' },
  { 'id': 188, 'name': 'Frozen Breakfast Burrito', 'brand': 'Amy\'s', 'size': '1 each', 'category': 'Frozen', 'basePrice': 3.49, 'image': '/mnt/uploads/breakfast_burrito.jpg' },
  { 'id': 189, 'name': 'Frozen Chicken Strips', 'brand': 'Tyson', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 7.99, 'image': '/mnt/uploads/chicken_strips.jpg' },
  { 'id': 190, 'name': 'Frozen Fish Fillets', 'brand': 'Gorton\'s', 'size': '1.5 lbs', 'category': 'Frozen', 'basePrice': 6.99, 'image': '/mnt/uploads/fish_fillets.jpg' },
  { 'id': 191, 'name': 'Frozen Fruit Medley', 'brand': 'Dole', 'size': '16 oz', 'category': 'Frozen', 'basePrice': 3.99, 'image': '/mnt/uploads/fruit_medley.jpg' },
  { 'id': 192, 'name': 'Frozen Dessert Bar', 'brand': 'Klondike', 'size': '6 count', 'category': 'Frozen', 'basePrice': 5.49, 'image': '/mnt/uploads/dessert_bar.jpg' },
  { 'id': 193, 'name': 'Frozen Breakfast Bowl', 'brand': 'Jimmy Dean', 'size': '1 each', 'category': 'Frozen', 'basePrice': 4.99, 'image': '/mnt/uploads/breakfast_bowl.jpg' },
  { 'id': 194, 'name': 'Frozen Chicken Wings', 'brand': 'Tyson', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 7.99, 'image': '/mnt/uploads/chicken_wings.jpg' },
  { 'id': 195, 'name': 'Frozen Fish Sticks', 'brand': 'Gorton\'s', 'size': '1.5 lbs', 'category': 'Frozen', 'basePrice': 6.99, 'image': '/mnt/uploads/fish_sticks.jpg' },
  { 'id': 196, 'name': 'Frozen Fruit Smoothie', 'brand': 'Dole', 'size': '16 oz', 'category': 'Frozen', 'basePrice': 3.99, 'image': '/mnt/uploads/fruit_smoothie.jpg' },
  { 'id': 197, 'name': 'Frozen Dessert Bites', 'brand': 'Marie Callender\'s', 'size': '1 box', 'category': 'Frozen', 'basePrice': 5.99, 'image': '/mnt/uploads/dessert_bites.jpg' },
  { 'id': 198, 'name': 'Frozen Breakfast Sandwich', 'brand': 'Jimmy Dean', 'size': '1 each', 'category': 'Frozen', 'basePrice': 5.99, 'image': '/mnt/uploads/breakfast_sandwich.jpg' },
  { 'id': 199, 'name': 'Frozen Chicken Patty', 'brand': 'Tyson', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 7.99, 'image': '/mnt/uploads/chicken_patty.jpg' },
  { 'id': 200, 'name': 'Frozen Fish Fillet', 'brand': 'Gorton\'s', 'size': '1.5 lbs', 'category': 'Frozen', 'basePrice': 6.99, 'image': '/mnt/uploads/fish_fillet.jpg' },
  { 'id': 201, 'name': 'Frozen Fruit Blend', 'brand': 'Dole', 'size': '16 oz', 'category': 'Frozen', 'basePrice': 3.99, 'image': '/mnt/uploads/fruit_blend.jpg' },
  { 'id': 202, 'name': 'Frozen Dessert Bar', 'brand': 'Klondike', 'size': '6 count', 'category': 'Frozen', 'basePrice': 5.49, 'image': '/mnt/uploads/dessert_bar.jpg' },
  { 'id': 203, 'name': 'Frozen Breakfast Burrito', 'brand': 'Amy\'s', 'size': '1 each', 'category': 'Frozen', 'basePrice': 3.49, 'image': '/mnt/uploads/breakfast_burrito.jpg' },
  { 'id': 204, 'name': 'Frozen Chicken Nuggets', 'brand': 'Tyson', 'size': '2 lbs', 'category': 'Frozen', 'basePrice': 7.99, 'image': '/mnt/uploads/chicken_nuggets.jpg' },
  { 'id': 205, 'name': 'Frozen Fish Sticks', 'brand': 'Gorton\'s', 'size': '1.5 lbs', 'category': 'Frozen', 'basePrice': 6.99, 'image': '/mnt/uploads/fish_sticks.jpg' },
  { 'id': 206, 'name': 'Frozen Fruit Smoothie', 'brand': 'Dole', 'size': '16 oz', 'category': 'Frozen', 'basePrice': 3.99, 'image': '/mnt/uploads/fruit_smoothie.jpg' },
  { 'id': 207, 'name': 'Frozen Dessert Bar', 'brand': 'Klondike', 'size': '6 count', 'category': 'Frozen', 'basePrice': 5.49, 'image': '/mnt/uploads/dessert_bar.jpg' },
];

const landmarks = [
  { name: 'Springfield Park', coordinates: { lat: 39.8000, lng: -89.6500 }, type: 'park' },
  { name: 'Springfield High School', coordinates: { lat: 39.7900, lng: -89.6300 }, type: 'school' },
  { name: 'Mercy Hospital', coordinates: { lat: 39.8150, lng: -89.6450 }, type: 'hospital' },
  { name: 'Capital City Mall', coordinates: { lat: 39.7700, lng: -89.6600 }, type: 'mall' },
  { name: 'Lincoln Presidential Library', coordinates: { lat: 39.7990, lng: -89.6460 }, type: 'landmark' },
  { name: 'Illinois State Capitol', coordinates: { lat: 39.7970, lng: -89.6500 }, type: 'landmark' },
  { name: 'Washington Park', coordinates: { lat: 39.7850, lng: -89.6700 }, type: 'park' },
  { name: 'University of Illinois Springfield', coordinates: { lat: 39.7500, lng: -89.6200 }, type: 'school' },
  { name: 'St. John\'s Hospital', coordinates: { lat: 39.8080, lng: -89.6550 }, type: 'hospital' },
  { name: 'White Oaks Mall', coordinates: { lat: 39.7650, lng: -89.6800 }, type: 'mall' },
];

const PriceService = {
  getProductPrice: (productName, storeId) => {
    const product = mockProducts.find(p => p.name.toLowerCase() === productName.toLowerCase());
    const store = mockStores.find(s => s.id === storeId);
    if (product && store) {
      return (product.basePrice * store.priceMultiplier).toFixed(2);
    }
    return 'N/A';
  },
  getCheapestProduct: (productName) => {
    const product = mockProducts.find(p => p.name.toLowerCase() === productName.toLowerCase());
    if (!product) return null;

    let cheapestPrice = Infinity;
    let cheapestStore = null;

    mockStores.forEach(store => {
      const price = (product.basePrice * store.priceMultiplier);
      if (price < cheapestPrice) {
        cheapestPrice = price;
        cheapestStore = store;
      }
    });
    return cheapestStore ? { store: cheapestStore, price: cheapestPrice.toFixed(2) } : null;
  },
  isProductInStock: (productName, storeName) => {
    // This is a mock implementation. In a real app, this would query a backend.
    const product = mockProducts.find(p => p.name.toLowerCase() === productName.toLowerCase());
    const store = mockStores.find(s => s.name.toLowerCase().includes(storeName.toLowerCase()));

    if (product && store) {
      // Simulate stock based on product ID and store ID
      // For demonstration, let's say products with even IDs are always in stock
      // and products with odd IDs are in stock 70% of the time.
      const isInStock = product.id % 2 === 0 || Math.random() < 0.7;
      return isInStock ? 'Yes' : 'No';
    }
    return 'N/A';
  }
};

const UserDataService = {
  resetUserData: () => {
    localStorage.removeItem('shoppingList');
    localStorage.removeItem('orderHistory');
    localStorage.removeItem('totalMoneySaved');
    localStorage.removeItem('totalMilesTraveled');
    localStorage.removeItem('achievements');
    localStorage.removeItem('shoppingStreak');
    localStorage.removeItem('favoriteStore');
    localStorage.removeItem('co2Saved');
    console.log('User data reset!');
  },
  loadUserData: () => {
    return {
      shoppingList: JSON.parse(localStorage.getItem('shoppingList')) || [],
      orderHistory: JSON.parse(localStorage.getItem('orderHistory')) || [],
      totalMoneySaved: parseFloat(localStorage.getItem('totalMoneySaved')) || 0,
      totalMilesTraveled: parseFloat(localStorage.getItem('totalMilesTraveled')) || 0,
      achievements: JSON.parse(localStorage.getItem('achievements')) || [],
      shoppingStreak: parseInt(localStorage.getItem('shoppingStreak')) || 0,
      favoriteStore: localStorage.getItem('favoriteStore') || 'N/A',
      co2Saved: parseFloat(localStorage.getItem('co2Saved')) || 0,
    };
  },
  saveUserData: (data) => {
    localStorage.setItem('shoppingList', JSON.stringify(data.shoppingList));
    localStorage.setItem('orderHistory', JSON.stringify(data.orderHistory));
    localStorage.setItem('totalMoneySaved', data.totalMoneySaved);
    localStorage.setItem('totalMilesTraveled', data.totalMilesTraveled);
    localStorage.setItem('achievements', JSON.stringify(data.achievements));
    localStorage.setItem('shoppingStreak', data.shoppingStreak);
    localStorage.setItem('favoriteStore', data.favoriteStore);
    localStorage.setItem('co2Saved', data.co2Saved);
  }
};

const OrderService = {
  saveOrder: (order) => {
    const userData = UserDataService.loadUserData();
    userData.orderHistory.push(order);
    UserDataService.saveUserData(userData);
  },
  getOrderHistory: () => {
    const userData = UserDataService.loadUserData();
    return userData.orderHistory;
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [totalMoneySaved, setTotalMoneySaved] = useState(0);
  const [totalMilesTraveled, setTotalMilesTraveled] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [shoppingStreak, setShoppingStreak] = useState(0);
  const [favoriteStore, setFavoriteStore] = useState('N/A');
  const [co2Saved, setCo2Saved] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Load user data on component mount
    const userData = UserDataService.loadUserData();
    setShoppingList(userData.shoppingList);
    setOrderHistory(userData.orderHistory);
    setTotalMoneySaved(userData.totalMoneySaved);
    setTotalMilesTraveled(userData.totalMilesTraveled);
    setAchievements(userData.achievements);
    setShoppingStreak(userData.shoppingStreak);
    setFavoriteStore(userData.favoriteStore);
    setCo2Saved(userData.co2Saved);

    // Reset user data on initial load (as per new requirement)
    UserDataService.resetUserData();
    // Re-load initial data after reset if needed, or set defaults
    setShoppingList([]);
    setOrderHistory([]);
    setTotalMoneySaved(0);
    setTotalMilesTraveled(0);
    setAchievements([]);
    setShoppingStreak(0);
    setFavoriteStore('N/A');
    setCo2Saved(0);

  }, []);

  useEffect(() => {
    // Save user data whenever relevant state changes
    UserDataService.saveUserData({
      shoppingList,
      orderHistory,
      totalMoneySaved,
      totalMilesTraveled,
      achievements,
      shoppingStreak,
      favoriteStore,
      co2Saved,
    });
  }, [shoppingList, orderHistory, totalMoneySaved, totalMilesTraveled, achievements, shoppingStreak, favoriteStore, co2Saved]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      const capitalizedItem = newItem.charAt(0).toUpperCase() + newItem.slice(1).toLowerCase();
      const product = mockProducts.find(p => p.name.toLowerCase() === capitalizedItem.toLowerCase());
      const price = product ? product.basePrice : 0; // Use basePrice from mockProducts
      setShoppingList([...shoppingList, { name: capitalizedItem, quantity: 1, price: price.toFixed(2) }]);
      setNewItem('');
    }
  };

  const handleQuantityChange = (index, delta) => {
    const updatedList = [...shoppingList];
    updatedList[index].quantity += delta;
    if (updatedList[index].quantity <= 0) {
      updatedList.splice(index, 1);
    }
    setShoppingList(updatedList);
  };

  const handleRemoveItem = (index) => {
    const updatedList = [...shoppingList];
    updatedList.splice(index, 1);
    setShoppingList(updatedList);
  };

  const calculateTotalCost = () => {
    return shoppingList.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');

    // AI Bot Logic
    let botResponseText = 'I am sorry, I cannot help with that at the moment.';
    const lowerCaseMessage = inputMessage.toLowerCase();

    // Hard-coded responses for specific queries
    if (lowerCaseMessage.includes('cheapest') && (lowerCaseMessage.includes('milk') || lowerCaseMessage.includes('bread') || lowerCaseMessage.includes('eggs') || lowerCaseMessage.includes('chicken')) ) {
      const foodItem = lowerCaseMessage.includes('milk') ? 'milk' : 
                       lowerCaseMessage.includes('bread') ? 'bread' : 
                       lowerCaseMessage.includes('eggs') ? 'eggs' : 'chicken';
      const cheapest = PriceService.getCheapestProduct(foodItem);
      if (cheapest) {
        botResponseText = `The cheapest ${foodItem} is at ${cheapest.store.name} for $${cheapest.price}. It's ${cheapest.store.distance} miles away with a ${cheapest.store.waitTime}-minute wait time.`;
      } else {
        botResponseText = `I couldn't find information about the cheapest ${foodItem} right now.`;
      }
    } else if (lowerCaseMessage.includes('in stock') && (lowerCaseMessage.includes('milk') || lowerCaseMessage.includes('bread') || lowerCaseMessage.includes('eggs') || lowerCaseMessage.includes('chicken')) && (lowerCaseMessage.includes('walmart') || lowerCaseMessage.includes('target') || lowerCaseMessage.includes('kroger'))) {
      const foodItem = lowerCaseMessage.includes('milk') ? 'milk' : 
                       lowerCaseMessage.includes('bread') ? 'bread' : 
                       lowerCaseMessage.includes('eggs') ? 'eggs' : 'chicken';
      const storeName = lowerCaseMessage.includes('walmart') ? 'Walmart' : 
                        lowerCaseMessage.includes('target') ? 'Target' : 'Kroger';
      const inStock = PriceService.isProductInStock(foodItem, storeName);
      const product = mockProducts.find(p => p.name.toLowerCase() === foodItem);
      const price = product ? PriceService.getProductPrice(foodItem, mockStores.find(s => s.name.toLowerCase().includes(storeName.toLowerCase())).id) : 'N/A';
      botResponseText = `${inStock === 'Yes' ? 'Yes' : 'No'}, ${foodItem} is ${inStock === 'Yes' ? '' : 'not '}in stock at ${storeName}. Current price: $${price}`;
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      botResponseText = 'Hello! How can I assist you with your grocery shopping today?';
    } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
      botResponseText = 'You\'re welcome! Is there anything else I can help you with?';
    } else if (lowerCaseMessage.includes('how are you')) {
      botResponseText = 'I\'m a bot, so I don\'t have feelings, but I\'m ready to help you! How can I assist?';
    } else if (lowerCaseMessage.includes('what can you do')) {
      botResponseText = 'I can help you find the cheapest groceries, check stock at stores, optimize your shopping routes, and track your savings. Just ask!';
    } else if (lowerCaseMessage.includes('help me with my shopping list')) {
      botResponseText = 'Sure, tell me what items you are looking for, and I can help you find the best deals.';
    } else if (lowerCaseMessage.includes('best time to shop at kroger')) {
      const kroger = mockStores.find(s => s.name === 'Kroger');
      botResponseText = `The best time to shop at Kroger is usually when the crowd level is low. Currently, the wait time is ${kroger.waitTime} minutes.`;
    } else if (lowerCaseMessage.includes('what is the crowd level at walmart')) {
      const walmart = mockStores.find(s => s.name === 'Walmart Supercenter');
      botResponseText = `The crowd level at Walmart Supercenter is currently ${walmart.crowdLevel} with a wait time of ${walmart.waitTime} minutes.`;
    } else if (lowerCaseMessage.includes('how far is target')) {
      const target = mockStores.find(s => s.name === 'Target');
      botResponseText = `Target is ${target.distance} miles away from your current location.`;
    } else if (lowerCaseMessage.includes('can you optimize my route')) {
      botResponseText = 'Yes, I can! Once you finalize your shopping list, I can suggest the cheapest, fastest, or most eco-friendly route for you.';
    } else if (lowerCaseMessage.includes('what are my achievements')) {
      botResponseText = `You have ${achievements.length} achievements so far! Keep shopping to unlock more.`;
    } else if (lowerCaseMessage.includes('how much money have i saved')) {
      botResponseText = `You have saved $${totalMoneySaved.toFixed(2)} so far! Great job!`;
    } else if (lowerCaseMessage.includes('what is my shopping streak')) {
      botResponseText = `Your current shopping streak is ${shoppingStreak} days. Keep it up!`;
    } else if (lowerCaseMessage.includes('tell me about a product')) {
      botResponseText = 'Which product are you interested in? I can tell you its base price and category.';
    } else if (lowerCaseMessage.includes('where can i find organic produce')) {
      botResponseText = 'You can find a wide selection of organic produce at Whole Foods Market and Sprouts Farmers Market.';
    } else if (lowerCaseMessage.includes('what are the store hours for aldi')) {
      const aldi = mockStores.find(s => s.name === 'Aldi');
      botResponseText = `Aldi is open from ${aldi.hours.monday.open} to ${aldi.hours.monday.close} on Mondays.`;
    } else if (lowerCaseMessage.includes('how do i save an order')) {
      botResponseText = 'After completing your shopping journey, your order will be automatically saved in your order history.';
    } else if (lowerCaseMessage.includes('what is truesource')) {
      botResponseText = 'TrueSource provides sustainability information for products, helping you make eco-friendly choices. However, this feature has been removed as per user request.';
    } else if (lowerCaseMessage.includes('show me my past orders')) {
      if (orderHistory.length > 0) {
        botResponseText = `You have ${orderHistory.length} past orders. You can view them in the Order History section.`;
      } else {
        botResponseText = 'You don\'t have any past orders yet. Start shopping to save your first order!';
      }
    } else if (lowerCaseMessage.includes('what is the best way to save money')) {
      botResponseText = 'To save money, always check the cheapest prices across different stores and use our route optimization feature to minimize travel costs.';
    }

    setTimeout(() => {
      const botMessage = { text: botResponseText, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleStartShopping = () => {
    if (shoppingList.length === 0) {
      alert('Please add items to your shopping list first!');
      return;
    }

    const totalCost = calculateTotalCost();
    const estimatedSavings = (totalCost * 0.15).toFixed(2); // 15% savings estimate
    const estimatedDistance = 8.5; // miles
    const estimatedTime = 45; // minutes

    const order = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: [...shoppingList],
      totalCost: parseFloat(totalCost),
      savings: parseFloat(estimatedSavings),
      distance: estimatedDistance,
      time: estimatedTime,
      route: 'Optimized Route'
    };

    OrderService.saveOrder(order);
    setOrderHistory([...orderHistory, order]);

    // Update user metrics
    setTotalMoneySaved(prev => prev + parseFloat(estimatedSavings));
    setTotalMilesTraveled(prev => prev + estimatedDistance);
    setShoppingStreak(prev => prev + 1);
    setFavoriteStore('Kroger');
    setCo2Saved(prev => prev + 2.3);

    alert(`Shopping journey started! Total cost: $${totalCost}, Estimated savings: $${estimatedSavings}`);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Enhanced Dashboard Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Money Saved</p>
                <p className="text-2xl font-bold text-green-900">${totalMoneySaved.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Navigation className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Miles Traveled</p>
                <p className="text-2xl font-bold text-blue-900">{totalMilesTraveled.toFixed(1)} mi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-800">Achievements</p>
                <p className="text-2xl font-bold text-purple-900">{achievements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-orange-800">Shopping Streak</p>
                <p className="text-2xl font-bold text-orange-900">{shoppingStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Store className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-sm font-medium text-teal-800">Favorite Store</p>
                <p className="text-lg font-bold text-teal-900">{favoriteStore}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-emerald-800">CO₂ Saved</p>
                <p className="text-2xl font-bold text-emerald-900">{co2Saved.toFixed(1)} lbs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => setActiveTab('shopping')} className="bg-green-600 hover:bg-green-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
            <Button onClick={() => setActiveTab('routes')} variant="outline">
              <Route className="h-4 w-4 mr-2" />
              Plan Route
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {orderHistory.length > 0 ? (
            <div className="space-y-2">
              {orderHistory.slice(-3).map((order, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">{order.date} - {order.items.length} items</span>
                  <span className="text-sm font-medium text-green-600">${order.totalCost.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent activity</p>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderShoppingList = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Shopping List</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <SearchBar
              placeholder="Add new item..."
              value={newItem}
              onChange={setNewItem}
              onSelect={(item) => {
                setNewItem(item);
                handleAddItem();
              }}
              suggestions={mockProducts.map(p => p.name)}
            />
            <Button onClick={handleAddItem} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {shoppingList.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your shopping list is empty. Add some items!</p>
          ) : (
            <div className="space-y-2">
              {shoppingList.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <div className="text-sm text-gray-600">
                      ${item.price} each
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(index, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(index, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {shoppingList.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total: ${calculateTotalCost()}</span>
                <Button onClick={handleStartShopping} className="bg-green-600 hover:bg-green-700">
                  Start Shopping Journey
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderStoresAndPrices = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Store className="h-5 w-5" />
            <span>Stores & Prices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockStores.slice(0, 10).map((store) => (
              <div key={store.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{store.name}</h3>
                    <p className="text-sm text-gray-600">{store.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{store.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Distance:</span>
                    <p className="font-medium">{store.distance} mi</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Wait Time:</span>
                    <p className="font-medium">{store.waitTime} min</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Crowd Level:</span>
                    <p className="font-medium">{store.crowdLevel}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600">Hours:</span>
                  <p className="text-sm">{store.hours.monday.open} - {store.hours.monday.close}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRoutesAndSavings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Route className="h-5 w-5" />
            <span>Routes & Savings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Interactive Map */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Springfield City Map</h3>
            <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-6 h-96 overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>
              </div>

              {/* City Landmarks */}
              {landmarks.map((landmark, index) => (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${((landmark.coordinates.lng + 89.7) / 0.4) * 100}%`,
                    top: `${((39.85 - landmark.coordinates.lat) / 0.15) * 100}%`
                  }}
                >
                  <div className="text-xs bg-white px-2 py-1 rounded shadow">
                    {landmark.type === 'park' && '🌳'}
                    {landmark.type === 'school' && '🏫'}
                    {landmark.type === 'hospital' && '🏥'}
                    {landmark.type === 'mall' && '🏬'}
                    {landmark.type === 'landmark' && '🏛️'}
                    <span className="ml-1">{landmark.name}</span>
                  </div>
                </div>
              ))}

              {/* Store Locations */}
              {mockStores.slice(0, 8).map((store, index) => (
                <div
                  key={store.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${((store.coordinates.lng + 89.7) / 0.4) * 100}%`,
                    top: `${((39.85 - store.coordinates.lat) / 0.15) * 100}%`
                  }}
                >
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                    {store.name}
                  </div>
                </div>
              ))}

              {/* Route Path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 20% 30% Q 40% 20% 60% 40% T 80% 60%"
                  stroke="#10b981"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>

          {/* Route Options */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Cheapest Route</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Save the most money</p>
                <div className="space-y-1 text-sm">
                  <p><strong>Total Cost:</strong> $45.67</p>
                  <p><strong>Distance:</strong> 12.3 miles</p>
                  <p><strong>Time:</strong> 65 minutes</p>
                  <p><strong>Savings:</strong> $8.45</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Fastest Route</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Save the most time</p>
                <div className="space-y-1 text-sm">
                  <p><strong>Total Cost:</strong> $52.34</p>
                  <p><strong>Distance:</strong> 8.7 miles</p>
                  <p><strong>Time:</strong> 35 minutes</p>
                  <p><strong>Savings:</strong> $2.18</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold">Eco-Friendly Route</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Minimize carbon footprint</p>
                <div className="space-y-1 text-sm">
                  <p><strong>Total Cost:</strong> $48.91</p>
                  <p><strong>Distance:</strong> 9.2 miles</p>
                  <p><strong>Time:</strong> 45 minutes</p>
                  <p><strong>CO₂ Saved:</strong> 2.3 lbs</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrderHistory = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Order History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orderHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet. Start shopping to save your first order!</p>
          ) : (
            <div className="space-y-4">
              {orderHistory.map((order, index) => (
                <div key={order.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.totalCost.toFixed(2)}</p>
                      <p className="text-sm text-green-600">Saved ${order.savings.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Items:</span>
                      <p className="font-medium">{order.items.length}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Distance:</span>
                      <p className="font-medium">{order.distance} mi</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Time:</span>
                      <p className="font-medium">{order.time} min</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-600">Items:</span>
                    <p className="text-sm">{order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderAIAssistant = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>AI Shopping Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Hi! I'm your AI shopping assistant. Ask me anything about groceries, prices, or stores!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-white border'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          <div className="flex space-x-2 mt-4">
            <Input
              placeholder="Ask me about groceries, prices, or stores..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Profile Information</span>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Notifications</span>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shopping Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Default Store</span>
                <select className="border rounded px-3 py-1">
                  <option>Kroger</option>
                  <option>Walmart</option>
                  <option>Target</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Budget Alert</span>
                <Input type="number" placeholder="$100" className="w-24" />
              </div>
              <div className="flex items-center justify-between">
                <span>Preferred Route</span>
                <select className="border rounded px-3 py-1">
                  <option>Cheapest</option>
                  <option>Fastest</option>
                  <option>Eco-Friendly</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">App Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Theme</span>
                <select className="border rounded px-3 py-1">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Auto</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Language</span>
                <select className="border rounded px-3 py-1">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'shopping':
        return renderShoppingList();
      case 'stores':
        return renderStoresAndPrices();
      case 'routes':
        return renderRoutesAndSavings();
      case 'orders':
        return renderOrderHistory();
      case 'assistant':
        return renderAIAssistant();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ShopSmart</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('dashboard')}
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'shopping' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('shopping')}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Shopping List
              </Button>
              <Button
                variant={activeTab === 'stores' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('stores')}
              >
                <Store className="h-4 w-4 mr-2" />
                Stores & Prices
              </Button>
              <Button
                variant={activeTab === 'routes' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('routes')}
              >
                <Route className="h-4 w-4 mr-2" />
                Routes & Savings
              </Button>
              <Button
                variant={activeTab === 'orders' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order History
              </Button>
              <Button
                variant={activeTab === 'assistant' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('assistant')}
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
              <Button
                variant={activeTab === 'settings' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

