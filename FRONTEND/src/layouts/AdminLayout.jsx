// layouts/AdminLayout.jsx
import Navbar from "../components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
