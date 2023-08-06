import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedVerses,
  clearSelectedVerses,
} from "../features/collection/collectionSlice";
import { useGetAllVersesQuery } from "../features/api/apiSlice";

const DownloadVerses = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const selectedVerses = useSelector(selectSelectedVerses);

  const { downloadVerses } = useGetAllVersesQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      downloadVerses: selectedVerses.map((desc) => {
        return result.data.find((v) => v.desc === desc);
      }),
    }),
  });

  var doc = new jsPDF("p", "pt", "a4");
  doc.setFont("Inter-Regular", "normal");
 console.log(navigation.location)

  useEffect(()=>{
    doc.html(ref.current, {
        margin: 10,
        callback: function (doc) {
          doc.save(Date.now() + ".pdf");
        },
      });
      navigate("/");
    
  },[navigation.location])
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
      }}
    >
      $
      {downloadVerses
        .map((v) => `<p style="margin-bottom:14px;"> ${v.desc}: ${v.verse}</p>`)
        .join("")}
    </div>
  );
};

export default DownloadVerses;
