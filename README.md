# Password Vault 🔐

A secure, privacy-first password manager built with Next.js, TypeScript, and MongoDB. Generate strong passwords, store them securely with client-side encryption, and manage your credentials with a clean, dark-themed interface.

## Features ✨

- **Strong Password Generation** - Create cryptographically secure passwords
- **Secure Storage** - Client-side encryption with crypto-js before database storage
- **User Authentication** - Secure login system with NextAuth.js
- **Dark Theme UI** - Modern, eye-friendly interface with Tailwind CSS
- **Privacy-First** - Your passwords are encrypted on your device before being sent to the server
- **Full CRUD Operations** - Create, read, update, and delete password entries
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack 🛠️

- **Frontend**: Next.js 15.5.4, React 18, TypeScript
- **Styling**: Tailwind CSS 3.3.6, Lucide React Icons
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Encryption**: crypto-js for client-side password encryption
- **Deployment**: Render (Production)

## Prerequisites 📋

Before running this project, make sure you have:

- Node.js 20.x or higher
- npm or yarn package manager
- MongoDB database (local or MongoDB Atlas)
- Git for version control

## Installation & Setup 🚀

### 1. Clone the Repository
```bash
git clone https://github.com/VaibhavSainiI/MadQUICK-Digital-Agency.git
cd password-vault
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add the following:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/password-vault

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# For production, also set:
# NEXTAUTH_URL=https://your-production-domain.com
```

**Important**: 
- Replace the MongoDB URI with your actual connection string
- Generate a secure secret for `NEXTAUTH_SECRET` (32+ characters recommended)
- Never commit your `.env.local` file to version control

### 4. Database Setup
- Create a MongoDB database named `password-vault`
- The application will automatically create the required collections
- Ensure your MongoDB user has read/write permissions

## Running the Application 🏃‍♂️

### Development Mode
```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm run start
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Project Structure 📁

```
password-vault/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── auth/          # Authentication endpoints
│   │   ├── dashboard/         # Password vault dashboard
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── Dashboard.tsx      # Main dashboard component
│   │   ├── LoginForm.tsx      # Login component
│   │   └── PasswordGenerator.tsx # Password generation
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── db.ts             # MongoDB connection
│   │   └── encryption.ts     # Client-side encryption
│   └── models/               # Database models
│       └── User.ts           # User schema
├── public/                   # Static assets
├── .env.example             # Environment variables template
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## Security Features 🔒

- **Client-Side Encryption**: Passwords are encrypted on your device before being sent to the server
- **Secure Authentication**: JWT-based authentication with NextAuth.js
- **Password Hashing**: User passwords are hashed with bcrypt
- **Environment Security**: Sensitive data stored in environment variables
- **HTTPS Ready**: Configured for secure production deployment

## Deployment 🌐

### Deploy to Render

1. **Connect Repository**: Link your GitHub repository to Render
2. **Set Environment Variables**: Configure the following in Render dashboard:
   ```
   MONGODB_URI=your-mongodb-connection-string
   NEXTAUTH_URL=https://your-app-name.onrender.com
   NEXTAUTH_SECRET=your-production-secret
   ```
3. **Build Settings**:
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm start`
   - Node Version: 20.x (via .nvmrc file)

### Deploy to Other Platforms

The application is configured to work with:
- Vercel
- Netlify
- Heroku
- Any Node.js hosting platform

## Usage Guide 📖

1. **Sign Up/Login**: Create an account or sign in to access your vault
2. **Generate Password**: Use the built-in generator to create strong passwords
3. **Save Entry**: Store passwords with associated website/service information
4. **View Vault**: Access all your saved passwords in the dashboard
5. **Edit/Delete**: Manage your password entries as needed

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/VaibhavSainiI/MadQUICK-Digital-Agency/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

## Roadmap �️

- [ ] Password sharing with other users
- [ ] Two-factor authentication
- [ ] Browser extension
- [ ] Mobile app
- [ ] Password strength analysis
- [ ] Backup and export functionality

---

**⚠️ Security Notice**: This is a demonstration project. For production use with sensitive data, consider additional security measures such as:
- Regular security audits
- Advanced encryption methods
- Professional security review
- Compliance with relevant data protection regulations

Built with ❤️ by [VaibhavSainiI](https://github.com/VaibhavSainiI)

- **Authentication**: NextAuth.js

- **Database**: MongoDB with Mongoose- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- **Encryption**: crypto-js for client-side AES-256 encryption- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- **Icons**: Lucide React

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 📦 Installation & Setup

## Deploy on Vercel

### Prerequisites

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- Node.js 18+ 

- MongoDB (local or cloud instance)Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


### Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/password-vault

# NextAuth Configuration  
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# Encryption Key (generate a strong random key for production)
ENCRYPTION_KEY=your-32-character-encryption-key-here
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd password-vault
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see above)

4. Start MongoDB (if running locally)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Encryption Implementation

This application uses **client-side encryption** with crypto-js:

- **Algorithm**: AES-256 in CBC mode
- **Implementation**: All sensitive data (passwords, usernames, URLs, notes) is encrypted on the client before transmission
- **Key Management**: Currently uses a fixed key for demo purposes. In production, this should be derived from the user's master password
- **Data Flow**: 
  1. User enters data → Client encrypts with AES-256 → Sends encrypted blob to server
  2. Server stores only encrypted data (never sees plaintext)
  3. Client retrieves encrypted data → Decrypts locally → Displays to user

**Why crypto-js?**: Chosen for its reliability, wide adoption, and comprehensive AES implementation. It provides the necessary security while maintaining good performance for web applications.

## 🏗 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── vault/          # Vault CRUD operations
│   ├── dashboard/          # Protected dashboard page
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── Dashboard.tsx       # Main dashboard
│   ├── PasswordGenerator.tsx
│   ├── VaultItem.tsx       # Individual vault item
│   ├── VaultItemForm.tsx   # Add/edit form
│   └── SessionProvider.tsx
├── hooks/
│   └── useVault.ts         # Vault operations hook
├── lib/
│   ├── db.ts              # MongoDB connection
│   ├── crypto.ts          # Server-side crypto utils
│   └── clientCrypto.ts    # Client-side encryption
├── models/                # MongoDB models
│   ├── User.ts
│   └── VaultItem.ts
└── types/                 # TypeScript definitions
```

## 🧪 Testing

To test the encryption:

1. Create an account and add a vault item
2. Check your MongoDB collection - you should only see encrypted blobs
3. Use browser dev tools to inspect network requests - no plaintext passwords
4. Test the clipboard auto-clear feature (15-second timer)

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## ⚠️ Security Considerations

- **Environment Variables**: Use strong, unique values for `NEXTAUTH_SECRET` and `ENCRYPTION_KEY` in production
- **HTTPS**: Always use HTTPS in production
- **Database Security**: Secure your MongoDB instance with proper authentication and network restrictions
- **Key Management**: Consider implementing user-specific encryption keys derived from master passwords
- **Session Management**: Sessions expire and require re-authentication

## 🎯 Future Enhancements

- [ ] 2FA/TOTP support
- [ ] Biometric authentication
- [ ] Password strength analysis
- [ ] Secure password sharing
- [ ] Mobile app
- [ ] Browser extension
- [ ] Import/export functionality
- [ ] Dark mode
- [ ] Password history
- [ ] Tags and folders

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions, please open a GitHub issue.

---

**Note**: This is a demonstration application. For production use, consider additional security measures such as hardware security modules, advanced key derivation, and security audits.