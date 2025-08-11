# Description

App to show the prices of the gas stations in Spain.
The data is obtained from https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help.<br/>It uses Next.js and React.js.

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

This application displays information about gas stations in Spain, including their location and fuel prices. The data is fetched from an external API and displayed on an interactive map.

### Features

- **Fetch Gas Stations**: Fetches gas station data from an external API.
- **Filter by Region**: Allows users to filter gas stations by autonomous community.
- **Filter by Geolocation**: Users can allow the app to access their device's location to find and display gas stations near them.
- **Filter by Municipality**: Allows users to filter gas stations by municipality.
- **Clear Filters**: Provides a button to clear all filters.
- **Interactive Map**: Gas stations are displayed as markers on a map using react-leaflet.
- **Map Centering & Zoom**: The map automatically centers and zooms to the user's GPS location when available.

### Components

- **Header**: Displays the title of the app and the date of the last update.
- **Select**: Dropdown component to select the community code.
- **InputField**: Input field component to enter the municipality.
- **ClearButton**: Button component to clear all selections.
- **StationCard**: Displays information about a single gas station.
- **Prefooter**: Component displayed before the main footer section.
- **Footer**: Bottom section component with additional information and links.
- **GasStationsMap**: Displays gas stations on a map with markers and popups using react-leaflet.
- **LocationButton**: Button to trigger geolocation and center the map.

### API Endpoints

- **/api/gas-stations**: Fetches all gas stations.
- **/api/gas-stations/[regionCode]**: Fetches gas stations for a specific community.
- **/api/region**: Fetches all autonomous communities (regions) data.

### Map Libraries

- **react-leaflet**: Used for rendering interactive maps in React.
- **leaflet**: Core mapping library for map rendering and marker management.

### Styling

The app uses CSS modules for styling. The main styles are defined in `app/page.module.css`.
