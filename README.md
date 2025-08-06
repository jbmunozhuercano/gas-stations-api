# Description

App to show the prices of the gas stations in Spain.
The data is optain from https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help.<br/>It uses next.js and React.js.

## Demo

Check out the live demo: [https://gas-stations-api-hazel.vercel.app](https://gas-stations-api-hazel.vercel.app)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## App Specifications

This application displays information about gas stations in Spain, including their location and fuel prices. The data is fetched from an external API and displayed in a paginated format.

### Features

- **Fetch Gas Stations**: Fetches gas station data from an external API.
- **Filter by Region**: Allows users to filter gas stations by autonomous community.
- **Filter by Geolocation**: Users can allow the app to access their device's location to find and display gas stations near them.
- **Filter by Municipality**: Allows users to filter gas stations by municipality.
- **Pagination**: Displays gas stations in a paginated format.
- **Clear Filters**: Provides a button to clear all filters.

### Components

- **Header**: Displays the title of the app and the date of the last update.
- **Select**: Dropdown component to select the community code.
- **PcInput**: Input field component to enter the postal code.
- **ClearButton**: Button component to clear all selections.
- **StationCard**: Displays information about a single gas station.
- **Pagination**: Handles the pagination of the gas station list.
- **Prefooter**: Component displayed before the main footer section.
- **Footer**: Bottom section component with additional information and links.

### API Endpoints

- **/api/gas-stations**: Fetches all gas stations.
- **/api/gas-stations/[regionCode]**: Fetches gas stations for a specific community.
- **/api/region**: Fetches all autonomous communities (regions) data.

### Styling

The app uses CSS modules for styling. The main styles are defined in `app/page.module.css`.
