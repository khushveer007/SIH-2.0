# SIH 2.0 - Student Information Hub

A comprehensive web application designed to help students discover and explore government colleges, track academic timelines, and make informed educational decisions.

## 🚀 Features

- **College Directory**: Searchable and filterable directory of government colleges
- **Course Information**: Detailed information about courses offered by colleges
- **Aptitude Quiz**: Interactive quiz to suggest academic streams based on student interests
- **Timeline Tracker**: Academic deadline tracking system
- **Student Authentication**: Secure registration and login system
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable UI components built on Radix UI
- **Magic UI** - Modern UI components and animations
- **Framer Motion** - Animation library for React

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database service
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

## 📁 Project Structure

```
SIH-2.0/
├── frontend/          # React.js frontend application
├── backend/           # Node.js/Express.js API server
├── database/          # Database scripts and configurations
├── .github/           # GitHub workflows and templates
├── .taskmaster/       # Task management configuration
└── .vscode/           # VS Code workspace settings
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khushveer007/SIH-2.0.git
   cd SIH-2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📝 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm test` - Run tests
- `npm run build` - Build the application for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Khushveer Singh
- **Project**: SIH 2.0 - Smart India Hackathon

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

*Built with ❤️ for students, by students*