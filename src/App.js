import logo from "./logo.svg";
import "./App.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import theme from "./themes.js";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

function shuffleColors(colors) {
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  return colors;
}
function App() {
  const colors = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eigth",
    "ninth",
  ];

  const [colorCombination, setColorCombination] = useState(
    shuffleColors([...colors])
  );

  const [boxesColor, setBoxesColor] = useState(shuffleColors([...colors]));
  const [count, setCount] = useState(0);

  const handleSetCount = (newCount) => {
    setCount(newCount);
  };

  const handleSetColorCombination = () => {
    setColorCombination(shuffleColors([...colors]));
    setBoxesColor(shuffleColors([...colors]));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={4.7}></Grid>
        <Grid item xs={0} style={{ marginTop: "20px" }}>
          {colorCombination.map((color, index) => (
            <ColorSequence color={color} key={index} />
          ))}
        </Grid>

        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        {boxesColor.map((color, index) =>
          index % 3 === 0 ? (
            <>
              <Grid item xs={4} key={index}></Grid>
              <Grid item xs={0} key={index}>
                <ColorBox
                  color={color}
                  count={count}
                  setCount={handleSetCount}
                  setColorCombination={handleSetColorCombination}
                  colorCombination={colorCombination}
                />
              </Grid>
            </>
          ) : index === 2 || index === 5 || index === 8 ? (
            <>
              <Grid item xs={4} key={index}>
                <ColorBox
                  color={color}
                  count={count}
                  setCount={handleSetCount}
                  setColorCombination={handleSetColorCombination}
                  colorCombination={colorCombination}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={0} key={index}>
              <ColorBox
                color={color}
                count={count}
                setCount={handleSetCount}
                setColorCombination={handleSetColorCombination}
                colorCombination={colorCombination}
              />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}

function ColorSequence({ color }) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: 30,
          height: 30,
          backgroundColor: theme.palette[color].main,
          ml: 1,
          borderRadius: 0,
          display: "inline-block",
          m: 0,
          p: 0,
        }}
      ></Box>
    </ThemeProvider>
  );
}

function ColorBox({ color, colorCombination, count, setCount }) {
  const [buttonColor, setButtonColor] = useState("success");

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        className="colorBox"
        color={buttonColor}
        onClick={() => {
          if (colorCombination[count] === color) {
            setButtonColor(color);
            setCount(count + 1);
            if (count === colorCombination.length - 1) {
              window.location.reload();
            }
          }
        }}
      ></Button>
    </ThemeProvider>
  );
}

export default App;
