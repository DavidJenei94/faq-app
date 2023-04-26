import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useWindowDimensions } from '../../hooks/useDimensions';
import { smallScreenWidth } from '../../utils/general.utils';
import { Link, useNavigate } from 'react-router-dom';
import { faqActions } from '../../store/faq-redux';

import Input from '../UI/Input';
import Button from '../UI/Button';

import styles from './Navbar.module.scss';
import searchButton from '../../assets/icons/search-icon.png';

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const questionSearch = useAppSelector((state) => state.questionSearch);

  const { width } = useWindowDimensions();

  const [searchField, setSearchField] = useState<string>('');
  const [searchMenuVisisble, setSearchMenuVisisble] = useState<boolean>(false);

  // Switch off small screen search bar visibility when screen is larger again
  // It will not show automatically if screen will be small again
  useEffect(() => {
    if (width > smallScreenWidth) {
      setSearchMenuVisisble(false);
    }
  }, [width]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(faqActions.setQuestionSearch(searchField));
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchField, dispatch]);

  useEffect(() => {
    if (questionSearch === '') {
      setSearchField('');
    }
  }, [questionSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      navigate('/');
    }
  };

  const searchMenuHandler = () => {
    setSearchMenuVisisble((prevState) => !prevState);
  };

  const showSearchbar = width >= smallScreenWidth || searchMenuVisisble;

  return (
    <nav>
      <div className={styles.navbar}>
        <Link to="/">FAQ</Link>
        <div className={styles.searchbar}>
          {showSearchbar && (
            <Input
              placeholder="Search for keywords..."
              value={searchField}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
          )}
          <Button onClick={searchMenuHandler}>
            <img src={searchButton} alt="Search button" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
