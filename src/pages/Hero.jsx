import artimg from './blogtext.png'
import { Link } from 'react-router-dom'
const Hero = () => {

    return (
        <div className='hero-container'>
            <div className="hero-inner">
                <img src={artimg} width={300} alt="" />
                <div>
                    <p className='hero-text fs-5' style={{ fontFamily: 'Consolas' }}><i style={{ fontSize: '1.1rem' }}>
                        "<span style={{ fontSize: '2rem', fontStyle: 'bold', fontFamily: 'Fira Code' }}>E</span>mbrace the journey, for within every challenge lies the seed of opportunity. Be the hero of your story, shaping destinies with courage, wisdom, and boundless resolve. Let your light illuminate the path for others, for in every heart lies the power to inspire greatness."</i></p>
                </div>
                <div className="hero-button-container">
                    <Link className='hero-button' to='/createpost'>Create new post</Link>
                </div>
            </div>
        </div >
    )
}

export default Hero
