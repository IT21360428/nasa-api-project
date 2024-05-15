export default function Footer(props) {
    const { showModal, handleToggleModal, data } = props;
    return (
      <footer>
        <div className="bgGradient"></div>
        <div>
          <h1>{data?.camera.full_name}</h1>
          <h1>{data?.sol}</h1>
          <h2>{data?.earth_date}</h2>
          
        </div>
      </footer>
    );
  }