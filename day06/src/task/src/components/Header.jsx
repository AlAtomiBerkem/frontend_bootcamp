import '../styles/Header.css';

const Header = ({ timer, studInfo }) => {
    return (
        <div className='wrapner'>
            <div className="header">
                <button onClick={timer}>Time</button>
                <button onClick={studInfo}>Student Info</button>
            </div>
        </div>
    );
}

export default Header;
