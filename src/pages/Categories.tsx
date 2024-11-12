import { FC, useState } from 'react';
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import CategoryModal from '../components/categoryModal/CategoryModal';
import { instance } from '../api/axios.api';
import { ICategory } from '../types/types';

export const categoriesActions = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const category = {
        title: formData.get('title'),
      };
      await instance.post('/categories', category);
      return null;
    }
    case 'PATCH': {
      const formData = await request.formData();
      const category = {
        id: formData.get('id'),
        title: formData.get('title'),
      };
      await instance.patch(`/categories/category/${category.id}`, category);
      return null;
    }
    case 'DELETE': {
      const formData = await request.formData();
      const categoryId = formData.get('id');
      await instance.delete(`/categories/category/${categoryId}`);
      return null;
    }
  }
};

export const categoryLoader = async () => {
  const { data } = await instance.get<Array<ICategory>>('/categories');
  return data;
};

const Categories: FC = () => {
  const categories = useLoaderData() as Array<ICategory>;

  const [visibleModal, setVisibleModal] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <div className="mt-10 rounded-md bg-slate-800 p-4">
        <h1>Список твоих категорий</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {categories.map(({ title, id }) => (
            <div
              key={id}
              className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2"
            >
              {title}
              <div className="absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex">
                <button
                  onClick={() => {
                    setCategoryId(id);
                    setVisibleModal(true);
                    setIsEdit(true);
                  }}
                >
                  <AiFillEdit />
                </button>

                <Form className="flex" method="delete" action="/categories">
                  <input type="hidden" name="id" value={id} />
                  <button type="submit">
                    <AiFillCloseCircle />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setVisibleModal(true)}
          className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Создать новую категорию</span>
        </button>
      </div>

      {/* Добавление категорий */}
      {visibleModal && (
        <CategoryModal type="post" setVisibleModal={setVisibleModal} />
      )}

      {/* Редактирование категорий */}
      {visibleModal && isEdit && (
        <CategoryModal
          type="patch"
          id={categoryId}
          setVisibleModal={setVisibleModal}
        />
      )}
    </>
  );
};

export default Categories;
