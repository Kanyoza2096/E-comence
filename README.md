# TechMart - Modern E-commerce Platform

A cutting-edge e-commerce platform built with React, TypeScript, and TailwindCSS featuring advanced device connectivity through Web Bluetooth API and comprehensive admin management tools.

![TechMart Preview](https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 🚀 Features

### 🛒 Customer Storefront
- **Modern Product Catalog**: Responsive grid layout with lazy-loaded images
- **Advanced Filtering**: Search by name, category, price range with real-time results
- **Shopping Cart**: Persistent cart with quantity management and local storage
- **Checkout Process**: Multi-step checkout with form validation
- **Product Details**: Rich product pages with image galleries and reviews

### 👨‍💼 Admin Dashboard
- **Product Management**: Full CRUD operations for product catalog
- **Order Tracking**: Complete order management with status updates
- **Analytics Dashboard**: Revenue tracking with interactive charts (Recharts)
- **Customer Insights**: Customer growth and behavior analytics

### 📱 Device Connectivity
- **Web Bluetooth API**: Real device scanning and connection
- **Device Simulation**: Mock device connectivity for testing
- **Signal Monitoring**: Real-time signal strength and battery monitoring
- **Device Management**: Connect, disconnect, and manage multiple devices

### 🎨 Design & UX
- **Dark/Light Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach with smooth animations
- **Accessibility**: WCAG compliant with keyboard navigation support
- **PWA Ready**: Service worker implementation for offline functionality

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS, Framer Motion
- **State Management**: Context API with useReducer
- **Charts**: Recharts for analytics visualization
- **Icons**: Lucide React
- **Device Integration**: Web Bluetooth API
- **Deployment**: GitHub Pages with automated CI/CD

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Modern browser with Web Bluetooth support (Chrome, Edge)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/modern-ecommerce-platform.git
   cd modern-ecommerce-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview  # Preview the build locally
```

## 🚀 Deployment

### GitHub Pages (Automated)

1. **Push to main branch** - Deployment happens automatically via GitHub Actions
2. **Enable GitHub Pages** in repository settings
3. **Set source** to "GitHub Actions"

### Manual Deployment

```bash
npm run build
# Upload the `dist` folder to your hosting provider
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_NAME=TechMart
VITE_API_URL=https://your-api-endpoint.com
```

### Vite Configuration

The `vite.config.ts` is pre-configured for:
- GitHub Pages deployment with proper base path
- Code splitting for optimal loading
- Asset optimization

### PWA Configuration

Service worker is pre-configured in `public/sw.js` for:
- Static asset caching
- Offline functionality
- Background sync capabilities

## 🔌 Device Integration

### Web Bluetooth API

The platform uses the Web Bluetooth API for real device connectivity:

```typescript
// Scan for devices
const device = await navigator.bluetooth.requestDevice({
  acceptAllDevices: true,
  optionalServices: ['battery_service', 'device_information']
});
```

### Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Edge    | ✅ Full |
| Safari  | ❌ Limited |
| Firefox | ❌ Experimental |

## 📊 Analytics & Monitoring

The admin dashboard includes:
- Revenue tracking with monthly breakdowns
- Order status distribution
- Customer growth metrics
- Device connectivity statistics

## 🎯 Performance Optimizations

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Vendor libraries separated for better caching
- **Bundle Optimization**: Tree shaking and minification
- **Local Storage**: Persistent cart and user preferences
- **Service Worker**: Asset caching and offline support

## 🔒 Security Features

- **Input Validation**: All forms include client-side validation
- **XSS Protection**: Sanitized user inputs
- **HTTPS Ready**: Secure deployment configurations
- **Bluetooth Security**: Device pairing and authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** for high-quality product images
- **Lucide** for the beautiful icon set
- **Tailwind CSS** for the utility-first styling approach
- **Recharts** for interactive data visualizations

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: your-email@domain.com
- Documentation: [Project Wiki](https://github.com/yourusername/modern-ecommerce-platform/wiki)

---

**Built with ❤️ using React, TypeScript, and modern web technologies**