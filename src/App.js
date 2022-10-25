import './App.css';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import File from "./components/File";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Image Viewer
          </Typography>
        </Toolbar>
      </AppBar>
      <File />
    </Box>

  );
}

export default App;
