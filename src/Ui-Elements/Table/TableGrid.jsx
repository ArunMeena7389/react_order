import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableGrid.scss";

const TableGrid = ({ columns = [], data = [] }) => {
  const [tableData, setTableData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // 🔁 Sync prop data when it changes
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...tableData].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      } else {
        return direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });

    setTableData(sorted);
    setSortConfig({ key, direction });
  };

  const getArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className="mg-table-grid mr-3">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sort && handleSort(col.key)}
                style={{
                  cursor: col.sort ? "pointer" : "default",
                  width: col.width || "auto",
                  minWidth: col.minWidth || "auto",
                }}
              >
                {col.label}
                {getArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data found
              </td>
            </tr>
          ) : (
            tableData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      width: col.width || "auto",
                      minWidth: col.minWidth || "auto",
                    }}
                  >
                    {col.type === "image" ? (
                      <img
                        src={row[col.key]}
                        alt={col.label}
                        style={{
                          width: col.imageWidth || "50px",
                          height: col.imageHeight || "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableGrid;
