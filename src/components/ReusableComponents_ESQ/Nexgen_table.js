import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";

const NexgenTable = ({
  initialFilters,
  data,
  additionalFilters = {},
  handleSort,
  sortedColumn,
  sortOrder,
  loading,
  selectedOptionMap,
  isSortIconVisible,
  setSortIconVisibility,
  sortByColumn,
  getCalculatedTableData,
  handleButtonClick,
  ProductTableMap,
  columns,
}) => {
  // Define useTableFilter hook inside NdzTable
  const useTableFilter = (initialFilters, data, additionalFilters = {}) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleFilterChange = (column, value) => {
      setFilters({
        ...filters,
        [column]: value.toUpperCase(),
      });
    };

    const filteredData = useMemo(() => {
      return data
        ? data.filter((row) => {
            return Object.keys(filters).every((key) => {
              if (!filters[key]) return true;

              if (additionalFilters[key]) {
                return additionalFilters[key](row[key], filters[key], row);
              }

              return row[key]?.toUpperCase().includes(filters[key]);
            });
          })
        : [];
    }, [filters, data, additionalFilters]);

    return { filters, handleFilterChange, filteredData };
  };

  const { filters, handleFilterChange, filteredData } = useTableFilter(
    initialFilters,
    data,
    additionalFilters
  );
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const handleRowClick = (item, index) => {
    setClickedRowIndex(index);
    setIsDoubleClicked(!isDoubleClicked);
    getCalculatedTableData(item, index);
  };

  return (
    <div className="Qt-ProductTable">
      <table className="tableQt-ProductTable" style={{ marginTop: "10px" }}>
        <thead
          className="tableQt-ProductTable-grey-header"
          style={{
            height: "3px",
            position: "sticky",
            top: "0",
            fontSize: "11px",
          }}
        >
          <tr>
            {columns.map((column, index) => (
              <th key={index}>
                <input
                  type="text"
                  placeholder=""
                  value={filters[column.field]}
                  onChange={(e) =>
                    handleFilterChange(column.field, e.target.value)
                  }
                  style={{ width: column.width }}
                />
              </th>
            ))}
            <th colSpan="6">
              <input
                type="text"
                placeholder=""
                disabled
                style={{
                  width: "600px",
                  backgroundColor: "rgba(247, 247, 247, 0.923)",
                  border: "2px solid white",
                }}
              />
            </th>
          </tr>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{ width: column.width }}
                onClick={() => handleSort(column.field)}
                onMouseEnter={() => setSortIconVisibility(true)}
                onMouseLeave={() => setSortIconVisibility(false)}
              >
                {column.label}
                {isSortIconVisible && sortedColumn === column.field && (
                  <span className="sortIcon">
                    {sortOrder === "asc" ? " 🔼" : " 🔽"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="19">
                <LinearProgress style={{ width: "100%" }} />
              </td>
            </tr>
          )}
          {!loading &&
            (filteredData.length > 0 ? (
              sortByColumn(filteredData, sortedColumn, sortOrder).map(
                (item, index) => (
                  <tr
                    key={index}
                    className={`productThover-effect ${
                      isDoubleClicked && clickedRowIndex === index
                        ? "popup-animation"
                        : ""
                    }`}
                    onDoubleClick={() => handleRowClick(item, index)}
                    style={
                      item.ColorRow
                        ? {
                            backgroundColor: "rgb(102, 152, 175)",
                            color: "black",
                            fontSize: "9px",
                            height: "5px",
                            marginBottom: "0px",
                            padding: "0px",
                            marginTop: "0px",
                            cursor: "pointer",
                          }
                        : {
                            backgroundColor: item.Is_available
                              ? ""
                              : "rgb(247, 206, 159)",
                            fontSize: "9px",
                            color: "black",
                            height: "5px",
                            marginBottom: "0px",
                            padding: "0px",
                            marginTop: "0px",
                          }
                    }
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>{item[column.field]}</td>
                    ))}
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="19">No data available</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

NdzTable.propTypes = {
  initialFilters: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  additionalFilters: PropTypes.object,
  handleSort: PropTypes.func.isRequired,
  sortedColumn: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedOptionMap: PropTypes.string.isRequired,
  isSortIconVisible: PropTypes.bool.isRequired,
  setSortIconVisibility: PropTypes.func.isRequired,
  sortByColumn: PropTypes.func.isRequired,
  getCalculatedTableData: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  ProductTableMap: PropTypes.any.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NdzTable;
