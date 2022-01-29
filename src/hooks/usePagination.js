import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const usePagination = ({
  page, selectedFilter, actionFetchMy, actionFetchAll,
}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    if (selectedFilter === 'all') {
      dispatch(actionFetchAll(currentPage));
    } else if (selectedFilter === 'my') {
      dispatch(actionFetchMy(currentPage));
    }
  }, [currentPage, selectedFilter]);

  return [currentPage, setCurrentPage];
};
