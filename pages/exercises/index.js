import { useState } from "react";
import ExerciseHeaderInfo from "./components/exerciseHeaderInfo";
import ExerciseHeaderTrainerInfo from "./components/exerciseHeaderTrainerInfo";
import ExerciseList from "./components/exerciseList";
import ExerciseModal from "./components/exerciseModal";

import { Grid } from "@mui/material";
import Head from "next/head";

import BluegymButton from "../../components/bluegymButton";
import cookies from "next-cookies";

function Exercises() {
  const [modal, setModal] = useState({
    open: false,
    type: "create",
  });

  const handleModalOpen = (e, type, item) => {
    const obj = { ...modal, open: true, type };
    if (item) {
      obj.item = item;
    }
    setModal(obj);
  };
  const handleModalClose = () => {
    setModal({ ...modal, open: false });
  };

  return (
    <>
      <Head>
        <title>Bluegym - 운동 관리</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ExerciseHeaderTrainerInfo />
        </Grid>
        <Grid item xs={12} md={4}>
          <ExerciseHeaderInfo />
        </Grid>
        <Grid item xs={12} md={12}>
          <ExerciseList handleModalOpen={handleModalOpen} />
        </Grid>
      </Grid>
      <ExerciseModal
        modal={modal}
        handleModal={handleModalOpen}
        handleClose={handleModalClose}
      />
    </>
  );
}

Exercises.getInitialProps = (ctx) => {
  const { SID } = cookies(ctx);
  if (SID) {
    console.log("ok sid");
  } else {
    console.log("no sid");
    // // ctx.res.writeHead(307, {Location})
    // ctx.res.writeHead(302, {
    //   Location: "/",
    // });
    // ctx.res.end();
  }
  return { props: {} };
};

export default Exercises;
