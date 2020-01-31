import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import PersonPinIcon from '@material-ui/icons/PersonPin';

// Tabs
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import PatientData from "./patient.json"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));


// Tabs

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const renderVisitInSidebar = () => {
  // console.log(PatientData)
  // console.log(Object.entries(PatientData.visits))
  return(
    Object.entries(PatientData.visits).map(([key, value], i)=> 
        <Tab label={value.date} {...a11yProps(i)} />
    )
  )
}

const renderVisit = (value) => {
  // console.log(PatientData)
  return(
    Object.entries(PatientData.visits).map(([key, v], i)=>
        <TabPanel value={value} index={i}>    
        {console.log(v)}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
                <TableRow key={key}>
                  <TableCell component="th" scope="row">{v.date}</TableCell>
                  <TableCell align="right">{v.time}</TableCell>
                  <TableCell align="right">{v.hospital}</TableCell>
                  <TableCell align="right">Vitals</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                <TableRow key={key}>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">{v.vitals.temperature}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
            </TableBody>
          </Table>
          </TableContainer>
        </TabPanel>
    )
  )
}


const VerticalTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {renderVisitInSidebar()}
      </Tabs>
    {renderVisit(value)}
    </div>
  );
}

const App = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <VerticalTabs></VerticalTabs>
    </div>
  );
};

export default App;
