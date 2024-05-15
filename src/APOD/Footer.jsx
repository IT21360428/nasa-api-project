export default function APODFooter(props) {
    const { showModal, handleToggleModal, data } = props

    return (
        <div className="imgFooter">
            <div className="bgGradient"></div>
            <div>
                
                <h2>{data?.title}</h2>
            </div>
            <button onClick={handleToggleModal}>
                <i className="fa-solid fa-circle-info"></i>
            </button>
        </div>
    )
}