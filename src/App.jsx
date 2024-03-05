import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { Box, TextField } from "@mui/material";

function App() {
  const [dataTable, setDataTable] = useState([[]]);
  const [sum, setSum] = useState(0);

  const makeTable = (x, y) => {
    const table = [];
    for (let i = 0; i < x; i++) {
      table.push([]);
      for (let j = 0; j < y; j++) {
        table[i].push(0);
      }
    }
    return table;
  };

  const submitForm = (form) => {
    setDataTable(makeTable(form.x, form.y));
    setSum(form.sum);
  };

  const onChange = (e, a, b) => {
    setDataTable((prev) => {
      const newTable = [...prev];
      if (e === "") {
        e = 0;
      }
      newTable[b][a] = parseInt(e);

      const getLeftSlantSum = (array, row, col) => {
        return array.reduce((sum, rowArr, i) => {
          const j = col - row + i;
          if (j >= 0 && j < rowArr.length) {
            sum += rowArr[j];
          }
          return sum;
        }, 0);
      };

      const getRightSlantSum = (array, row, col) => {
        return array.reduce((sum, rowArr, i) => {
          const j = col + row - i;
          if (j >= 0 && j < rowArr.length) {
            sum += rowArr[j];
          }
          return sum;
        }, 0);
      };
      const sumDiognalLeft = getLeftSlantSum(newTable, b, a);
      const sumDiognalRight = getRightSlantSum(newTable, b, a);
      const sumRow = newTable[b].reduce((a, b) => a + b);
      const sumColumn = newTable.map((row) => row[a]).reduce((a, b) => a + b);

      if (
        sumRow > sum ||
        sumColumn > sum ||
        sumDiognalLeft > sum ||
        sumDiognalRight > sum
      ) {
        window.alert("You exceeded the sum limit");
      }
      return newTable;
    });
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Box sx={{ flex: "70%", mx: 2, mt: 10 }}>
        {dataTable?.map((row, i) => (
          <Box key={i} sx={{ display: "flex" }}>
            {row.map((cell, j) => (
              <TextField
                size="small"
                key={j}
                type="number"
                onChange={(e) => onChange(e.target.value, j, i)}
                variant="outlined"
              />
            ))}
          </Box>
        ))}
      </Box>
      <Form clickButton={submitForm} />
    </Box>
  );
}

export default App;
