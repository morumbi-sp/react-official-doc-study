function getImageUrl(imageId, size = 's') {
  return 'https://i.imgur.com/' + imageId + size + '.jpg';
}

function Profile({ name, imgSrc, profession, awards, discovered }) {
  return (
    <div>
      <section className='profile'>
        <h2>{name}</h2>
        <img
          className='avatar'
          src={getImageUrl(imgSrc)}
          alt={name}
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b>
            {profession}
          </li>
          <li>
            <b>Awards: {awards.length} </b>({awards.join(', ')})
          </li>
          <li>
            <b>Discovered: </b>
            {discovered}
          </li>
        </ul>
      </section>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        name='Maria Skłodowska-Curie'
        imgSrc='szV5sdG'
        profession='physicist and chemist'
        awards={[
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          ' Matteucci Medal',
        ]}
        discovered='polonium (element)'
      />
      <Profile
        name='Katsuko Saruhashi'
        imgSrc='YfeOqp2'
        profession='geochemist'
        awards={[' Miyake Prize for geochemistry', ' Tanaka Prize']}
        discovered='a method for measuring carbon dioxide in seawater'
      />
    </div>
  );
}

export default App;
