import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import { pages } from '../../constant';
import { Page } from '../../types';

const PageForm = () => {
  const [selectedPage, setSelectedPage] = useState({
    select: '',
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    content: '',
    title: '',
  });
  const navigate = useNavigate();

  const fetchPage = useCallback(async (path: string) => {
    try {
      setLoading(false);

      const response = await axiosApi.get<Page | null>('pages/' + path + '.json');
      const pageData = response.data;

      if (pageData) {
        setPage(pageData);
      }

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedPage.select) {
      void fetchPage(selectedPage.select);
    }
  }, [fetchPage, selectedPage]);


  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPage((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axiosApi.put('pages/' + selectedPage.select + '.json', page);
    } finally {
      setLoading(false);
      navigate('/pages/' + selectedPage.select);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPage((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };


  let content = <div>
    <h4>Edit pages</h4>
    <div className='mb-3'>
      <select
        className='form-select'
        name='select'
        value={selectedPage.select}
        id='category'
        required={true}
        onChange={onSelect}
      >
        <option value=''>Choose page</option>
        {pages.map((page) => (
          <option value={page} key={page}>{page}</option>
        ))}
      </select>
    </div>

    <form onSubmit={onSubmit}>
      <div className='mb-3'>
        <label htmlFor='title' className='form-label'>
          Title
        </label>
        <input
          type='text'
          name='title'
          id='title'
          className='form-control'
          required
          value={page.title}
          onChange={onChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='content' className='form-label'>
          Content
        </label>
        <textarea
          name='content'
          id='content'
          className='form-control'
          required
          value={page.content}
          onChange={onChange}
        />
      </div>
      <button className='btn btn-primary'>Save</button>
    </form>
  </div>;

  if (loading) {
    content = <Spinner />;
  }

  return (
    <>
      {content}
    </>
  );
};

export default PageForm;