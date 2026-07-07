# Comment Directory

A React application that displays comments from the JSONPlaceholder API with pagination and responsive design.

## Technologies

- React 19
- TypeScript
- Vite
- CSS
- TanStack Query

## How to Run

1. Clone the repository:
```bash
git clone <repository-url>
cd react-comments-list
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env.local file in the project root with your API configuration (see Environment Variable section below).

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Environment Variable

Create a .env.local file in the project root with the following content:

```
VITE_API_URL=https://jsonplaceholder.typicode.com/comments
```

A .env.example file is included in the repository to document the required configuration. After creating or modifying .env.local, restart the development server for changes to take effect.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally