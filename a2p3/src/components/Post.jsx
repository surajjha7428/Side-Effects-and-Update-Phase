function Post({ first_name, last_name, email, avatar }) {
  return (
    <div className="user">
      <img
        src={avatar}
        alt={`${first_name} ${last_name}`}
        className="user-avatar"
      />
      <div>
        <p className="user-name">
          Name: {first_name} {last_name}
        </p>
        <p className="user-email">Email: {email}</p>
      </div>
    </div>
  );
}

export default Post;
