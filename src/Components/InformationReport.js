import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTable } from "react-table";

//images
import Download from "../assets/download.png";

function InformationReport() {
  const [totalCount, setTotalCount] = useState(0);

  const countData = useMemo(
    () => [
      { location: "galle", count: 3 },
      { location: "Unawatuna", count: 1 },
      { location: "Hikkaduwa", count: 1 },
    ],
    []
  );

  const countDataFunction = () => {
    countData.map((count) => {
      setTotalCount((prev) => prev + count.count);
    });
  };

  useEffect(() => {
    countDataFunction();
  }, []);

  const data = useMemo(
    () => [
      { type: "Plastic Bottle", location: "Galle", date: "2023-02-23", desc: "I found this plastic bottle from Galle Jungle beach." },
      { type: "cigaratte butts", location: "Unawatuna", date: "2023-02-23", desc: "Cooking oil is the name of this bottle" },
      { type: "food wrappers and containers", location: "Hikkaduwa", date: "2023-02-23", desc: "" },
      { type: "Glass bottles", location: "Galle", date: "2023-02-23", desc: "Cooking oil is the naem of this bottle" },
      { type: "Metal can", location: "Negombo", date: "2023-02-23", desc: "I found this plastic bottle from Galle Jungle beach." },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: "Type of Litter", accessor: "type" },
      { Header: "Location", accessor: "location" },
      { Header: "Date of observed", accessor: "date" },
      { Header: "Description", accessor: "desc" },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } = tableInstance;

  return (
    <Container>
      <div className="container">
        <div className="background"></div>
        <div className="heading">
          Marine Litter Information Report
          <div className="download">
            <img src={Download} alt="download" />
            Download
          </div>
        </div>
        <div className="table-container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((header) => (
                    <th {...header.getHeaderProps()}>{header.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-container2">
          <table>
            <tbody>
              {countData.map((count) => (
                <tr>
                  <th>{`Number of Cases in ${count.location}`}</th>
                  <td>{count.count}</td>
                </tr>
              ))}
              <tr>
                <th>Total Number of Cases</th>
                <td>{totalCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

export default InformationReport;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;

  .container {
    width: max-content;
    height: max-content;
    position: relative;
    top: 130px;
    padding: 30px;
    z-index: 10;
    border-radius: 20px;
    overflow: hidden;

    .background {
      width: 100%;
      height: 100%;
      background-color: white;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0.8;
    }

    .heading {
      font-size: 1.5rem;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      .download {
        font-size: 1rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        column-gap: 10px;
        background-color: #00b4fc;
        padding: 10px 20px;
        cursor: pointer;

        &:hover {
          background-color: #005bc5;
        }

        img {
          width: 20px;
        }
      }
    }

    .table-container {
      table {
        width: 100%;
        border-collapse: collapse;

        thead {
          th {
            text-align: left;
            color: black;
            height: 40px;
            font-size: 0.8rem;
            padding-right: 30px;
          }
        }

        tbody {
          tr {
            height: 40px;

            td {
              padding-right: 30px;
              color: black;
              font-size: 0.8rem;
              border-bottom: 1px solid black;
              opacity: 0.8;
            }
          }
        }
      }
    }

    .table-container2 {
      margin-top: 50px;
      width: 100%;
      display: flex;
      justify-content: flex-end;

      table {
        border-collapse: collapse;

        tbody {
          tr {
            height: 40px;

            th {
              text-align: left;
              padding-right: 20px;
              font-size: 0.8rem;
              border-bottom: 1px solid black;
              border-right: 1px solid black;
            }

            td {
              padding-inline: 20px;
              font-size: 0.8rem;
              border-bottom: 1px solid black;
            }
          }
        }
      }
    }
  }
`;
