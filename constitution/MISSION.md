# Mission

## Purpose

Gas Stations API is a public-facing web application that provides Spanish drivers with real-time access to fuel prices across all autonomous communities in Spain. The application transforms raw government data from the Ministerio de Industria, Comercio y Turismo into an intuitive, map-based interface that helps users find the cheapest fuel near them.

## Problem Statement

Fuel prices in Spain vary significantly between stations and regions. Drivers lack a unified, visual tool to compare prices geographically. The official government API provides raw data but no user-friendly interface.

## Solution

A single-page application that:

- Fetches daily fuel prices from the official government REST API
- Displays all gas stations on an interactive Leaflet map
- Color-codes markers by price (green = below average, yellow = average, red = above average, gray = closed)
- Filters by autonomous community and municipality
- Shows open/closed status based on parsing the `Horario` field
- Centers on user GPS location for nearby station discovery

## Target Users

- Spanish drivers looking for the cheapest fuel
- Travelers navigating unfamiliar regions
- Cost-conscious consumers comparing fuel types (Gasolina 95, 98, Gasóleo A, Gasóleo Premium)

## Constraints

- All data is sourced from `sedeaplicaciones.minetur.gob.es` (previous day only)
- UI is in Spanish (`lang="es"`)
- No authentication required — fully public
- No backend database — all data fetched at runtime from the government API
- Deployed on Vercel with zero-config

## Success Criteria

- Users can find the cheapest station within their area in under 30 seconds
- Map loads and displays markers within acceptable performance thresholds
- Application works on mobile, tablet, and desktop viewports
