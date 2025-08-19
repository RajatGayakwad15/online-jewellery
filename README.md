# Kumthekar Furniture

**Kumthekar Furniture** is a modern e-commerce platform built for a premium furniture store located in **Kolhapur**. The website showcases a wide variety of home and office furniture with an intuitive and elegant shopping experience.

Our frontend is developed using **React**, **TypeScript**, and **Vite**, with **Tailwind CSS** and **shadcn/ui** for a stylish, responsive design. The application uses **TanStack Query** for efficient and optimized data-fetching and state management.

---

## 🧱 Tech Stack

- **React.js** – For building user interfaces using components and hooks.
- **TypeScript** – Ensures type safety and better developer tooling.
- **Vite** – Next-generation frontend tooling for fast builds and development.
- **Tailwind CSS** – Utility-first styling to craft responsive and clean UIs.
- **shadcn/ui** – For modern and accessible UI components built on top of Radix.
- **TanStack Query (React Query)** – Powerful data-fetching and caching mechanism.
- **Axios** – For making HTTP requests to the backend APIs.
- **TanStack Router** – For file based client-side routing.

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/centeratech/kumthekarfurniture.in-react-js.git
cd kumthekarfurniture.in-react-js
```

### 2. Install Dependencies

Install all required packages:

```bash
pnpm install
```

### 3. Configure Environment Variables

Create the following environment files by copying the structure from `.env.example`:

- **.env** – For production deployment.
- **.env.development** – For local development.

Make sure to set the appropriate API base URLs and keys in each.

---

## 🚀 Development

### Start Local Development Server

To run the project locally with the local backend:

```bash
pnpm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Start with Production Backend

If you want to test the frontend against the live backend:

```bash
pnpm run start
```

> ⚠️ Make sure the correct `.env` is used based on the mode.

---

## 📦 Deployment

### 1. Build for Production

To generate the optimized production build:

```bash
pnpm run build
```

This will output static files into the `dist/` directory.

### 2. Deploying to GitHub Pages (Optional)

If deploying to GitHub Pages:

```bash
pnpm run predeploy
pnpm run deploy
```

> You may need to configure `vite.config.ts` to set the correct `base` path for GitHub Pages.

---

## 💡 Features

- Full e-commerce flow: Product listing, filters, cart, checkout
- Responsive design for mobile and desktop
- Fast loading and optimized performance
- SEO-friendly architecture with clean routing
- Easily extensible with modular components and pages

---

## 📞 Contact

For inquiries or support, visit us at: [www.kumthekarfurniture.in](https://www.kumthekarfurniture.in)
# online-jewellery
