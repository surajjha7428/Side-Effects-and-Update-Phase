import { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";
import "../App.css";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchAndUpdateData(page) {
    setLoading(true);
    try {
      let res = await axios({
        method: "get",
        url: `https://reqres.in/api/users?page=${page}`,
      });

      setTotalPages(res.data.total_pages);
      setUsers(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAndUpdateData(page);
  }, [page]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <div id="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          PREVIOUS
        </button>
        <p>{page}</p>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          NEXT
        </button>
      </div>
      <h1>List of Users</h1>
      <div className="user-grid">
        {users?.map((user) => (
          <User {...user} key={user.id} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
