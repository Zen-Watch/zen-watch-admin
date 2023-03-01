import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../../components/Header";
import IFTTTInstancesTopBar from "./IFTTTInstancesTopbar";
import IFTTTInstancesDataGrid from "./IFTTTInstancesDataGrid";

export default function IFTTTInstances() {

  const [data, setData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://example.com/api', {
        headers: {
          'x-api-key': 'my-api-key',
          'Content-Type': 'application/json'
        }
      });
  
      const json = await response.json();
      setData(json);
    };
  
    fetchData();
  }, []);
  

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="IFTTT Instances" subtitle="Create and manage your IFTTT instances" />
      </Box>
      <IFTTTInstancesTopBar />
      {data && (
        <IFTTTInstancesDataGrid data={data}/>
      )}
    </Box>
  );
}
