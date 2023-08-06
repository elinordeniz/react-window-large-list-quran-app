import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedVerses,
  clearSelectedVerses,
} from "../features/collection/collectionSlice";
import { useGetAllVersesQuery } from "../features/api/apiSlice";

const DownloadPdf = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const selectedVerses = useSelector(selectSelectedVerses);
if(!selectSelectedVerses.length){
    redirect("/");
}
  const { downloadVerses } = useGetAllVersesQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      downloadVerses: selectedVerses.map((desc) => {
        return result.data.find((v) => v.desc === desc);
      }),
    }),
  });

  var doc = new jsPDF("p", "pt", "a4", true);

  doc.setLanguage("tr");


    // doc.text("Lorem ipsum dolor şekilden çirkinlikçeşine görüldüğü üzere öğr dedimki sit amet consectetur adipisicing elit. Quod tempore necessitatibus voluptate earum quia dignissimos vel consectetur? Architecto totam officia praesentium voluptatem vitae harum sunt numquam. Id cum repellendus exercitationem?", 70,10)
    doc.html(ref.current, {
      margin: 10,
      callback: function (doc) {
        selectedVerses &&  doc.save(Date.now() + ".pdf");
        navigate("/");

      },
      autoPaging: "text",
      x: 15,
      y: 15,
    });

  return (
    <div
      ref={ref}
      style={{
        right: 0,
        top: 0,
        bottom: 0,
        height: "100%",
        width: "550px",
        padding: "20px",
        overflow: "auto",
        fontSize: "12px",
        fontFamily: "Roboto",
        fontWeight: "300",
      }}
    >
      <h1
        style={{
          fontSize: "15px",
          display: "flex",
          alignContent: "center",
          color: "#86a095",
          padding: "8px",
        }}
      >
        Meal Listesi {"  -  "} {new Date().toLocaleDateString()}
      </h1>

      {downloadVerses.map((v, key) => (
        <p
          key={key}
          style={{
            marginBottom: "12px",
            marginTop: "12px",
            padding: "8px",
            color: "rgb(81, 79, 79)",
          }}
        >
          {" "}
          <span style={{ color: "#86a095", fontWeight: 500 }}>
            {v.desc} :{" "}
          </span>{" "}
          {v.verse}
        </p>
      ))}
    </div>
  );
};

export default DownloadPdf;
