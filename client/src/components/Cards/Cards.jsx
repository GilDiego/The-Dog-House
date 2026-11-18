import './Cards.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions/actions';
import { fetchDB } from '../../redux/actions/buttonsActions';
import Pagination from '../Pagination/Pagination.jsx';
import Card from '../Card/Card.jsx';
import {
  filterAPI,
  filterAPISearch,
  filterDB,
  filterByTemperament,
  filterAlphabetically,
  filterByWeight,
} from './filters';
import loadingGif from '../../media/loading1.gif';
export default function Cards() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([]);
  const [finalDisplay, setFinalDisplay] = useState([]);
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(8);
  const dispatch = useDispatch();
  const dogsRedux = useSelector((state) => state.dogsReducer.dogsLoaded);
  const resultsRedux = useSelector((state) => state.dogsReducer.dogsSearched);
  const dogsDB = useSelector((state) => state.buttonsReducer.dogsFromDB);
  const searchString = useSelector((state) => state.dogsReducer.search);
  const srcs = useSelector((state) => state.buttonsReducer.sources);
  const options = useSelector((state) => state.buttonsReducer.optionsSelected);
  useEffect(() => {
    if (!dogsRedux.length) dispatch(getDogs());
    if (!dogsDB.length) dispatch(fetchDB());
  }, []);
  useEffect(() => {
    if (dogsRedux.length && dogsDB.length) setData(dogsDB.concat(dogsRedux));
    else if (dogsRedux.length && !dogsDB.length) setData(dogsRedux);
  }, [dogsRedux, dogsDB]);
  useEffect(() => {
    const isSearch = Array.isArray(resultsRedux) && resultsRedux.length > 0;
    let dogs = data;

    if (isSearch) {
      const storedMatches = dogsDB.filter((dog) =>
        dog.name.toLowerCase().includes(searchString.toLowerCase())
      );
      dogs = filterAPISearch(resultsRedux.concat(storedMatches), srcs, dogsDB);
    } else {
      dogs = filterAPI(dogs, srcs, dogsRedux);
    }

    dogs = filterDB(dogs, srcs, dogsDB);
    dogs = filterByTemperament(dogs, options);
    dogs = filterAlphabetically(dogs, options);
    dogs = filterByWeight(dogs, options);
    setDisplay(dogs);
  }, [data, resultsRedux, dogsDB, searchString, srcs, options]);
  function chooseId(idAPI, idDB) {
    if (idDB) return idDB;
    else return idAPI;
  }
  let index = 0;
  const paginate = (pageNumber) => setPage(pageNumber);
  useEffect(() => {
    const indexOfLastPost = page * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setFinalDisplay(display.slice(indexOfFirstPost, indexOfLastPost));
  }, [display, page]);
  useEffect(() => {
    if (finalDisplay.length) setLoading(false);
  }, [finalDisplay, srcs, options]);
  return (
    <>
      {loading ? (
        <div>
          <img src={loadingGif} alt="loading" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="cards">
            {finalDisplay.map((dog) => (
              <Card
                index={++index}
                key={chooseId(dog.id, dog.idDB)}
                id={chooseId(dog.id, dog.idDB)}
                img={dog.image}
                name={dog.name}
                temperaments={dog.temperament}
                weight={dog.weight}
              />
            ))}
          </div>
          <Pagination postsPerPage={postsPerPage} totalPosts={display.length} paginate={paginate} />
        </>
      )}
    </>
  );
}
