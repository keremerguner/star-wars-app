import React from "react";

interface FilterProps {
  genderFilter: string;
  setGenderFilter: (value: string) => void;
  eyeColorFilter: string;
  setEyeColorFilter: (value: string) => void;
}

const FilterComponent: React.FC<FilterProps> = ({
  genderFilter,
  setGenderFilter,
  eyeColorFilter,
  setEyeColorFilter,
}) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-12 col-md-6 mb-2">
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

      <div className="col-sm-12 col-md-6 mb-2">
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
    </div>
  );
};

export default FilterComponent;
