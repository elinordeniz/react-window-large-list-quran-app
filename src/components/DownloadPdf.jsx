import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedVerses,
  setDownloadClick,
  selectDownloadClicked,
} from "../features/collection/collectionSlice";
import { useGetAllVersesQuery } from "../features/api/apiSlice";

import pdfMake from "pdfmake/build/pdfmake.min";

pdfMake.fonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

const DownloadPdf = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedVerses = useSelector(selectSelectedVerses);
  const downloadClicked = useSelector(selectDownloadClicked);

  const { downloadVerses } = useGetAllVersesQuery("OneVerses", {
    selectFromResult: (result) => ({
      ...result,
      downloadVerses: selectedVerses.map((desc) => {
        return result.data.find((v) => v.desc === desc);
      }),
    }),
  });

  useEffect(() => {
    if (selectSelectedVerses.length === 0 || downloadClicked === false) {
      navigate("/");
    } else {
      dispatch(setDownloadClick(false));

      function buildTableBody(data, columns) {
        var body = [];

        data.forEach(function (row) {
          var dataRow = [];

          columns.forEach(function (column) {
            dataRow.push(row[column].toString());
          });

          body.push(dataRow);
        });

        return body;
      }

      function table(data, columns) {
        return {
          style: "table",
          table: {
            widths: [35, "auto"],
            body: buildTableBody(data, columns),
          },
          alignment: "left",
          layout: {
            paddingLeft: (i, node) => 12,
            paddingRight: (i, node) => 12,
            paddingTop: (i, node) => 12,
            paddingBottom: (i, node) => 12,
          },
        };
      }
      var docDefinition = {
        content: [
          {
            text: `Kuran Meal Listesi ${new Date().toLocaleDateString()}`,
            style: "subheader",
          },
          table(downloadVerses, ["desc", "verse"]),
        ],
        styles: {
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          table: {
            margin: [0, 5, 0, 15],
            padding: 10,
          },
        },
      };
      pdfMake.createPdf(docDefinition).download();
      navigate("/");
    }
  }, []);

  return null;
};

export default DownloadPdf;
