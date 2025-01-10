import React, { useState, useEffect, useCallback } from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import LabelInput from "src/generics/fields/LabelInput";
import PeerTable2 from "src/generics/table/PeerTable2";
import { apiGetCall } from "src/generics/APIFunctions";
import moment from "moment";
import { API_URL } from "../util/config";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CheckListDetails from "./Tables_CC/CheckListDetails";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import LinearProgress from "@material-ui/core/LinearProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "73%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "8px",
};

const CheckList = () => {
  const [checkList, setCheckList] = useState([]);
  const [startDate, setStartDate] = useState(
    moment().add(-15, "days").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().add(+1, "days").format("YYYY-MM-DD")
  );
  const [inputStartDate, setInputStartDate] = useState(startDate);
  const [inputEndDate, setInputEndDate] = useState(endDate);
  const [columns, setColumns] = useState([]);
  const [driverCode, setDriverCode] = useState("");
  const [field, setField] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(20);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const generateColumns = async () => {
    const column = [
      {
        field: "DriverCode",
        headerName: "DriverCode",
        sortable: true,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
      },
    ];

    for (let i = 1; i <= 15; i++) {
      const dateToDisplay = moment(startDate).add(i, "days");
      column.push({
        field: dateToDisplay.format("YYYY-MM-DD"),
        type: "button",
        headerName: dateToDisplay.format("YYYY-MM-DD"),
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        width: 85,
      });
    }
    setColumns(column);
  };

  const normalizeRow = (array) => {
    generateColumns();
    if (array) {
      const newArray = [];
      const dates = Array.from({ length: 16 }, (_, i) =>
        moment(startDate).add(i, "days").format("YYYY-MM-DD")
      );

      array.forEach((obj) => {
        const row = { DriverCode: obj.DriverCode };
        const arrayOfCheckListStatus = obj.CheckListStatus.map((obj1) => ({
          date: obj1.CheckListDate.slice(0, 10),
          status: obj1.Status,
        }));

        dates.forEach((date) => {
          const item = arrayOfCheckListStatus.find(
            (item) => item.date === date
          );
          row[date] = item
            ? item.status === "P"
              ? "PASS"
              : item.status === "F"
              ? "FAILED"
              : item.status === "R"
              ? "RESOLVED"
              : ""
            : "";
        });

        newArray.push(row);
      });

      setCheckList(newArray);
    }
  };

  const fetchData = () => {
    setIsLoading(true);
    const url = `${API_URL}centralcontol/checklistenquiry?fromDate=${startDate}&toDate=${endDate}`;
    setCheckList([]);

    apiGetCall(
      url,
      (data) => {
        normalizeRow(data.ResultSet);
        setIsLoading(false);
      },
      (error) => console.error(error)
    );
  };

  const handleGoClick = () => {
    setStartDate(inputStartDate); // Update start date
    setEndDate(inputEndDate); // Update end date
    generateColumns(); // Generate columns based on selected dates
    fetchData(); // Fetch data based on selected dates
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <React.Fragment>
      <CCard>
        <CCardHeader className="headerEQ">Check List Enquiry</CCardHeader>
        <CCardBody>
          <div className="row">
            <div className="col-lg-2">
              <LabelInput
                type="date"
                name="startdate"
                label="Start Date"
                value={inputStartDate}
                onChange={(e) => setInputStartDate(e.target.value)}
              />
            </div>
            <div className="col-lg-2">
              <LabelInput
                type="date"
                name="todate"
                label="End Date"
                disabled
                value={inputEndDate}
              />
            </div>
            <div className="col-lg-2">
              <Button
                style={{ marginTop: 45, backgroundColor: "black" }}
                variant="contained"
                onClick={handleGoClick}
              >
                GO <PlayCircleFilledIcon style={{ marginLeft: 9 }} />
              </Button>
            </div>
          </div>
          <br />
          <br />
          {!isLoading ? (
            <PeerTable2
              name="CheckList"
              data={checkList}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              rowsPerPageOptions={[10, 20, 50, 75, 100]}
              rowHeight={32}
              style={{ fontSize: "10px", width: "100%" }}
              headerHeight={40}
              columns={columns}
              componentsProps={{
                pagination: {
                  sx: {
                   
                    "& .MuiSelect-select": {
                    
                      transform: "translateY(20%)",
                    },
                    
                  },
                },
              }}
              onCellDoubleClick={(e) => {
                setField(e.field);
                setDriverCode(e.row.DriverCode);
                handleOpen();
              }}
              getCellClassName={(params) =>
                params.value === "PASS"
                  ? "pass"
                  : params.value === "FAILED"
                  ? "fail"
                  : params.value === "RESOLVED"
                  ? "resolved"
                  : ""
              }
            />
          ) : (
            <LinearProgress />
          )}

          <Modal
            className="modalsize"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CheckListDetails field={field} DriverCode={driverCode} />
            </Box>
          </Modal>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
};

export default CheckList;
