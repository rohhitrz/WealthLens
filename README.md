# WealthLens

WealthLens is a modern, responsive financial portfolio dashboard built with Next.js and TypeScript. It provides users with a comprehensive view of their investment portfolio, detailed performance analytics, and market insights.

![WealthLens Dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80)

## Features

- **Responsive Dashboard**: Clean, responsive interface that works across mobile, tablet, and desktop devices
- **Real-time Portfolio Tracking**: Monitor your portfolio's performance over different time periods (1W, 1M, 3M, YTD, 1Y)
- **Interactive Charts**: Visualize portfolio performance, asset allocation, and monthly returns
- **Holdings Management**: View and manage your portfolio holdings with sorting and filtering capabilities
- **Market Insights**: Access the latest market news and view top/worst performers
- **Dark/Light Mode**: Toggle between dark and light themes based on your preference
- **Customizable Settings**: Personalize your experience with notification and auto-refresh preferences

## Tech Stack

- **Frontend**: Next.js, TypeScript, SCSS Modules
- **UI Libraries**: Framer Motion (animations), React Icons
- **Charting**: ApexCharts for interactive data visualization
- **State Management**: React Hooks for local state management
- **Data Persistence**: LocalStorage for user preferences

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wealthlens.git
   cd wealthlens
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser to see the application.

## Project Structure

```
wealthlens/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── (dashboard)/ # Dashboard layout and pages
│   │   ├── globals.css  # Global styles
│   │   └── layout.tsx   # Root layout
│   ├── components/      # Reusable components
│   │   ├── charts/      # Chart components
│   │   ├── layout/      # Layout components
│   │   └── ThemeProvider.tsx # Theme context provider
│   ├── data/            # Mock data for the application
│   ├── styles/          # SCSS modules for component styling
│   └── types/           # TypeScript type definitions
├── next.config.js       # Next.js configuration
└── package.json         # Project dependencies and scripts
```

## Pages

### Dashboard
The main dashboard provides an overview of your portfolio performance with key metrics like total balance, profit/loss, and holdings count. It features an interactive performance chart and the latest market news.

### Portfolio
Displays a comprehensive list of your holdings with details like quantity, value, and change percentage. Each holding includes a sparkline chart showing its recent performance. You can sort holdings by different criteria and add new holdings.

### Insights
Offers detailed analysis of your portfolio with visualizations for asset allocation, top/worst performers, and monthly performance.

### Settings
Allows customization of the application experience, including theme selection and notification preferences.

## Development

### Styling
The application uses SCSS modules for component-specific styling. Global variables are defined in the `styles/variables.scss` file.

```scss
// Example of using SCSS variables
.button {
  background-color: var(--primary);
  border-radius: var(--radius-md);
}
```

### Adding New Features

To add a new feature:

1. Create any necessary components in the `components` directory
2. Add any required data models to the `types` directory
3. If needed, add mock data in the `data` directory
4. Create or modify the relevant page in the `app` directory

### Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment

The application can be deployed to any hosting platform that supports Next.js applications, such as Vercel, Netlify, or AWS Amplify.

```bash
# Example deployment to Vercel
vercel
```

## Future Enhancements

- **Authentication**: User registration and login functionality
- **Backend Integration**: Connect to a real financial data API
- **Portfolio Analytics**: Additional metrics and analytics for deeper insights
- **Notifications**: Real-time price alerts and portfolio updates
- **Mobile App**: Native mobile application using React Native

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern financial platforms
- Mock data generated for demonstration purposes
- Icons provided by React Icons library
- Images sourced from Unsplash
# WealthLens
