import { useEffect, useState } from 'react';
import { useWindowDimensions } from '../../hooks/useDimensions';
import { smallScreenWidth } from '../../utils/general.utils';
import { Link } from 'react-router-dom';

import Input from '../UI/Input';
import Button from '../UI/Button';

import styles from './Navbar.module.scss';
import searchButton from '../../assets/icons/search-icon.png';

const Navbar = () => {
  const { width } = useWindowDimensions();

  const [searchMenuVisisble, setSearchMenuVisisble] = useState<boolean>(false);

  // Switch off small screen search bar visibility when screen is larger again
  // It will not show automatically if screen will be small again
  useEffect(() => {
    if (width > smallScreenWidth) {
      setSearchMenuVisisble(false);
    }
  }, [width]);

  const searchMenuHandler = () => {
    setSearchMenuVisisble((prevState) => !prevState);
  };

  const showSearchbar = width >= smallScreenWidth || searchMenuVisisble;

  return (
    <nav>
      <div className={styles.navbar}>
        <Link to='/'>FAQ</Link>
        <div className={styles.searchbar}>
          {showSearchbar && (
            <Input placeholder="Search for keywords or tags with # like #animal" />
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
