import { useContext } from 'react';
import CastContext from '../context/CastContext';

const useCast = () => {
  const context = useContext(CastContext);
  return { ...context };
};

export default useCast;
