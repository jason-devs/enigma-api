# Enigma Machine API 🔐

A modern REST API implementation of the WWII Enigma Machine encryption device. This API allows third parties to encrypt text using historically accurate Enigma machine settings and configurations.

## Features ⚡

- **Full Enigma Machine Implementation**

  - 5 historically accurate rotors
  - 2 reflector types (B and C)
  - Configurable plugboard connections
  - Ring positions and rotor start positions

- **Secure Authentication**
  - JWT-based user authentication
  - API key protection for encryption endpoints
  - Password reset functionality with email
- **User Management**

  - User registration and login
  - Password reset via email
  - Account management endpoints

- **Settings Management**

  - Save and retrieve Enigma configurations
  - Share settings between users
  - Bulk settings operations

- **Message History**
  - Store encrypted messages
  - Retrieve message history
  - Message deletion capabilities

## API Documentation 📚

### Authentication Endpoints

```http
POST /api/v1/auth/signup
POST /api/v1/auth/login
GET /api/v1/auth/logout
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password/:token
GET /api/v1/auth/generate-api-key
```

### Enigma Endpoints

```http
POST /api/v1/enigma
```

### Settings Endpoints

```http
GET /api/v1/settings
POST /api/v1/settings
DELETE /api/v1/settings
GET /api/v1/settings/:id
DELETE /api/v1/settings/:id
```

### Message Endpoints

```http
GET /api/v1/message
POST /api/v1/message
DELETE /api/v1/message
GET /api/v1/message/:id
DELETE /api/v1/message/:id
```

## Tech Stack 💻

- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens
- bcrypt.js
- nodemailer
- Various security middlewares (helmet, rate-limiting, etc.)

## Security Features 🔒

- Helmet.js for secure headers
- Rate limiting
- XSS protection
- NoSQL injection prevention
- Parameter pollution prevention
- CORS configuration
- Secure cookie usage
- Request sanitization

## Installation 🚀

```bash
# Clone the repository
git clone https://github.com/yourusername/enigma-api.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run start

# Start production server
npm run prod
```

## Environment Variables 🔑

```plaintext
NODE_ENV=development
PORT=3000
DATABASE=your_mongodb_connection_string
DATABASE_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=90d
JWT_COOKIE_EXPIRY=90
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_username
EMAIL_PASSWORD=your_email_password
```

## Usage Example 📝

```javascript
const response = await fetch("https://api.enigma.com/api/v1/enigma", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    key: "your_api_key",
  },
  body: JSON.stringify({
    text: "HELLO WORLD",
    settings: {
      rotors: [1, 2, 3],
      reflector: "B",
      plugboard: ["AB", "CD", "EF"],
      ringPositions: [0, 0, 0],
      startRotations: [0, 0, 0],
    },
  }),
});

const data = await response.json();
console.log(data.output); // Encrypted text
```

## Testing 🧪

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author ✨

Jason Shaw

<!--
- LinkedIn: [your-linkedin]
- Website: [your-website] -->
