import img from '../assets/pfoto.jpg'
import '../styles/StudentInfo.css'

const StudentInfo = () => {

    return (
        <>
        <div className="conteiner">
            <img className='conteiner-image' src={img} alt="studentPhoto" />
            <p className='conteiner-study__name'>name: Makaryan Artur</p>
            <p className='conteiner-study__nick' >s21 Name: annapirz</p>
            <p className='conteiner-study__age' >age: 25</p>
        </div>
        </>
    )
}

 export default StudentInfo;