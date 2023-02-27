import Link from "next/link";

function Pagination() {
  return (
    <div
      style={{
        marginTop: "50px",
        textAlign: "center",
        alignItems: "center",
        fontWeight: "normal",
      }}
    >
      <span style={{ fontSize: "normal", color: "black" }}>
        Showing <span style={{ color: "orange", fontWeight: "bold" }}>1</span>{" "}
        to <span style={{ color: "orange", fontWeight: "bold" }}>10</span> of{" "}
        <span style={{ color: "orange", fontWeight: "bold" }}>100</span> Entries
      </span>

      <div style={{ display: "inline-flex", paddingLeft: "150px" }}>
        <Link href="/">
          <i className="icon-left"></i>
        </Link>

        <Link href="/">
          <i style={{ paddingLeft: "50px" }} className="icon-right"></i>
        </Link>
      </div>
    </div>
  );
}

Pagination.defaultProps = {};

export default Pagination;
