import { useState } from 'react';
import '../styles/SearchPage.css';

const SearchPage = () => {
    // Sample data (you can extend this array for testing)
    const sampleData = [
        { gebruikersnaam: 'JohnDoe', locatie: 'Amsterdam', datum: '2024-07-15', tijd: '14:30', foto: 'path/to/photo1.jpg' },
        { gebruikersnaam: 'JaneSmith', locatie: 'Rotterdam', datum: '2024-07-14', tijd: '10:00', foto: 'path/to/photo2.jpg' },
        // Add more data as needed
        //...
    ];

    const [data, setData] = useState(sampleData);
    const [filters, setFilters] = useState({
        gebruikersnaam: '',
        locatie: '',
        datum: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredData = data.filter(row =>
        (filters.gebruikersnaam === '' || row.gebruikersnaam.toLowerCase().includes(filters.gebruikersnaam.toLowerCase())) &&
        (filters.locatie === '' || row.locatie.toLowerCase().includes(filters.locatie.toLowerCase())) &&
        (filters.datum === '' || row.datum === filters.datum)
    );

    // Calculate the current data to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Determine the total number of pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="search-page">
            <h1>Zoekresultaten</h1>
            <div className="filters">
                <input
                    type="text"
                    name="gebruikersnaam"
                    placeholder="Zoek op gebruikersnaam"
                    value={filters.gebruikersnaam}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="locatie"
                    placeholder="Zoek op locatie"
                    value={filters.locatie}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="datum"
                    placeholder="Zoek op datum"
                    value={filters.datum}
                    onChange={handleInputChange}
                />
            </div>
            <table className="search-table">
                <thead>
                <tr>
                    <th>Foto</th>
                    <th>Locatie</th>
                    <th>Datum</th>
                    <th>Tijd</th>
                    <th>Gebruikersnaam</th>
                </tr>
                </thead>
                <tbody>
                {currentData.map((row, index) => (
                    <tr key={index}>
                        <td>
                            <img src={row.foto} alt="Foto" className="photo" />
                        </td>
                        <td>{row.locatie}</td>
                        <td>{row.datum}</td>
                        <td>{row.tijd}</td>
                        <td>{row.gebruikersnaam}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;