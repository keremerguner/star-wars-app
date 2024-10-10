import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../queries/queries";
import { exportToExcel } from "../utils/excelExport";

const PeopleList: React.FC = () => {
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [eyeColorFilter, setEyeColorFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const { loading, error, data } = useQuery(GET_PEOPLE, {
    variables: { first: 82 },
  });

  const peopleData = data?.allPeople?.people || [];

  const filteredPeople = useMemo(() => {
    return peopleData.filter((person: any) => {
      const genderMatch =
        genderFilter === "all" || person.gender === genderFilter;
      const eyeColorMatch =
        eyeColorFilter === "all" || person.eyeColor === eyeColorFilter;
      return genderMatch && eyeColorMatch;
    });
  }, [peopleData, genderFilter, eyeColorFilter]);

  const paginatedPeople = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredPeople.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPeople, page, itemsPerPage]);

  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);

  return (
    <div className="container">
      <h2 className="text-center my-4">Star Wars Characters</h2>
      {/* Filtreleme alanı */}
      <div className="row mb-3">
        <div className="col-sm-12 col-md-4 mb-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Filter by Gender:</span>
            </div>
            <select
              className="custom-select"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="n/a">n/a</option>
            </select>
          </div>
        </div>

        <div className="col-sm-12 col-md-4 mb-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Filter by Eye Color:</span>
            </div>
            <select
              className="custom-select"
              value={eyeColorFilter}
              onChange={(e) => setEyeColorFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
              <option value="red">Red</option>
              <option value="brown">Brown</option>
            </select>
          </div>
        </div>

        {/* Items per Page */}
        <div className="col-sm-12 col-md-4 mb-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Items per Page:</span>
            </div>
            <select
              className="custom-select"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
      {/* Yükleme veya hata durumunu göster */}
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner"></div>
        </div>
      )}

      {error && <p className="text-center text-danger">Error fetching data.</p>}
      {!loading && !error && paginatedPeople.length === 0 && (
        <p className="text-center">No characters found.</p>
      )}
      {/* Tablo */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Eye Color</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPeople.map((person: any) => (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.gender}</td>
                <td>{person.eyeColor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Sayfalama */}
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </li>
            <li className="page-item">
              <span className="page-link">
                Page {page} of {totalPages}
              </span>
            </li>
            <li
              className={`page-item ${page === totalPages ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(page + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Excel çıktısı düğmesi */}
      <div className="text-center my-3">
        <button
          className="btn btn-success"
          onClick={() =>
            exportToExcel(paginatedPeople, `people_page_${page}.xlsx`)
          }
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
};

export default PeopleList;
