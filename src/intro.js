import { createElement, useState } from 'react';
import './App.css';

function Greeting({ name }) {
  return <h1>Hello,{name}</h1>;
}

function LikeButton() {
  const [liked, setLiked] = useState(false);
  if (liked) {
    return 'You liked this!';
  }

  return createElement(
    'button',
    {
      onClick: () => setLiked(true),
    },
    'Like'
  );
}

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

function Profile() {
  return (
    <>
      {' '}
      <h1>{user.name}</h1>
      <img
        src={user.imageUrl}
        alt={'photo of' + user.name}
        style={{ width: user.imageSize, height: user.imageSize }}
      />
    </>
  );
}

function ProductList() {
  const products = [
    { title: 'Cabbage', id: 1 },
    { title: 'Garlic', id: 2 },
    { title: 'Apple', id: 3 },
  ];

  const listItems = products.map(product => (
    <li key={product.id}>{product.title}</li>
  ));
  return <ul>{listItems}</ul>;
}

function MyButton({ ct, oc }) {
  return <button onClick={oc}>Clicked {ct} times</button>;
}

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(prev => prev + 1);
  return (
    <div>
      <Greeting name='world' />
      <Profile />
      <LikeButton />
      <ProductList />
      <MyButton ct={count} oc={handleClick} />
      <MyButton ct={count} oc={handleClick} />
    </div>
  );
}

export default App;
