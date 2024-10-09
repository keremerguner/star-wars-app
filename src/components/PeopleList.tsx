import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../queries";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const PeopleList: React.FC = () => {
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [eyeColorFilter, setEyeColorFilter] = useState<string>("all"); // Yeni: Eye color filtresi
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const { loading, error, data } = useQuery(GET_PEOPLE, {
    variables: { first: 82 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredPeople = data.allPeople.people.filter((person: any) => {
    const genderMatch =
      genderFilter === "all" || person.gender === genderFilter;
    const eyeColorMatch =
      eyeColorFilter === "all" || person.eyeColor === eyeColorFilter; // Yeni: Eye color filtresi
    return genderMatch && eyeColorMatch;
  });

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedPeople = filteredPeople.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(paginatedPeople);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `people_page_${page}.xlsx`);
  };

  return (
    <div>
      <h2>Star Wars Characters</h2>

      {/* Filtre dropdown menüsü - Gender */}
      <label htmlFor="genderFilter">Filter by Gender: </label>
      <select
        id="genderFilter"
        value={genderFilter}
        onChange={(e) => {
          setGenderFilter(e.target.value);
          setPage(1);
        }}
      >
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="n/a">N/A</option>
      </select>

      {/* Filtre dropdown menüsü - Eye Color */}
      <label htmlFor="eyeColorFilter">Filter by Eye Color: </label>
      <select
        id="eyeColorFilter"
        value={eyeColorFilter}
        onChange={(e) => {
          setEyeColorFilter(e.target.value);
          setPage(1);
        }}
      >
        <option value="all">All</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="brown">Brown</option>
        <option value="red">Red</option>
        <option value="blue-gray">Blue-Gray</option>
      </select>

      {/* Sayfa başına gösterilecek öğe sayısını seçme */}
      <label htmlFor="itemsPerPage">Items per Page: </label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          setPage(1);
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>

      <ul>
        {paginatedPeople.map((person: any) => (
          <li key={person.name}>
            <p>Name: {person.name}</p>
            <p>Gender: {person.gender}</p>
            <p>Eye Color: {person.eyeColor}</p>
          </li>
        ))}
      </ul>

      {/* Sayfalama düğmeleri */}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Excel çıktısı düğmesi */}
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default PeopleList;
