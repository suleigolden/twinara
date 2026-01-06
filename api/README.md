# Twinara API

Backend API for Twinara - a dementia care support platform that provides personalized assistance, activity management, and AI-powered chat support for individuals with dementia and their caregivers.

## 🚀 Features

- **User Authentication & Management**: JWT-based authentication with Google OAuth support
- **Dementia Profiles**: Comprehensive profile management for dementia patients
- **Activity Management**: Daily activity tracking and scheduling
- **AI Chat Assistant**: Memory AI agent powered by OpenAI for personalized support
- **Activity Games**: Interactive cognitive games and exercises
- **Chat Messages**: Conversation history and messaging system
- **Role-Based Access Control**: CASL-based permission system
- **API Documentation**: Swagger/OpenAPI documentation
- **Real-time Communication**: Socket.IO support for real-time features

## 📋 Requirements

- **Node.js**: Version 20.x (see `.nvmrc`)
- **PostgreSQL**: Database server
- **Yarn**: Package manager
- **OpenAI API Key**: For AI chat and activity game features (optional but recommended)

## 🔧 Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd twinara/api
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Server Configuration
   PORT=5001
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_DATABASE=twinara_db

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d

   # OpenAI Configuration (Required for AI features)
   OPENAI_API_KEY=your_openai_api_key

   # Email Configuration (Optional - for email features)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   MAIL_FROM_NAME=Twinara Support

   # Domain Configuration (for production)
   DOMAIN=your-domain.com
   ```

4. **Set up PostgreSQL database**:
   ```bash
   # Create database
   createdb twinara_db

   # Or using psql
   psql -U postgres
   CREATE DATABASE twinara_db;
   ```

   The application uses TypeORM with `synchronize: true` in development, which will automatically create tables based on entities.

## 🏃 Running the Application

### Development Mode

```bash
# Start in watch mode (auto-reload on changes)
yarn start:dev

# Or start normally
yarn start
```

The API will be available at `http://localhost:5001`

### Production Mode

```bash
# Build the application
yarn build

# Start in production mode
yarn start:prod
```

### Debug Mode

```bash
yarn start:debug
```

## 📚 API Documentation

Once the server is running, access the Swagger API documentation at:

```
http://localhost:5001/api
```

The documentation includes:
- All available endpoints
- Request/response schemas
- Authentication requirements
- Try-it-out functionality

**Note**: In production, the Swagger documentation is limited to specific endpoints for security.

## 🗄️ Database

### TypeORM Configuration

The application uses TypeORM with PostgreSQL. In development mode, `synchronize: true` automatically creates and updates database tables based on entity definitions.

### Available Scripts

```bash
# Check database migrations
yarn migrate:check

# Populate dementia-related data
yarn migrate:populate-dementia
```

### Entities

The main entities in the system are:
- `User`: User accounts and authentication
- `DementiaProfile`: Dementia patient profiles
- `DementiaUserActivity`: Daily activities and routines
- `DementiaUserChatMessage`: Chat conversation history
- `TwinaraActivityGame`: Activity game results and progress

## 🧪 Testing

```bash
# Unit tests
yarn test

# Watch mode
yarn test:watch

# Coverage
yarn test:cov

# E2E tests
yarn test:e2e
```

## 📁 Project Structure

```
src/
├── auth/                 # Authentication module
├── users/                # User management
├── dementia-profiles/    # Dementia profile management
├── dementia-user-activities/  # Activity management
├── dementia-user-chat-messages/  # Chat message storage
├── memory-ai-agent/      # AI chat assistant
├── twinara-activity-game/  # Activity games
├── common/               # Shared utilities
│   ├── ability/          # CASL permissions
│   ├── filters/          # Exception filters
│   └── middleware/       # Socket.IO middleware
└── lib/                  # Configuration utilities
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in requests:

```
Authorization: Bearer <your_jwt_token>
```

### Available Account Types

- `individual`
- `organization`
- `organization-user`
- `udemy-user`
- `dementia-user`
- `caregiver-user`

## 🌐 API Endpoints

### Main Modules

- **Users**: `/users` - User management
- **Auth**: `/auth` - Authentication endpoints
- **Dementia Profiles**: `/dementia-profiles` - Profile management
- **Activities**: `/dementia-user-activities` - Activity CRUD
- **Chat Messages**: `/dementia-user-chat-messages` - Message history
- **AI Agent**: `/memory-ai-agent` - AI chat interface
- **Activity Games**: `/twinara-activity-games` - Game management

## 🚢 Deployment

### Render.com

The project includes a `render.yaml` configuration for deployment on Render.com:

```yaml
services:
  - type: web
    name: spelling-bee-api
    env: node
    buildCommand: yarn install && yarn build
    startCommand: yarn start:prod
```

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- Database connection strings
- JWT secret
- OpenAI API key
- Email configuration
- Domain settings

### Production Considerations

- Set `NODE_ENV=production`
- Use SSL for database connections
- Configure proper CORS origins
- Set up proper logging
- Use environment-specific secrets

## 🛠️ Development

### Code Style

```bash
# Format code
yarn format

# Lint code
yarn lint
```

### Adding New Features

1. Create module structure following NestJS conventions
2. Add entities in the appropriate module
3. Create DTOs for request/response validation
4. Implement service logic
5. Add controller endpoints
6. Update Swagger documentation
7. Add tests

## 📝 License

UNLICENSED - Private project

## 🤝 Support

For issues and questions, please contact the development team.

---

Built with [NestJS](https://nestjs.com/) - A progressive Node.js framework
