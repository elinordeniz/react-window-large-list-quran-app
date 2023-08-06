import Header from "./Header";
import VersesContainer from "./VersesContainer";

const Content = () => {
   console.log("Content")
  return (
    <main className="content">
      <Header />
      <VersesContainer />
    </main>
  );
};

export default Content;
