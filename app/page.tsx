'use client';
import {useState, useEffect, useCallback, ReactNode, useMemo} from 'react';
import debounce from 'lodash.debounce';
import classes from './page.module.css';
import RegionSelector from './components/Main/Filter/RegionSelector';
import SearchTerm from './components/Main/Filter/SearchTerm';
import ClearButton from './components/Main/Filter/ClearButton';
import StationCard from './components/Main/StationCard';
import Pagination from './components/Main/Pagination';
import {fetchStations, RegionCode, Station} from './api';

export default function Home(): ReactNode {
  const itemsPerPage = 20; // Number of items to display per page
  const [loading, setLoading] = useState(false);
  const [regionStations, setRegionStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [regionCode, setRegionCode] = useState<RegionCode>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const loadStations = useCallback(async (regionCode: RegionCode) => {
    setError(null);
    if (!regionCode) {
      setRegionStations([]);
      return;
    }

    setLoading(true);
    try {
      setRegionStations(await fetchStations(regionCode));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Ha ocurrido un error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterStations = useMemo(
    () =>
      debounce((stations: Station[], town: string | null) => {
        const lowerCaseTown = town?.toLowerCase() || '';
        setFilteredStations(
          stations.filter(station =>
            station['Municipio'].toLocaleLowerCase().includes(lowerCaseTown)
          )
        );
      }, 300),
    []
  );

  const currentStations = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return filteredStations.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredStations]);

  // Fetch all stations data on component mount
  // useEffect(() => {
  //   fetchStations('/api/gas-stations');
  // }, []);

  useEffect(() => {
    filterStations(regionStations, searchTerm);
  }, [searchTerm, regionStations, filterStations]);

  useEffect(() => {
    console.log('*** regionCode', regionCode);

    loadStations(regionCode);
  }, [loadStations, regionCode]);

  const clearSelections = useCallback(() => {
    setRegionCode(null);
    setSearchTerm(null);
  }, []);

  return (
    <main className={classes.container}>
      <div className={classes.listHeader}>
        <RegionSelector
          regionCode={regionCode}
          onRegionChange={setRegionCode}
        />
        {error && <p style={{color: 'red'}}>{error}</p>}

        <SearchTerm
          type='text'
          placeholder='Introduce el municipio'
          term={searchTerm}
          onTermChange={setSearchTerm}
        />

        <ClearButton onClear={clearSelections} />
      </div>

      {loading ? (
        <h3 className={classes.loading}>Cargando...</h3>
      ) : (
        <div className={classes.cardsContainer}>
          {currentStations.map((station, index) => (
            <StationCard key={index} station={station} loading={loading} />
          ))}
        </div>
      )}

      {itemsPerPage < filteredStations.length && (
        <Pagination
          totalItems={filteredStations.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}
