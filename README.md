# DriveNow - Car Rental Platform

A modern full-stack car rental application built with React, TypeScript, and Node.js/Express. DriveNow connects customers with affordable car rental options, featuring a clean interface for browsing available vehicles and submitting rental enquiries.

## 🚗 Features

### Frontend (React + TypeScript)
- **Modern UI**: Built with React 19, TypeScript, and Tailwind CSS
- **Component Library**: Radix UI components for accessible, consistent design
- **Routing**: TanStack Router for type-safe navigation
- **State Management**: React Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Built-in theme switching capability

### Backend (Node.js + Express)
- **RESTful API**: Express.js server with CORS support
- **Database**: SQLite for lightweight, file-based storage
- **Car Management**: CRUD operations for vehicle inventory
- **Enquiry System**: Customer rental request handling
- **Email Ready**: Nodemailer integration for notifications
- **Environment Config**: dotenv for secure configuration

## 🛠 Tech Stack

### Frontend Dependencies
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TanStack Router** - Type-safe routing
- **TanStack React Query** - Server state management
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Framer Motion** - Animations
- **Lucide React** - Icon library

### Backend Dependencies
- **Express 5** - Web framework
- **SQLite3** - Database engine
- **CORS** - Cross-origin resource sharing
- **Nodemailer** - Email sending
- **dotenv** - Environment variables
- **Jest** - Testing framework
- **Biome** - Linting and formatting

## 📁 Project Structure

```
drivenow/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   ├── router/         # Route configuration
│   │   └── App.tsx         # Main application component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── api/                    # Node.js backend API
│   ├── src/
│   │   ├── db/            # Database configuration and seeding
│   │   ├── routes/        # API route handlers
│   │   └── server.js      # Express server setup
│   ├── tests/             # Backend test files
│   └── package.json       # Backend dependencies
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/raju6991/drivenow.git
   cd drivenow
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../api
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In the api directory, create a .env file
   cd api
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize the database**
   ```bash
   # In the api directory
   npm run seed
   ```

### Development

1. **Start the backend server**
   ```bash
   cd api
   npm run dev
   ```
   The API will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Build

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the production backend**
   ```bash
   cd api
   npm start
   ```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
```

### Backend Testing
```bash
cd api
npm test
```

## 📝 API Endpoints

### Cars
- `GET /api/cars` - Retrieve all available cars
- `GET /api/cars/:id` - Retrieve specific car details

### Enquiries
- `POST /api/enquiries` - Submit a rental enquiry

### Sample Enquiry Payload
```json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "rental_duration": "1 week",
  "vehicle_interest": "Mitsubishi Lancer",
  "message": "I'm interested in renting this car."
}
```

## 🎨 UI Components

The frontend uses a modern component library built with:
- **Radix UI** for accessible primitives
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Framer Motion** for smooth animations

Key pages include:
- **Home** - Landing page with hero section
- **Cars Available** - Browse rental vehicles
- **About** - Company information
- **Contact** - Contact form and details

## 🔧 Configuration

### Environment Variables (API)
Create a `.env` file in the `api/` directory:

```env
PORT=3000
NODE_ENV=development
# Email configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### CORS Configuration
The API is configured to accept requests from:
- `https://gccheapcarrental.com` (production)
- `http://localhost:5173` (development)

## 🚦 Deployment

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist/` folder to your hosting provider
3. Configure environment variables for production

### Backend Deployment
1. Set up production environment variables
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`
4. Consider using a process manager like PM2

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 📞 Support

For support and inquiries:
- **Frontend Issues**: Check the React console for errors
- **Backend Issues**: Check the server logs and API responses
- **Database Issues**: Ensure SQLite is properly initialized with `npm run seed`

## 🔄 Development Workflow

1. **Code Quality**: The project uses Biome for linting and formatting
   ```bash
   # Frontend
   npm run lint
   
   # Backend
   npm run lint
   npm run format
   ```

2. **Type Safety**: TypeScript ensures type safety across the application
3. **Testing**: Jest is configured for unit and integration testing
4. **Hot Reload**: Vite provides fast development with HMR

---

**DriveNow** - Making car rental simple and affordable. 🚗✨