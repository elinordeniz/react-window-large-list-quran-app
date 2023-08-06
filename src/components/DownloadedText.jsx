
const DownloadedText = ({downloadVerses}) => {

  return <div style={{fontFamily: "'Roboto', sans-serif", fontSize:"11px"}}>{downloadVerses?.map((v) =>  `<p style={{marginBottom:"15px"}} ${v.desc}: ${v.verse}</p>`).join("")}</div>
}


export default DownloadedText