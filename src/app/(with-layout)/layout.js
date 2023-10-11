const { default: Navbar } = require("../components/navbar");

const WithLayout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default WithLayout;
