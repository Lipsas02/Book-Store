import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    console.log('Deleting book with id:', id);

    setLoading(true);
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setLoading(false);
      console.log('Delete response:', response);
      navigate('/');
    })
    .catch((error) => {
         setLoading(false);
        alert('an error happend.please check console');
        console.log(error);
    });
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col item-center border-2 border-sky-400 round-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure Want To Delete This Book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' 
        onClick={handleDeleteBook}>
        yes,Delete It!
        </button>
        </div>
 </div>
  )
}

export default DeleteBook