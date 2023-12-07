import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import { Page } from '../../types';

const PageContent = () => {
  const location = useLocation();
  const path = location.pathname.replace('/pages/', '');
  const [loading, serLoading] = useState(false);
  const [page, setPage] = useState<Page>();

  const fetchData = useCallback(async () => {
    try {
      serLoading(true);
      const responsePages = await axiosApi.get<Page>('pages/' + path + '.json');
      const pages = responsePages.data;

      if (pages) {
        setPage(pages);
      }
    } catch (error) {
      alert('Error' + error);
    } finally {
      serLoading(false);
    }
  }, [path]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  let content = null;
  if (page) {
    content = (
      <div>
        <h4>{page.title}</h4>
        <p>{page.content}</p>
      </div>
    );
  }

  return (
    <div>
      {loading ? (<Spinner />) : content}
    </div>
  );
};

export default PageContent;
