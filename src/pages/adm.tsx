import Scanner from '../components/Scanner'
import '../css/adm.css'

function Adm() {

    return (
        <>
        <div className="welcome">
            <h1>Scanner</h1>
        </div>
        <div className={"scanner"}>
            <Scanner/>
        </div>
        </>
    )
}

export default Adm