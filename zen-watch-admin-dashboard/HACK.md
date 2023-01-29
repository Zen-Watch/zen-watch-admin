# Leftovers

#### Enabling scenes other than /home
* [Enabled them on App.tsx, Sidebar.jsx - rewire accordingly, uncomment commented portions on the mentioned files - Check this Commit](https://github.com/sgdheeban/zen-watch-admin/commit/c91619e36311fe610cbd7a30cf1550a94dd16e1c)

#### Nivo Line chart, slicing
```
      // enableSlices="x"
      // sliceTooltip={({ slice }) => {
      //   updateLastTxnHash(slice.points[0].data.txn_hash)
      //   return (
      //     <div
      //       style={{
      //         background: colors.grey[500],
      //         padding: "9px 12px",
      //       }}
      //     >
      //       {slice.points.map((point) => (
      //         <div
      //           key={point.id}
      //           style={{
      //             color: point.serieColor,
      //             padding: "3px 0",
      //           }}
      //         >
      //           <strong>{point.serieId}</strong> [{point.data.yFormatted}]
      //         </div>
      //       ))}
      //     </div>
      //   );
      // }}
```

#### Nivo DataGrid mock data
```
  // const columns = [
  //   { field: "id", headerName: "ID", flex: 0.5 },
  //   { field: "registrarId", headerName: "Registrar ID" },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     flex: 1,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     headerAlign: "left",
  //     align: "left",
  //   },
  //   {
  //     field: "phone",
  //     headerName: "Phone Number",
  //     flex: 1,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     flex: 1,
  //   },
  //   {
  //     field: "address",
  //     headerName: "Address",
  //     flex: 1,
  //   },
  //   {
  //     field: "city",
  //     headerName: "City",
  //     flex: 1,
  //   },
  //   {
  //     field: "zipCode",
  //     headerName: "Zip Code",
  //     flex: 1,
  //   },
  // ];

```