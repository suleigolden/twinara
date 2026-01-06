# Twinara Frontend

Frontend application for Twinara - a dementia care support platform. Built with React, TypeScript, Vite, and Chakra UI, providing an intuitive interface for dementia patients and caregivers to manage profiles, activities, and interact with an AI assistant.

## 🚀 Features

- **User Authentication**: JWT-based authentication with Google OAuth support
- **Dementia User Onboarding**: Multi-step onboarding process for profile creation
- **Profile Management**: Comprehensive profile management with avatar uploads
- **Daily Activities**: Interactive cognitive games and exercises
- **AI Chat Assistant**: Voice and text-based AI assistant (Twinara AI)
- **Activity Tracking**: Schedule and manage daily activities
- **Responsive Design**: Mobile-first responsive UI with dark/light theme support
- **State Management**: Redux Toolkit with persistence
- **Form Validation**: React Hook Form with Yup validation
- **File Uploads**: Firebase Storage integration for media uploads

## 📋 Requirements

- **Node.js**: Version 18.x or higher
- **Yarn**: Package manager (or npm)
- **Firebase Account**: For file storage (optional, for avatar uploads)
- **Google OAuth Credentials**: For Google authentication (optional)

## 🔧 Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd twinara/front-end
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:

   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:5001

   # Firebase Configuration (for file uploads)
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id

   # Google OAuth (optional)
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Configure Firebase** (if using file uploads):
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Storage
   - Copy your Firebase configuration to the `.env` file
   - Update `src/common/utils/firebaseConfig.ts` with your credentials

## 🏃 Running the Application

### Development Mode

```bash
# Start development server
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:3007` (default port)

### Build for Production

```bash
# Build the application
yarn build
# or
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
# Preview the production build locally
yarn preview
# or
npm run preview
```

## 🏗️ Project Structure

```
src/
├── apps/                    # Main application features
│   ├── auth/                # Authentication pages
│   ├── daily-activities/    # Activity games
│   ├── dashboard/           # User dashboard
│   ├── dementia-user-onboard/  # Onboarding flow
│   ├── landing-page/        # Public landing page
│   └── twinara-ai/          # AI chat interface
├── assets/                   # Static assets (images, videos)
├── common/                   # Shared utilities and components
│   ├── components/          # Reusable components
│   ├── constants/          # Constants and configurations
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
├── components/                # UI components
│   ├── fields/              # Form fields
│   ├── landing-page/        # Landing page components
│   └── ...
├── contexts/                 # React contexts
│   ├── ThemeContext.tsx     # Theme management
│   └── SidebarContext.ts    # Sidebar state
├── hooks/                    # Custom React hooks
│   ├── use-user.ts          # User data hook
│   ├── use-dementia-user-profile.ts
│   └── ...
├── layouts/                  # Layout components
│   ├── admin/               # Admin layout
│   └── auth/                # Auth layout
├── redux-action/             # Redux store and actions
│   ├── api.service.ts       # API service layer
│   ├── axios-interceptor.ts # Axios configuration
│   ├── slices/              # Redux slices
│   └── store.ts             # Redux store
├── routes.tsx                # Route definitions
├── theme/                    # Chakra UI theme configuration
└── types/                    # TypeScript type definitions
```

## 🎨 Tech Stack

- **React 19**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Chakra UI**: Component library
- **Redux Toolkit**: State management
- **React Router**: Routing
- **React Hook Form**: Form management
- **Yup**: Schema validation
- **Axios**: HTTP client
- **Firebase**: File storage
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animations
- **React Query**: Data fetching and caching

## 🔐 Authentication

The application uses JWT tokens stored in Redux state with persistence. Authentication flow:

1. User signs in/signs up
2. JWT token is received from API
3. Token is stored in Redux store (persisted to localStorage)
4. Token is automatically included in API requests via axios interceptor
5. On 401 errors, user is automatically logged out

### Available Account Types

- `individual`
- `organization`
- `organization-user`
- `udemy-user`
- `dementia-user`
- `caregiver-user`

## 📱 Main Features

### 1. User Onboarding
Multi-step onboarding process for dementia users:
- Personal information
- Address details
- Work history and hobbies
- Important dates
- Bio and notes
- Avatar upload

### 2. Daily Activities
Interactive cognitive games:
- Identity & Self Recall
- People & Relationships
- Routine & Daily Awareness
- Recognition Tasks
- Story & Memory
- Wellness Prompts

### 3. Twinara AI Assistant
AI-powered chat assistant with:
- Voice input/output support
- Text-based chat
- Conversation history
- Personalized responses based on user profile

### 4. Activity Management
- Create and manage daily activities
- Schedule recurring activities
- Track activity completion

## 🔌 API Integration

The frontend uses a custom API service (`api.service.ts`) that:
- Automatically injects JWT tokens from Redux store
- Handles 401 errors and redirects to login
- Provides methods for all API endpoints
- Uses kebab-case endpoint names matching the backend

### Example API Usage

```typescript
import { api } from '~/redux-action/api.service';

// Fetch user profile
const profile = await api.service('dementia-profiles').findByUserId(userId);

// Create activity
await api.service('dementia-user-activities').createDementiaUserActivity(data);

// Chat with AI
const response = await api.service('memory-ai-agent').chat({
  userId,
  message: 'Hello'
});
```

## 🎨 Theming

The application supports:
- Light/Dark theme toggle
- Custom Chakra UI theme
- System theme detection
- Persistent theme preference

Theme configuration is in `src/theme/theme.ts`.

## 📝 Code Style

### Linting

```bash
# Run ESLint
yarn lint
# or
npm run lint
```

### Formatting

The project uses Prettier for code formatting. Configuration is in `.prettierrc`.

## 🧪 Development Guidelines

### Adding New Features

1. **Create components** in appropriate directories
2. **Add routes** in `routes.tsx` or `App.tsx`
3. **Create hooks** for reusable logic in `hooks/`
4. **Add API methods** in `redux-action/api.service.ts` if needed
5. **Update types** in `types/` directory
6. **Follow TypeScript** best practices

### File Naming Conventions

- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Utilities: `kebab-case.ts`
- Types: `kebab-case.ts`

### Import Aliases

The project uses path aliases:
- `~` maps to `src/`

Example:
```typescript
import { api } from '~/redux-action/api.service';
import { useUser } from '~/hooks/use-user';
```

## 🚢 Deployment

### Build for Production

```bash
yarn build
```

### Environment Variables for Production

Ensure all environment variables are set:
- `VITE_API_BASE_URL`: Backend API URL
- Firebase configuration (if using file uploads)
- Google OAuth credentials (if using Google auth)

### Static Hosting

The built files in `dist/` can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

### Build Optimization

The Vite build is optimized with:
- Code splitting
- Vendor chunk separation
- Tree shaking
- Minification

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check `VITE_API_BASE_URL` in `.env`
   - Ensure backend API is running
   - Check CORS configuration on backend

2. **Firebase Upload Errors**
   - Verify Firebase configuration
   - Check Firebase Storage rules
   - Ensure Firebase project is active

3. **Authentication Issues**
   - Clear localStorage and refresh
   - Check JWT token expiration
   - Verify backend authentication endpoint

4. **Build Errors**
   - Clear `node_modules` and reinstall
   - Check TypeScript errors: `yarn build`
   - Verify all environment variables are set

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Chakra UI Documentation](https://chakra-ui.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)

## 📝 License

UNLICENSED - Private project

## 🤝 Support

For issues and questions, please contact the development team.

---

Built with [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
