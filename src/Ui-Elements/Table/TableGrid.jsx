import React, { useEffect, useState, useRef } from "react";
import SvgIcon from "../../SvgIcon/SvgIcon";

const TableGrid = ({ columns = [], footerData = [], data = [] }) => {
  const [tableData, setTableData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [activeRowId, setActiveRowId] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);

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

  // 🔴 Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setActiveRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mg-table-grid mr-3">
      <div className="fixed-height-table">
        <table className="w-full border-collapse [&_th]:border-b [&_td]:border-b text-left">
          <thead className="bg-gray-100">
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
                  className="px-3 py-2 align-middle"
                >
                  {col.label}
                  {getArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        <div className="scrollable-body overflow-y-auto">
          <table className="w-full border-collapse [&_td]:border-b text-left">
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-3">
                    No data found
                  </td>
                </tr>
              ) : (
                tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        style={{
                          width: col.width || "auto",
                          minWidth: col.minWidth || "auto",
                        }}
                        className="px-3 py-2 align-middle"
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
                        ) : col.type === "action" ? (
                          <div
                            className="relative inline-block"
                            style={{ width: col.width }}
                          >
                            <div
                              onClick={(e) => {
                                setActiveRowId(row._id);
                                const rect =
                                  e.currentTarget.getBoundingClientRect();
                                setPopupPosition({
                                  top: rect.bottom + window.scrollY,
                                  left: rect.right - 120 + window.scrollX,
                                });
                              }}
                              className="cursor-pointer"
                            >
                              <SvgIcon
                                name="threedot"
                                width={20}
                                height={20}
                                className="cursor-pointer"
                              />
                            </div>

                            {activeRowId === row._id && (
                              <div
                                ref={popupRef}
                                className="fixed bg-white border shadow rounded p-2"
                                style={{
                                  top: popupPosition.top,
                                  left: popupPosition.left,
                                  zIndex: 1000,
                                  width: "120px",
                                }}
                              >
                                {col.actions?.map((action, i) => (
                                  <div
                                    key={i}
                                    className={`px-2 py-1 rounded hover:bg-gray-100 cursor-pointer ${
                                      action.className || ""
                                    }`}
                                    onClick={() => {
                                      action.onClick(row);
                                      setActiveRowId(null);
                                    }}
                                  >
                                    {action.label}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
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

        <div className="table-footer">
          {footerData.length ? (
            <table className="w-full border-collapse [&_th]:border-b text-left">
              <thead className="bg-gray-100">
                <tr>
                  {footerData.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => col.sort && handleSort(col.key)}
                      style={{
                        width: col.width || "auto",
                        minWidth: col.minWidth || "auto",
                      }}
                      className="px-3 py-2 align-middle"
                    >
                      {col.label}
                      {getArrow(col.key)}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TableGrid;
