# Password Vault - Secure Password ManagerThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A privacy-first password manager built with Next.js, TypeScript, and MongoDB featuring client-side encryption.## Getting Started



## 🔒 Security FeaturesFirst, run the development server:



- **Client-Side Encryption**: All passwords are encrypted on your device before being sent to the server using AES-256 encryption```bash

- **Zero-Knowledge Architecture**: The server never sees your plaintext passwordsnpm run dev

- **Auto-Clear Clipboard**: Copied passwords automatically clear from clipboard after 15 seconds# or

- **Strong Password Generation**: Cryptographically secure password generation with customizable optionsyarn dev

- **Exclude Look-alikes**: Option to exclude confusing characters (0, O, 1, l, I)# or

pnpm dev

## 🚀 Features# or

bun dev

- **Password Generator**: Generate strong passwords with customizable length and character sets```

- **Secure Vault**: Store passwords, usernames, URLs, and notes securely

- **Fast Search**: Instant search and filtering of vault itemsOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **One-Click Copy**: Copy passwords to clipboard with auto-clear functionality

- **Clean UI**: Minimal, responsive design with Tailwind CSSYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Authentication**: Secure email/password authentication with NextAuth.js

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🛠 Tech Stack

## Learn More

- **Frontend**: Next.js 14 with TypeScript

- **Styling**: Tailwind CSSTo learn more about Next.js, take a look at the following resources:

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