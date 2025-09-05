'use client';

import './request-details.scss';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import { SyntheticEvent } from 'react';

const RequestDetails = () => {
  const [value, setValue] = useState('headers');

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="request-details-editor">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Headers" value="headers" />
            <Tab label="Code" value="code" />
            <Tab label="Body" value="body" />
          </TabList>
        </Box>
        <TabPanel value="headers">Item One</TabPanel>
        <TabPanel value="code">Item Two</TabPanel>
        <TabPanel value="body">Item Three</TabPanel>
      </TabContext>
    </div>
  );
};

export default RequestDetails;
