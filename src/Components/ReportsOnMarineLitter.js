import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import axios from "axios";

//images
import Image from "../assets/image.png";
import Search from "../assets/search.png";

//constants
const API_URL = "http://localhost:8080";

function ReportsOnMarineLitter() {
  const [loaded, setLoaded] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/getReports`)
      .then((result) => {
        if (!result.data.error) {
          console.log(result.data.message);
          setFetchedData([...result.data.message]);
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Type of Litter", accessor: "typeOfLitter" },
      { Header: "Location", accessor: "location" },
      { Header: "Date of observed", accessor: "date" },
      { Header: "Description", accessor: "desc" },
      { Header: "Images", accessor: "images" },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: fetchedData });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <Container>
      <div className="search-report">
        <div className="search">
          <img src={Search} alt="maginifier" />
          <input type="text" name="search" id="search" placeholder="Search Report" />
        </div>
      </div>
      <div className="table-container">
        <div className="background"></div>
        <div className="heading">Reports on Marine Litter</div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, key) => (
                  <th {...column.getHeaderProps()} key={key}>
                    {column.render("Header")}
                  </th>
                ))}
                <th></th>
                <th></th>
              </tr>
            ))}
          </thead>
          {loaded ? (
            <>
              {fetchedData.length > 0 ? (
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <>
                              {cell.column.id !== "images" ? (
                                <>
                                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                </>
                              ) : (
                                <>
                                  <td>
                                    {cell.value.map((data, key) => (
                                      <img src={Image} key={key} alt="imagewrapper" />
                                    ))}
                                  </td>
                                </>
                              )}
                            </>
                          );
                        })}
                        <td>
                          <button className="edit">Edit</button>
                        </td>
                        <td>
                          <button className="delete">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr className="loading">
                    <td>No data available</td>
                  </tr>
                </tbody>
              )}
            </>
          ) : (
            <tbody>
              <tr className="loading">
                <td>Loading</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </Container>
  );
}

export default ReportsOnMarineLitter;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  .search-report {
    width: 80%;
    height: max-content;
    display: flex;
    justify-content: flex-end;
    position: relative;
    top: 110px;
    z-index: 10;

    .search {
      position: relative;
      width: 200px;
      height: 35px;

      input {
        width: 100%;
        height: 100%;
        padding-left: 35px;
        font-size: 0.8rem;
        outline: none;
        border: none;
        border-radius: 12px;
      }

      img {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 15px;
      }
    }
  }

  .table-container {
    width: 80%;
    height: max-content;
    position: relative;
    top: 130px;
    padding: 30px;
    z-index: 10;
    border-radius: 20px;
    overflow: hidden;
  }

  .background {
    width: 100%;
    height: 100%;
    background-color: #427ea0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.7;
  }

  .heading {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 30px;
    font-weight: 600;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      th {
        text-align: left;
        color: white;
        height: 40px;
        font-size: 0.8rem;
      }
    }

    tbody {
      tr {
        height: 40px;

        td {
          color: white;
          font-size: 0.8rem;
          border-bottom: 1px solid white;
          padding-top: 10px;
          padding-bottom: 10px;
          opacity: 0.8;
          max-width: 450px;

          img {
            width: 20px;
            margin-right: 10px;
          }

          button {
            padding: 5px 20px;
            font-size: 0.6rem;
            border: none;
            cursor: pointer;
            font-weight: 600;

            &.edit {
              background-color: #00b4fc;
              &:hover {
                background-color: #005bc5;
              }
            }

            &.delete {
              background-color: #f57576;

              &:hover {
                background-color: #fd0a54;
              }
            }
          }
        }

        &.loading {
          td {
            border-bottom: none;
          }
        }
      }
    }
  }
`;
