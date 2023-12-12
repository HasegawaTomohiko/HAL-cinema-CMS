import SampleSideMenu from "@/components/sideMenu";
import Table from '@mui/material/Table';
import BasicModalButton from "@/components/schedule/addScheduleButton";
import BasicModal from "@/components/formModal/addSchedule";
import CustomizedTables from "@/components/schedule/table";
import ScrollableTabsButtonAuto from "@/components/schedule/ScheduledDate";
import ScrollableTabsButtonAuto2 from "@/components/schedule/screen";
import React from "react";


export default function schedule(props) {
  const [open, setOpen] = React.useState(false);

  const btnClick = () => {
    setOpen(true);
  }

  const formClose = () => {
    setOpen(false);
  }

return (
  <>
    <SampleSideMenu menutitle="スケジュール情報"/>

    <BasicModalButton onClick={btnClick}/>
    <BasicModal open={open} onClose={formClose}/>
    <ScrollableTabsButtonAuto />
    <ScrollableTabsButtonAuto2 />

    <CustomizedTables />

  </>
);
}