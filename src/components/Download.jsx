import { TfiDownload, TfiLink, TfiClose } from "react-icons/tfi";
import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedVerses,
  clearSelectedVerses,
} from "../features/collection/collectionSlice";
import { useGetAllVersesQuery } from "../features/api/apiSlice";
import { renderToString } from "react-dom/server";
import { findDOMNode } from "react-dom";
import DownloadedText from "./DownloadedText";

const Download = () => {
  const ref = useRef(null);
  const [dm, setDm] = useState();
  console.log("Download");
  const selectedVerses = useSelector(selectSelectedVerses);
  const dispatch = useDispatch();

  const { downloadVerses } = useGetAllVersesQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      downloadVerses: selectedVerses?.map((desc) => {
        return result.data.find((v) => v.desc === desc);
      }),
    }),
  });
  console.log(downloadVerses);
  // style={{color:"purple", fontSize:"10px", width:"100%", padding:"10px"}}


  const savePDF = () => {
    
    var htmlText = `<div style="color: purple; font-size:10px; width:100%; padding:10px">${downloadVerses
      .map((v) => {
        return `<p> ${v.desc}: ${v.verse}</p>`;
      })
      .join("")}</div>`;

    var htmlObj = document.createElement("div");
    htmlObj.innerHTML = htmlText;
    htmlObj.style.width = "100%";
    console.log(htmlObj);

    var doc = new jsPDF("p", "pt", "a4");
    doc.html(ref.current, {
      callback: function (doc) {
        doc.save(Date.now() + ".pdf");
      },
      x: 30,
      y: 30,
    });
  };

  return (
    <div className="download">
      <div className="actions">
        <button onClick={() => savePDF()}>
          PDF <TfiDownload />
        </button>
        <div id="hell" className="verse" >
          <p
          

            style={{
              color: "purple",
              fontSize: "10px",
              width: "100%",
              padding: "10px",
            }}
          >
            Hello malatya, Ne var ne yok orda.Hello malatya, Ne var ne yok
            orda.Hello malatya, Ne var ne yok orda.Hello malatya, Ne var ne yok
            orda.Hello malatya, Ne var ne yok orda.Hello malatya, Ne var ne yok
            orda.Hello malatya, Ne var ne yok orda.Hello malatya, Ne var ne yok
            orda.
          </p>
        </div>
        <button>
          <TfiLink />
        </button>
      </div>
      <div className="selected" onClick={() => dispatch(clearSelectedVerses())}>
        <TfiClose />
        {selectedVerses?.length} ayet toplandı.
      </div>
    </div>
  );
};

export default Download;
