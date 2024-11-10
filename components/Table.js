import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  th {
    text-align: left;
    text-transform: uppercase;
    color: #666;
    font-weight: 600;
    font-size: 0.8rem;
    padding: 12px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #e0e0e0;
  }

  td {
    padding: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 0.9rem;
  }

  tr:hover td {
    background-color: #f3f4f6;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
