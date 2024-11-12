import { FC } from 'react';
import { Form } from 'react-router-dom';

interface ICategoryModalProps {
  type: 'post' | 'patch';
  id?: number;
  setVisibleModal: (visible: boolean) => void;
}

const CategoryModal: FC<ICategoryModalProps> = ({
  type,
  id,
  setVisibleModal,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/50">
      <Form
        className="grid w-[300px] gap-2 rounded-md bg-slate-900 p-5"
        action="/categories"
        onSubmit={() => setVisibleModal(false)}
        method={type}
      >
        <label htmlFor="title">
          <small>Категория</small>
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="Название категории..."
          />
          <input type="hidden" value={id} name="id" />
        </label>

        <div className="flex items-center gap-2">
          <button className="btn btn-green" type="submit">
            {type === 'patch' ? 'Сохранить' : 'Создать'}
          </button>
          <button
            onClick={() => setVisibleModal(false)}
            className="btn btn-red"
          >
            Закрыть
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CategoryModal;
